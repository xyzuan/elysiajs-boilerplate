import { ForbiddenException, NotFoundException } from "@constants/exceptions";
import { Responses } from "@constants/responses";
import { generateSkKematianDocument } from "@documents/sk-kematian";
import { IParams } from "@interfaces/params.interface";
import { createElysia } from "@libs/elysia";
import { prismaClient } from "@libs/prisma";
import rbac from "@middlewares/rbac";
import { Gender, SKType } from "@prisma/client";
import { parseQuery } from "@utils/queryHandler";
import Elysia from "elysia";
import skKematianSchema from "./sk-kematian.schema";

export const SkKematianController = createElysia({
  prefix: "kematian",
})
  .use((app: Elysia) => rbac(app, "VIEW_SK"))
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
        sk_type: SKType.KEMATIAN,
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
        sk_kematian: true,
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
          sk_type: SKType.KEMATIAN,
          sk_kematian: {
            create: {
              ...body,
              gender: body.gender as Gender,
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
        include: {
          user_approvers: true,
        },
      });

      if (!existingRecord) {
        throw new NotFoundException("SK Kematian record not found");
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
          sk_kematian: {
            update: {
              ...body,
              gender: body.gender as Gender,
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
  )
  .get(":id/download", async ({ params: { id }, user, set }) => {
    const result = await prismaClient.user_sk.findUnique({
      where: {
        id,
        user_id: user.id,
      },
      include: {
        sk_kematian: true,
        user_approvers: true,
      },
    });

    if (!result || !result.sk_kematian) {
      throw new NotFoundException("SK not found");
    }

    if (
      result.user_approvers.length === 0 ||
      !result.user_approvers.some((approver) => approver.status === "APPROVED")
    ) {
      throw new ForbiddenException(
        "SK is not approved yet. Please wait for approval."
      );
    }

    set.headers["Content-Type"] =
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    set.headers[
      "Content-Disposition"
    ] = `attachment; filename="document_${id}.docx"`;

    return generateSkKematianDocument({
      name: result.sk_kematian?.name,
      address: result.sk_kematian?.address,
      born_birth: result.sk_kematian?.born_birth,
      born_place: result.sk_kematian?.born_place,
      death_date: result.sk_kematian?.death_date,
      death_date_day: result.sk_kematian?.death_date,
      death_place: result.sk_kematian?.death_place,
      death_reason: result.sk_kematian?.death_reason,
      gender: result.sk_kematian?.gender,
      nik: result.sk_kematian?.nik,
      religion: result.sk_kematian?.religion,
      reporter_name: user.name,
      reporter_address: user.address ?? "",
      reporter_born_birth: user.born_birth,
      reporter_born_place: user.born_place ?? "",
      reporter_nik: user.nik ?? "",
      reporter_religion: user.religion ?? "",
      reporter_gender: user.gender,
      reporter_marital_status: user.marital_status,
      work: user.work ?? "",
    });
  });
