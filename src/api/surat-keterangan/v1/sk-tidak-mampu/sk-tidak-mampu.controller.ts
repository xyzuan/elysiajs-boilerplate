import { NotFoundException } from "@constants/exceptions";
import { createElysia } from "@libs/elysia";
import { prismaClient } from "@libs/prisma";
import { authJwt } from "@middlewares/jwt";
import { Gender, MaritalStatus } from "@prisma/client";
import skTidakMampuSchema from "./sk-tidak-mampu.schema";
import { Responses } from "@constants/responses";

export const SkTidakMampuController = createElysia({
  prefix: "tidak-mampu",
})
  .use(authJwt)
  .use(skTidakMampuSchema)
  .get(":id", async ({ params: { id }, user }) => {
    const result = await prismaClient.user_sk.findUnique({
      where: {
        id,
        user_id: user.id,
      },
      include: {
        sk_tidak_mampu: true,
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
          sk_type: "TIDAK_MAMPU",
          sk_tidak_mampu: {
            create: {
              ...body,
              gender: body.gender as Gender,
              marital_status: body.marital_status as MaritalStatus,
            },
          },
        },
      });

      return Responses.success(result);
    },
    {
      body: "sk-tidak-mampu",
    }
  )
  .put(
    ":id",
    async ({ params: { id }, body, user }) => {
      const existingRecord = await prismaClient.user_sk.findUnique({
        where: { id, sk_type: "TIDAK_MAMPU", user_id: user.id },
      });

      if (!existingRecord) {
        throw new NotFoundException("SK Tidak Mampu record not found");
      }

      const result = await prismaClient.user_sk.update({
        where: {
          id,
          user_id: user.id,
        },
        data: {
          sk_tidak_mampu: {
            update: {
              ...body,
              gender: body.gender as Gender,
              marital_status: body.marital_status as MaritalStatus,
            },
          },
        },
        include: {
          sk_tidak_mampu: true,
        },
      });

      return Responses.success(result);
    },
    {
      body: "sk-tidak-mampu",
    }
  );
