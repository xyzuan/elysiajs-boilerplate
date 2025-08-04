import { BadRequestException } from "@constants/exceptions";
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

    const existingApprover = await prismaClient.user_sk_has_approver.findUnique(
      {
        where: {
          user_sk_id_user_approver_id: {
            user_sk_id: id,
            user_approver_id: user.id,
          },
        },
      }
    );

    if (!existingApprover) {
      throw new BadRequestException(
        "You are not assigned as an approver for this SK"
      );
    }

    await prismaClient.user_sk_has_approver.update({
      where: {
        user_sk_id_user_approver_id: {
          user_sk_id: id,
          user_approver_id: user.id,
        },
      },
      data: {
        status,
        updatedAt: new Date(),
      },
    });

    return Responses.success(`SK with ID ${id} has been ${status}.`);
  });
