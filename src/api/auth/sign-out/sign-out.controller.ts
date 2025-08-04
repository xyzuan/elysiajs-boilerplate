import { Responses } from "@constants/responses";
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
      await prismaClient.refresh_tokens.updateMany({
        where: {
          user_id: user.id,
          token: refreshToken.value,
        },
        data: {
          isRevoked: true,
        },
      });
      return Responses.success(null);
    }
  );
