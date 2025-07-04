import { Responses } from "@constants/responses";
import { IParams } from "@interfaces/params.interface";
import { createElysia } from "@libs/elysia";
import { prismaClient } from "@libs/prisma";
import rbac from "@middlewares/rbac";
import { SKType } from "@prisma/client";
import { parseQuery } from "@utils/queryHandler";
import Elysia from "elysia";

export const SkMyList = createElysia()
  .use((app: Elysia) => rbac(app, "VIEW_SK"))
  .get("/my-list", async ({ user, query }) => {
    const {
      search = "",
      limit = 10,
      page = 1,
      ...q
    } = parseQuery(
      query as IParams<{
        skType?: SKType;
      }>
    );

    const where = {
      user_id: user.id,
      createdAt: {
        gte: q.fromDate ? new Date(q.fromDate) : undefined,
        lte: q.toDate ? new Date(q.toDate) : undefined,
      },
      sk_type: q.skType ?? undefined,
      OR: search
        ? [
            {
              sk_kematian: {
                name: {
                  contains: search,
                },
              },
            },
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
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user_approvers: {
          include: {
            approver: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
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

    return Responses.paginated(result, page, limit, totalData);
  });
