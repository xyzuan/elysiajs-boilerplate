import { BadRequestException } from "@constants/exceptions";
import { JWT_ACCESS_TOKEN_EXP, JWT_REFRESH_TOKEN_EXP } from "@constants/jwt";
import { createElysia } from "@libs/elysia";
import { prismaClient } from "@libs/prisma";
import { getExpTimestamp } from "@utils/jwt";
import signInSchema from "./sign-in.schema";
import { Responses } from "@constants/responses";

export const SignInController = createElysia()
  .use(signInSchema)
  .post(
    "/sign-in",
    async ({ body, jwt, cookie: { accessToken, refreshToken } }) => {
      try {
        const user = await prismaClient.user.findUnique({
          where: { email: body.email },
          select: {
            id: true,
            email: true,
            password: true,
          },
        });

        if (!user) {
          throw new BadRequestException(
            "The email address or password you entered is incorrect"
          );
        }

        const matchPassword = await Bun.password.verify(
          body.password,
          user.password,
          "bcrypt"
        );

        if (!matchPassword) {
          throw new BadRequestException(
            "The password you entered is incorrect"
          );
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

        const updatedUser = await prismaClient.user.update({
          where: {
            id: user.id,
          },
          data: {
            refreshToken: refreshJWTToken,
          },
        });

        return Responses.success({
          accessToken: accessJWTToken,
          refreshToken: updatedUser.refreshToken,
        });
      } catch (error) {
        throw error;
      }
    },
    {
      body: "sign-in",
    }
  );
