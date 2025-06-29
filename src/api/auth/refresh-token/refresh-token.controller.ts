import { BadRequestException, ForbiddenException } from "@constants/exceptions";
import { JWT_ACCESS_TOKEN_EXP, JWT_REFRESH_TOKEN_EXP } from "@constants/jwt";
import { createElysia } from "@libs/elysia";
import { prismaClient } from "@libs/prisma";
import { getExpTimestamp } from "@utils/jwt";

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
    const accessJWTToken = await jwt.sign({
      sub: user.id,
      exp: getExpTimestamp(JWT_ACCESS_TOKEN_EXP),
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
    });
    refreshToken.set({
      value: refreshJWTToken,
      httpOnly: true,
      maxAge: JWT_REFRESH_TOKEN_EXP,
      path: "/",
    });
    await prismaClient.user.update({
      where: {
        id: user.id,
      },
      data: {
        refreshToken: refreshJWTToken,
      },
    });
    return {
      message: "User token refreshed successfully",
    };
  }
);
