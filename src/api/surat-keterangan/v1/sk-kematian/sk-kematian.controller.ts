import { NotFoundException } from "@constants/exceptions";
import { Responses } from "@constants/responses";
import { IParams } from "@interfaces/params.interface";
import { createElysia } from "@libs/elysia";
import { prismaClient } from "@libs/prisma";
import { authJwt } from "@middlewares/jwt";
import { parseQuery } from "@utils/queryHandler";
import skKematianSchema from "./sk-kematian.schema";
import { SKType } from "@prisma/client";

export const SkKematianController = createElysia({
  prefix: "kematian",
})
  .use(authJwt)
  .use(skKematianSchema)
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
      sk_type: SKType.KEMATIAN,
      OR: search
        ? [
            {
              sk_kematian: {
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
        sk_kematian: {
          select: {
            id: true,
            name: true,
            address: true,
            death_date: true,
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
          sk_type: SKType.KEMATIAN,
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
        where: { id, sk_type: SKType.KEMATIAN, user_id: user.id },
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
