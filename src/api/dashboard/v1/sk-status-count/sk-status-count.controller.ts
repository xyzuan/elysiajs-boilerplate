import { Responses } from "@constants/responses";
import { createElysia } from "@libs/elysia";
import { prismaClient } from "@libs/prisma";
import { authJwt } from "@middlewares/jwt";

export const skStatusCountController = createElysia({
  prefix: "sk-status-count",
})
  .use(authJwt)
  .get("", async ({ user }) => {
    const skVerify = await prismaClient.user_sk.count({
      where: {
        user_id: user.id,
        sk_status: "VERIFY",
      },
    });

    const skApproved = await prismaClient.user_sk.count({
      where: {
        user_id: user.id,
        sk_status: "APPROVED",
      },
    });

    const skRejected = await prismaClient.user_sk.count({
      where: {
        user_id: user.id,
        sk_status: "REJECTED",
      },
    });

    const skRevised = await prismaClient.user_sk.count({
      where: {
        user_id: user.id,
        sk_status: "REVISED",
      },
    });

    return Responses.success({
      verify: skVerify,
      approved: skApproved,
      rejected: skRejected,
      revised: skRevised,
    });
  });
