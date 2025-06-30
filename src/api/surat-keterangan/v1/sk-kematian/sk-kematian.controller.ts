import { NotFoundException } from "@constants/exceptions";
import { createElysia } from "@libs/elysia";
import { prismaClient } from "@libs/prisma";
import { authJwt } from "@middlewares/jwt";
import skKematianSchema from "./sk-kematian.schema";
import { Responses } from "@constants/responses";

export const SkKematianController = createElysia({
  prefix: "kematian",
})
  .use(authJwt)
  .use(skKematianSchema)
  .get(":id", async ({ params: { id }, user }) => {
    const result = await prismaClient.user_sk.findUnique({
      where: {
        id,
        user_id: user.id,
      },
      include: {
        sk_kematian: true,
      },
    });

    if (!result) {
      throw new NotFoundException();
    }

    return Responses.success(result);
  })
  .post(
    "",
    async ({ user, body }) => {
      const result = await prismaClient.user_sk.create({
        data: {
          user_id: user.id,
          sk_type: "KEMATIAN",
          sk_kematian: {
            create: {
              ...body,
            },
          },
        },
      });

      return Responses.success(result);
    },
    {
      body: "sk-kematian",
    }
  )
  .put(
    ":id",
    async ({ params: { id }, user, body }) => {
      const existingRecord = await prismaClient.user_sk.findUnique({
        where: { id, sk_type: "KEMATIAN", user_id: user.id },
      });

      if (!existingRecord) {
        throw new NotFoundException("SK Kematian record not found");
      }

      const result = await prismaClient.user_sk.update({
        where: {
          id,
          user_id: user.id,
        },
        data: {
          sk_kematian: {
            update: {
              ...body,
            },
          },
        },
        include: {
          sk_kematian: true,
        },
      });
      return Responses.success(result);
    },
    {
      body: "sk-kematian",
    }
  );
