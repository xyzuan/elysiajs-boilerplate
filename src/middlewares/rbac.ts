import { ForbiddenException } from "@constants/exceptions";
import { Permissions } from "@constants/permissions";
import { prismaClient } from "@libs/prisma";
import Elysia from "elysia";
import { authJwt } from "./jwt";

const rbac = (app: Elysia, permission: Permissions) =>
  app.use(authJwt).derive(async ({ user }) => {
    const userWithRolesAndPermissions = await prismaClient.user.findUnique({
      where: { id: user.id },
      include: {
        user_roles: {
          include: {
            role: {
              include: {
                permissions: {
                  include: { permission: true },
                },
              },
            },
          },
        },
        user_permissions: {
          include: { permission: true },
        },
      },
    });

    if (!userWithRolesAndPermissions) {
      throw new Error("User not found");
    }

    const rolePermissions = userWithRolesAndPermissions.user_roles.flatMap(
      (ur) => ur.role.permissions.map((rp) => rp.permission.name)
    );

    const directPermissions = userWithRolesAndPermissions.user_permissions.map(
      (up) => up.permission.name
    );

    const allPermissions = new Set([...rolePermissions, ...directPermissions]);
    const hasPermission = allPermissions.has(permission);

    if (!hasPermission) {
      throw new ForbiddenException(
        "You do not have permission to access this resource"
      );
    }

    return {
      user: userWithRolesAndPermissions,
    };
  });

export default rbac;
