import { createElysia } from "@libs/elysia";
import { prismaClient } from "@libs/prisma";
import { authJwt } from "@middlewares/jwt";

export const SignOutController = createElysia()
  .use(authJwt)
  .post(
    "/sign-out",
    async ({ user, cookie: { accessToken, refreshToken } }) => {
      accessToken.remove();
      refreshToken.remove();
      await prismaClient.user.update({
        where: {
          id: user.id,
        },
        data: {
          refreshToken: null,
        },
      });
      return {
        message: "User logged out successfully",
      };
    }
  );
