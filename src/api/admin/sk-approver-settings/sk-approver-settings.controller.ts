import { Responses } from "@constants/responses";
import { createElysia } from "@libs/elysia";
import { prismaClient } from "@libs/prisma";
import rbac from "@middlewares/rbac";
import { SKType } from "@prisma/client";
import Elysia from "elysia";
import skApproverSettingsSchema from "./sk-approver-settings.schema";

export const skApproverSettingsController = createElysia({
  prefix: "sk-approver-settings",
})
  .use((app: Elysia) => rbac(app, "MANAGE_SK_APPROVERS"))
  .use(skApproverSettingsSchema)
  .get(
    "",
    async ({ query }) => {
      const { sk_type } = query;
      const where = sk_type ? { sk_type: sk_type as SKType } : {};
      const settings = await prismaClient.sk_approver_settings.findMany({
        where,
        include: {
          approver: {
            select: {
              id: true,
              name: true,
              email: true,
              user_roles: {
                include: {
                  role: {
                    select: {
                      name: true,
                    },
                  },
                },
              },
            },
          },
        },
        orderBy: [{ sk_type: "asc" }, { order_priority: "asc" }],
      });

      if (!sk_type) {
        const grouped = settings.reduce(
          (acc, setting) => {
            if (!acc[setting.sk_type]) {
              acc[setting.sk_type] = [];
            }
            acc[setting.sk_type].push(setting);
            return acc;
          },
          {} as Record<SKType, typeof settings>
        );

        return Responses.success(grouped);
      }

      return Responses.success(settings);
    },
    {
      query: "query",
    }
  )
  .post(
    "",
    async ({ body }) => {
      const { sk_type, approvers } = body;
      const existingSettings = await prismaClient.sk_approver_settings.findMany(
        {
          where: { sk_type },
        }
      );
      const existingApproverIds = existingSettings.map(
        (s) => s.user_approver_id
      );
      const newApproverIds = approvers.map((a: any) => a.user_approver_id);
      const toDelete = existingApproverIds.filter(
        (id) => !newApproverIds.includes(id)
      );
      if (toDelete.length > 0) {
        await prismaClient.sk_approver_settings.deleteMany({
          where: {
            sk_type,
            user_approver_id: { in: toDelete },
          },
        });
      }

      const results = [];
      for (const approver of approvers) {
        const result = await prismaClient.sk_approver_settings.upsert({
          where: {
            sk_type_user_approver_id: {
              sk_type,
              user_approver_id: approver.user_approver_id,
            },
          },
          update: {
            is_active: approver.is_active,
            order_priority: approver.order_priority,
          },
          create: {
            sk_type,
            user_approver_id: approver.user_approver_id,
            is_active: approver.is_active,
            order_priority: approver.order_priority,
          },
          include: {
            approver: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        });
        results.push(result);
      }

      return Responses.success(results);
    },
    {
      body: "sk-approver-settings",
    }
  );
