import { NotFoundException } from "@constants/exceptions";
import { createElysia } from "@libs/elysia";
import { prismaClient } from "@libs/prisma";
import { authJwt } from "@middlewares/jwt";
import { Gender, MaritalStatus } from "@prisma/client";
import skTidakMampuSchema from "./sk-tidak-mampu.schema";

export const SkTidakMampuController = createElysia({
  prefix: "tidak-mampu",
})
  .use(authJwt)
  .use(skTidakMampuSchema)
  .get(":id", async ({ params: { id } }) => {
    const result = await prismaClient.sk_tidak_mampu.findUnique({
      where: {
        id,
      },
    });

    if (!result) {
      throw new NotFoundException();
    }

    return {
      status: "SUCCESS",
      data: result,
    };
  })
  .post(
    "",
    async ({ user, body }) => {
      const result = await prismaClient.$transaction(async (prisma) => {
        const result = await prisma.sk_tidak_mampu.create({
          data: {
            ...body,
            gender: body.gender as Gender,
            marital_status: body.marital_status as MaritalStatus,
          },
        });

        await prisma.user_sk.create({
          data: {
            user_id: user.id,
            sk_id: result.id,
            sk_type: "TIDAK_MAMPU",
          },
        });

        return result;
      });

      return {
        status: "SUCCESS",
        data: result,
      };
    },
    {
      body: "sk-tidak-mampu",
    }
  )
  .put(
    ":id",
    async ({ params: { id }, body }) => {
      const existingRecord = await prismaClient.sk_tidak_mampu.findUnique({
        where: { id },
      });

      if (!existingRecord) {
        throw new NotFoundException("SK Tidak Mampu record not found");
      }

      const result = await prismaClient.$transaction(async (prisma) => {
        const updatedAt = new Date();
        const result = await prisma.sk_tidak_mampu.update({
          where: { id },
          data: {
            ...body,
            gender: body.gender as Gender,
            marital_status: body.marital_status as MaritalStatus,
            updatedAt,
          },
        });

        if (!result) {
          throw new NotFoundException();
        }

        await prisma.user_sk.updateMany({
          where: { sk_id: id },
          data: { updatedAt },
        });

        return result;
      });

      return {
        status: "SUCCESS",
        data: result,
      };
    },
    {
      body: "sk-tidak-mampu",
    }
  );
