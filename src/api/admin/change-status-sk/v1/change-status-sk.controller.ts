import { Responses } from "@constants/responses";
import { createElysia } from "@libs/elysia";
import { prismaClient } from "@libs/prisma";
import rbac from "@middlewares/rbac";
import { SKStatus } from "@prisma/client";
import Elysia from "elysia";

export const changeStatusSk = createElysia({
  prefix: "change-status-sk",
})
  .use((app: Elysia) => rbac(app, "APPROVE_SK"))
  .patch("/:id", async ({ params, body, user }) => {
    const { id } = params;
    const { status } = body as { status: SKStatus };

    await prismaClient.user_sk_has_approver.upsert({
      where: {
        user_sk_id_user_approver_id: {
          user_sk_id: id,
          user_approver_id: user.id,
        },
      },
      update: {
        status,
        updatedAt: new Date(),
      },
      create: {
        user_sk_id: id,
        user_approver_id: user.id,
        status,
      },
    });

    return Responses.success(`SK with ID ${id} has been ${status}.`);
  });
