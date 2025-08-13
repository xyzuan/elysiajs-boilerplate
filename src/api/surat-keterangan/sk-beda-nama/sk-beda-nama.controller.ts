import { ForbiddenException, NotFoundException } from "@constants/exceptions";
import { Responses } from "@constants/responses";
import { IParams } from "@interfaces/params.interface";
import { createElysia } from "@libs/elysia";
import { prismaClient } from "@libs/prisma";
import rbac from "@middlewares/rbac";
import { Gender, MaritalStatus, SKType } from "@prisma/client";
import { parseQuery } from "@utils/queryHandler";
import Elysia from "elysia";
import skBedaNamaSchema from "./sk-beda-nama.schema";

export const SkBedaNamaController = createElysia({
  prefix: "beda-nama",
})
  .use((app: Elysia) => rbac(app, "VIEW_SK"))
  .use(skBedaNamaSchema)
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
      sk_type: SKType.BEDA_NAMA,
      OR: search
        ? [
            {
              sk_beda_nama: {
                name: {
                  contains: search,
                },
              },
            },
            {
              sk_beda_nama: {
                nik: {
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
        sk_beda_nama: true,
      },
    });

    return Responses.paginated(result, page, limit, totalData);
  })
  .get(":id", async ({ params: { id }, user }) => {
    const result = await prismaClient.user_sk.findUnique({
      where: {
        id,
        user_id: user.id,
        sk_type: SKType.BEDA_NAMA,
      },
      include: {
        user_approvers: {
          include: {
            approver: {
              select: {
                id: true,
                name: true,
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
        },
        sk_beda_nama: true,
      },
    });

    if (!result) {
      throw new NotFoundException();
    }

    return Responses.success(result);
  })
  .use((app: Elysia) => rbac(app, "REQUEST_SK"))
  .post(
    "",
    async ({ user, body }) => {
      const result = await prismaClient.user_sk.create({
        data: {
          user_id: user.id,
          sk_type: SKType.BEDA_NAMA,
          sk_beda_nama: {
            create: {
              ...body,
              gender: body.gender as Gender,
              marital_status: body.marital_status as MaritalStatus,
            },
          },
        },
      });

      const defaultApprovers = await prismaClient.sk_approver_settings.findMany(
        {
          where: {
            sk_type: SKType.BEDA_NAMA,
            is_active: true,
          },
          orderBy: {
            order_priority: "asc",
          },
        }
      );

      if (defaultApprovers.length > 0) {
        const approverAssignments = defaultApprovers.map((setting) => ({
          user_sk_id: result.id,
          user_approver_id: setting.user_approver_id,
          status: "VERIFY" as const,
        }));

        await prismaClient.user_sk_has_approver.createMany({
          data: approverAssignments,
          skipDuplicates: true,
        });
      }

      return Responses.success(result);
    },
    {
      body: "sk-beda-nama",
    }
  )
  .patch(
    ":id",
    async ({ params: { id }, user, body }) => {
      const existingRecord = await prismaClient.user_sk.findUnique({
        where: { id, sk_type: SKType.BEDA_NAMA, user_id: user.id },
        include: {
          user_approvers: true,
        },
      });

      if (!existingRecord) {
        throw new NotFoundException("SK Beda Nama record not found");
      }

      if (
        existingRecord.user_approvers.length === 0 ||
        !existingRecord.user_approvers.some(
          (approver) => approver.status === "REVISED"
        )
      ) {
        throw new ForbiddenException(
          "SK is not revised yet. Please wait for revised."
        );
      }

      const result = await prismaClient.user_sk.update({
        where: {
          id,
          user_id: user.id,
        },
        data: {
          sk_beda_nama: {
            update: {
              ...body,
              gender: body.gender as Gender,
              marital_status: body.marital_status as MaritalStatus,
            },
          },
        },
        include: {
          sk_beda_nama: true,
        },
      });
      return Responses.success(result);
    },
    {
      body: "sk-beda-nama",
    }
  );
