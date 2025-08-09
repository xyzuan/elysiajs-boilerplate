import { NotFoundException } from "@constants/exceptions";
import { Responses } from "@constants/responses";
import { IParams } from "@interfaces/params.interface";
import { createElysia } from "@libs/elysia";
import { prismaClient } from "@libs/prisma";
import rbac from "@middlewares/rbac";
import { SKType } from "@prisma/client";
import { parseQuery } from "@utils/queryHandler";
import Elysia from "elysia";

export const skListController = createElysia({
  prefix: "sk-list",
})
  .use((app: Elysia) => rbac(app, "APPROVE_SK"))
  .get("", async ({ query }) => {
    const {
      search = "",
      limit = 10,
      page = 1,
      ...q
    } = parseQuery(
      query as IParams<{
        skType?: SKType;
        status?: string;
      }>
    );

    const where = {
      createdAt: {
        gte: q.fromDate ? new Date(q.fromDate) : undefined,
        lte: q.toDate ? new Date(q.toDate) : undefined,
      },
      sk_type: q.skType ?? undefined,
      OR: search
        ? [
            {
              user: {
                name: {
                  contains: search,
                },
              },
            },
            {
              user: {
                email: {
                  contains: search,
                },
              },
            },
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
      user_approvers: q.status
        ? {
            some: {
              status: q.status as any,
            },
          }
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
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            nik: true,
          },
        },
        user_approvers: {
          include: {
            approver: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        },
        sk_kematian: {
          select: {
            id: true,
            name: true,
            nik: true,
            death_date: true,
          },
        },
        sk_tidak_mampu: {
          select: {
            id: true,
            name: true,
            nik: true,
            reason: true,
          },
        },
      },
    });

    return Responses.paginated(result, page, limit, totalData);
  })
  .get(":id", async ({ params: { id } }) => {
    const result = await prismaClient.user_sk.findUnique({
      where: {
        id,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            born_birth: true,
            born_place: true,
            gender: true,
            work: true,
            marital_status: true,
            nik: true,
            religion: true,
            address: true,
            createdAt: true,
          },
        },
        user_approvers: {
          include: {
            approver: {
              select: {
                id: true,
                name: true,
                email: true,
                user_roles: {
                  select: {
                    role: {
                      select: {
                        id: true,
                        name: true,
                      },
                    },
                  },
                },
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        },
        sk_kematian: true,
        sk_tidak_mampu: true,
      },
    });

    if (!result) {
      throw new NotFoundException("SK not found");
    }

    return Responses.success(result);
  });
