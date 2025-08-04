import { BadRequestException } from "@constants/exceptions";
import { Responses } from "@constants/responses";
import { createElysia } from "@libs/elysia";
import { prismaClient } from "@libs/prisma";
import { authJwt } from "@middlewares/jwt";
import changePasswordSchema from "./change-password.schema";

export const ChangePasswordController = createElysia()
  .use(authJwt)
  .use(changePasswordSchema)
  .patch(
    "/change-password",
    async ({ body, user }) => {
      const { currentPassword, newPassword } = body;

      // Get user with password for verification
      const userWithPassword = await prismaClient.user.findUnique({
        where: { id: user.id },
        select: {
          id: true,
          password: true,
        },
      });

      if (!userWithPassword) {
        throw new BadRequestException("User not found");
      }

      // Verify current password
      const isCurrentPasswordValid = await Bun.password.verify(
        currentPassword,
        userWithPassword.password,
        "bcrypt",
      );

      if (!isCurrentPasswordValid) {
        throw new BadRequestException("Current password is incorrect");
      }

      // Hash new password
      const hashedNewPassword = await Bun.password.hash(newPassword, {
        algorithm: "bcrypt",
        cost: 10,
      });

      // Update password
      await prismaClient.user.update({
        where: { id: user.id },
        data: {
          password: hashedNewPassword,
          updatedAt: new Date(),
        },
      });

      // Revoke all existing refresh tokens for security
      await prismaClient.refresh_tokens.updateMany({
        where: {
          user_id: user.id,
          isRevoked: false,
        },
        data: {
          isRevoked: true,
        },
      });

      return Responses.success("Password changed successfully");
    },
    {
      body: "change-password",
    },
  );
