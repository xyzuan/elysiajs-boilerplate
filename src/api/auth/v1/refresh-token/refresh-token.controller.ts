import { BadRequestException, ForbiddenException } from "@constants/exceptions";
import { JWT_ACCESS_TOKEN_EXP, JWT_REFRESH_TOKEN_EXP } from "@constants/jwt";
import { Responses } from "@constants/responses";
import { createElysia } from "@libs/elysia";
import { prismaClient } from "@libs/prisma";
import { getExpDateTime, getExpTimestamp } from "@utils/jwt";
import { randomUUIDv7 } from "bun";

export const RefreshTokenController = createElysia().post(
  "/refresh-token",
  async ({ cookie: { accessToken, refreshToken }, jwt }) => {
    if (!refreshToken.value) {
      throw new BadRequestException("Refresh token is missing");
    }

    const jwtPayload = await jwt.verify(refreshToken.value);

    if (!jwtPayload) {
      throw new ForbiddenException("Refresh token is invalid");
    }

    const userId = jwtPayload.sub;
    const user = await prismaClient.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new ForbiddenException("Refresh token is invalid");
    }

    const oldRefreshToken = refreshToken.value;
    const existRefreshToken = await prismaClient.refresh_tokens.findFirst({
      where: {
        user_id: user.id,
        token: oldRefreshToken,
      },
    });

    if (existRefreshToken?.isRevoked) {
      throw new ForbiddenException("Refresh token has been revoked");
    }

    const accessJWTToken = await jwt.sign({
      sub: user.id,
      exp: getExpTimestamp(JWT_ACCESS_TOKEN_EXP),
      jti: randomUUIDv7(),
      type: "access",
    });

    accessToken.set({
      value: accessJWTToken,
      httpOnly: true,
      maxAge: JWT_ACCESS_TOKEN_EXP,
      path: "/",
    });

    const refreshJWTToken = await jwt.sign({
      sub: user.id,
      exp: getExpTimestamp(JWT_REFRESH_TOKEN_EXP),
      jti: randomUUIDv7(),
      type: "refresh",
    });

    refreshToken.set({
      value: refreshJWTToken,
      httpOnly: true,
      maxAge: JWT_REFRESH_TOKEN_EXP,
      path: "/",
    });

    await prismaClient.refresh_tokens.updateMany({
      where: {
        user_id: user.id,
        token: oldRefreshToken,
      },
      data: {
        isRevoked: true,
      },
    });

    await prismaClient.refresh_tokens.create({
      data: {
        user_id: user.id,
        token: refreshJWTToken,
        expiredAt: getExpDateTime(JWT_REFRESH_TOKEN_EXP),
      },
    });

    return Responses.success(null);
  }
);
