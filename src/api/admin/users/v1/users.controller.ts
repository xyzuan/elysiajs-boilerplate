import { BadRequestException, NotFoundException } from "@constants/exceptions";
import { Responses } from "@constants/responses";
import { IParams } from "@interfaces/params.interface";
import { createElysia } from "@libs/elysia";
import { prismaClient } from "@libs/prisma";
import rbac from "@middlewares/rbac";
import { Gender, MaritalStatus } from "@prisma/client";
import { parseQuery } from "@utils/queryHandler";
import Elysia from "elysia";
import usersSchema from "./users.schema";

export const usersController = createElysia({
  prefix: "users",
})
  .use((app: Elysia) => rbac(app, "MANAGE_USERS"))
  .use(usersSchema)
  .get("", async ({ query }) => {
    const { search = "", limit = 10, page = 1 } = parseQuery(query as IParams);

    const where = {
      OR: search
        ? [
            {
              name: {
                contains: search,
              },
            },
            {
              email: {
                contains: search,
              },
            },
          ]
        : undefined,
    };

    const totalData = Math.ceil(
      (await prismaClient.user.count({
        where,
      })) / limit
    );

    const result = await prismaClient.user.findMany({
      where,
      take: limit,
      skip: (page - 1) * limit,
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        name: true,
        email: true,
        nik: true,
        gender: true,
        work: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return Responses.paginated(result, page, limit, totalData);
  })
  .get(":id", async ({ params: { id } }) => {
    const result = await prismaClient.user.findUnique({
      where: {
        id,
      },
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

    if (!result) {
      throw new NotFoundException("User not found");
    }

    return Responses.success(result);
  })
  .patch(
    ":id",
    async ({ params: { id }, body }) => {
      const { roleIds, permissionIds, gender, marital_status, ...userData } =
        body;

      // Check if user exists
      const existingUser = await prismaClient.user.findUnique({
        where: { id },
      });

      if (!existingUser) {
        throw new NotFoundException("User not found");
      }

      // Validate roles if provided
      if (roleIds && roleIds.length > 0) {
        const roles = await prismaClient.roles.findMany({
          where: { id: { in: roleIds } },
        });

        if (roles.length !== roleIds.length) {
          throw new BadRequestException("One or more roles not found");
        }
      }

      // Validate permissions if provided
      if (permissionIds && permissionIds.length > 0) {
        const permissions = await prismaClient.permissions.findMany({
          where: { id: { in: permissionIds } },
        });

        if (permissions.length !== permissionIds.length) {
          throw new BadRequestException("One or more permissions not found");
        }
      }

      // Update user basic data
      const updatedUser = await prismaClient.user.update({
        where: { id },
        data: {
          ...userData,
          gender: gender as Gender,
          marital_status: marital_status as MaritalStatus,
        },
      });

      // Handle role replacement if roleIds is provided
      if (roleIds !== undefined) {
        // Delete all existing user roles
        await prismaClient.user_has_roles.deleteMany({
          where: {
            user_id: id,
          },
        });

        // Create new user roles (only if roleIds is not empty)
        if (roleIds.length > 0) {
          await prismaClient.user_has_roles.createMany({
            data: roleIds.map((roleId) => ({
              user_id: id,
              role_id: roleId,
            })),
          });
        }
      }

      // Handle permission replacement if permissionIds is provided
      if (permissionIds !== undefined) {
        // Delete all existing user permissions
        await prismaClient.user_has_permissions.deleteMany({
          where: {
            user_id: id,
          },
        });

        // Create new user permissions (only if permissionIds is not empty)
        if (permissionIds.length > 0) {
          await prismaClient.user_has_permissions.createMany({
            data: permissionIds.map((permissionId) => ({
              user_id: id,
              permission_id: permissionId,
            })),
          });
        }
      }

      // Get the final result with all relations
      const result = await prismaClient.user.findUnique({
        where: { id },
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

      return Responses.success(result);
    },
    {
      body: "update-user",
    }
  );
