import { createElysia } from "@libs/elysia";
import { prismaClient } from "@libs/prisma";
import { authJwt } from "@middlewares/jwt";

export const SkMyList = createElysia()
  .use(authJwt)
  .get("/my-list", async ({ user }) => {
    const result = await prismaClient.user_sk.findMany({
      where: {
        user_id: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        sk_kematian: {
          select: {
            name: true,
          },
        },
        sk_tidak_mampu: {
          select: {
            name: true,
          },
        },
      },
    });

    return {
      status: "SUCCESS",
      data: result,
    };
  });
