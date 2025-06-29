import { createElysia } from "@libs/elysia";
import { prismaClient } from "@libs/prisma";
import { authJwt } from "@middlewares/jwt";
import skKematianSchema from "./sk-kematian.schema";

export const SkKematianController = createElysia({
  prefix: "kematian",
})
  .use(authJwt)
  .use(skKematianSchema)
  .get(":id", async ({ params: { id } }) => {
    const result = await prismaClient.sk_kematian.findUnique({
      where: {
        id,
      },
    });

    return {
      status: "SUCCESS",
      data: result,
    };
  })
  .post(
    "",
    async ({ user, body }) => {
      const result = await prismaClient.$transaction(async (prisma) => {
        const skKematian = await prisma.sk_kematian.create({
          data: {
            ...body,
          },
        });

        await prisma.user_sk.create({
          data: {
            user_id: user.id,
            sk_id: skKematian.id,
            sk_type: "KEMATIAN",
          },
        });

        return skKematian;
      });

      return {
        status: "SUCCESS",
        data: result,
      };
    },
    {
      body: "create-sk-kematian",
    }
  );
