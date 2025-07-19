import { BadRequestException } from "@constants/exceptions";
import { Responses } from "@constants/responses";
import { createElysia } from "@libs/elysia";
import { prismaClient } from "@libs/prisma";
import rbac from "@middlewares/rbac";
import Elysia from "elysia";
import assignRolePermissionSchema from "./assign-role-permission.schema";

export const assignRolePermissionController = createElysia({
  prefix: "assign-role-permission",
})
  .use((app: Elysia) => rbac(app, "MANAGE_ROLES_PERMISSIONS"))
  .use(assignRolePermissionSchema)
  .post(
    "",
    async ({ body }) => {
      const { roleId, permissionIds } = body;

      // Check if role exists
      const role = await prismaClient.roles.findUnique({
        where: { id: roleId },
      });

      if (!role) {
        throw new BadRequestException("Role not found");
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

      // Delete all existing role permissions
      await prismaClient.role_has_permissions.deleteMany({
        where: {
          role_id: roleId,
        },
      });

      // Create new role permissions (only if permissionIds is not empty)
      if (permissionIds.length > 0) {
        await prismaClient.role_has_permissions.createMany({
          data: permissionIds.map((permissionId) => ({
            role_id: roleId,
            permission_id: permissionId,
          })),
        });
      }

      // Get the result with full details
      const result = await prismaClient.roles.findUnique({
        where: { id: roleId },
        include: {
          permissions: {
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
        role: {
          id: result?.id,
          name: result?.name,
        },
        totalPermissions: result?.permissions.length || 0,
        permissions: result?.permissions.map((rp) => rp.permission) || [],
      });
    },
    {
      body: "assign-role-permission",
    },
  );
