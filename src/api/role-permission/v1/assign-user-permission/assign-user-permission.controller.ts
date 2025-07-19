import { BadRequestException } from "@constants/exceptions";
import { Responses } from "@constants/responses";
import { createElysia } from "@libs/elysia";
import { prismaClient } from "@libs/prisma";
import rbac from "@middlewares/rbac";
import Elysia from "elysia";
import assignUserPermissionSchema from "./assign-user-permission.schema";

export const assignUserPermissionController = createElysia({
  prefix: "assign-user-permission",
})
  .use((app: Elysia) => rbac(app, "MANAGE_ROLES_PERMISSIONS"))
  .use(assignUserPermissionSchema)
  .post(
    "",
    async ({ body }) => {
      const { userId, permissionIds } = body;

      const user = await prismaClient.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        throw new BadRequestException("User not found");
      }

      // Check if permissions exist (only if permissionIds is not empty)
      if (permissionIds.length > 0) {
        const permissions = await prismaClient.permissions.findMany({
          where: { id: { in: permissionIds } },
        });

        if (permissions.length !== permissionIds.length) {
          throw new BadRequestException("One or more permissions not found");
        }
      }

      // Delete all existing user permissions
      await prismaClient.user_has_permissions.deleteMany({
        where: {
          user_id: userId,
        },
      });

      // Create new user permissions (only if permissionIds is not empty)
      if (permissionIds.length > 0) {
        await prismaClient.user_has_permissions.createMany({
          data: permissionIds.map((permissionId) => ({
            user_id: userId,
            permission_id: permissionId,
          })),
        });
      }

      // Get the result with full details
      const result = await prismaClient.user.findUnique({
        where: { id: userId },
        include: {
          user_permissions: {
            include: {
              permission: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
      });

      return Responses.success({
        user: {
          id: result?.id,
          name: result?.name,
          email: result?.email,
        },
        totalPermissions: result?.user_permissions.length || 0,
        permissions: result?.user_permissions.map((up) => up.permission) || [],
      });
    },
    {
      body: "assign-user-permission",
    },
  );
