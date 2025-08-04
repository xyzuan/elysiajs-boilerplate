import { BadRequestException, NotFoundException } from "@constants/exceptions";
import { Responses } from "@constants/responses";
import { createElysia } from "@libs/elysia";
import { prismaClient } from "@libs/prisma";
import rbac from "@middlewares/rbac";
import Elysia from "elysia";
import assignUserRoleSchema from "./assign-user-role.schema";

export const assignUserRoleController = createElysia({
  prefix: "assign-user-role",
})
  .use((app: Elysia) => rbac(app, "MANAGE_ROLES_PERMISSIONS"))
  .use(assignUserRoleSchema)
  .post(
    "",
    async ({ body }) => {
      const { userId, roleIds } = body;

      // Check if user exists
      const user = await prismaClient.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        throw new BadRequestException("User not found");
      }

      // Check if roles exist (only if roleIds is not empty)
      if (roleIds.length > 0) {
        const roles = await prismaClient.roles.findMany({
          where: { id: { in: roleIds } },
        });

        if (roles.length !== roleIds.length) {
          throw new BadRequestException("One or more roles not found");
        }
      }

      // Delete all existing user roles
      await prismaClient.user_has_roles.deleteMany({
        where: {
          user_id: userId,
        },
      });

      // Create new user roles (only if roleIds is not empty)
      if (roleIds.length > 0) {
        await prismaClient.user_has_roles.createMany({
          data: roleIds.map((roleId) => ({
            user_id: userId,
            role_id: roleId,
          })),
        });
      }

      // Get the result with full details
      const result = await prismaClient.user.findUnique({
        where: { id: userId },
        include: {
          user_roles: {
            include: {
              role: {
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
        totalRoles: result?.user_roles.length || 0,
        roles: result?.user_roles.map((ur) => ur.role) || [],
      });
    },
    {
      body: "assign-user-role",
    },
  );
