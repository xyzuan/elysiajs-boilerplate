import { NotFoundException } from "@constants/exceptions";
import { Responses } from "@constants/responses";
import { createElysia } from "@libs/elysia";
import { prismaClient } from "@libs/prisma";
import rbac from "@middlewares/rbac";
import { SKType } from "@prisma/client";
import Elysia from "elysia";

export const skDetailController = createElysia({
  prefix: "sk-detail",
})
  .use((app: Elysia) => rbac(app, "APPROVE_SK"))
  .get("kematian/:id", async ({ params: { id } }) => {
    const result = await prismaClient.user_sk.findUnique({
      where: {
        id,
        sk_type: SKType.KEMATIAN,
      },
      include: {
        user: true,
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
      throw new NotFoundException("SK Kematian not found");
    }

    return Responses.success(result);
  })
  .get("tidak-mampu/:id", async ({ params: { id } }) => {
    const result = await prismaClient.user_sk.findUnique({
      where: {
        id,
        sk_type: SKType.TIDAK_MAMPU,
      },
      include: {
        user: true,
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
        sk_tidak_mampu: true,
      },
    });

    if (!result) {
      throw new NotFoundException("SK Tidak Mampu not found");
    }

    return Responses.success(result);
  });
