import { NotFoundException } from "@constants/exceptions";
import { createElysia } from "@libs/elysia";
import { prismaClient } from "@libs/prisma";
import { authJwt } from "@middlewares/jwt";
import { Gender, MaritalStatus, SKType } from "@prisma/client";
import skTidakMampuSchema from "./sk-tidak-mampu.schema";
import { Responses } from "@constants/responses";
import { parseQuery } from "@utils/queryHandler";
import { IParams } from "@interfaces/params.interface";

export const SkTidakMampuController = createElysia({
  prefix: "tidak-mampu",
})
  .use(authJwt)
  .use(skTidakMampuSchema)
  .get("", async ({ user, query }) => {
    const {
      search = "",
      limit = 10,
      page = 1,
      ...q
    } = parseQuery(query as IParams);

    const where = {
      user_id: user.id,
      createdAt: {
        gte: q.fromDate ? new Date(q.fromDate) : undefined,
        lte: q.toDate ? new Date(q.toDate) : undefined,
      },
      sk_type: SKType.TIDAK_MAMPU,
      OR: search
        ? [
            {
              sk_tidak_mampu: {
                name: {
                  contains: search,
                },
              },
            },
          ]
        : undefined,
    };

    const totalData = Math.ceil(
      (await prismaClient.user_sk.count({
        where,
      })) / limit
    );

    const result = await prismaClient.user_sk.findMany({
      where,
      take: limit,
      skip: (page - 1) * limit,
      include: {
        sk_tidak_mampu: {
          select: {
            id: true,
            name: true,
            address: true,
          },
        },
      },
    });

    return Responses.paginated(result, page, limit, totalData);
  })
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
