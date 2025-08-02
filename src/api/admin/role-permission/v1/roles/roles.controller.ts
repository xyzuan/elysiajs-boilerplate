import { ConflictException, NotFoundException } from "@constants/exceptions";
import { Responses } from "@constants/responses";
import { IParams } from "@interfaces/params.interface";
import { createElysia } from "@libs/elysia";
import { prismaClient } from "@libs/prisma";
import rbac from "@middlewares/rbac";
import { parseQuery } from "@utils/queryHandler";
import Elysia from "elysia";
import rolesSchema from "./roles.schema";

export const rolesController = createElysia({
  prefix: "roles",
})
  .use(rolesSchema)
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
          ]
        : undefined,
    };

    const totalData = Math.ceil(
      (await prismaClient.roles.count({
        where,
      })) / limit,
    );

    const result = await prismaClient.roles.findMany({
      where,
      take: limit,
      skip: (page - 1) * limit,
      orderBy: {
        created_at: "desc",
      },
    });

    return Responses.paginated(result, page, limit, totalData);
  })
  .use((app: Elysia) => rbac(app, "MANAGE_ROLES_PERMISSIONS"))
  .post(
    "",
    async ({ body }) => {
      // Check if role name already exists
      const existingRole = await prismaClient.roles.findUnique({
        where: { name: body.name },
      });

      if (existingRole) {
        throw new ConflictException("Role with this name already exists");
      }

      const result = await prismaClient.roles.create({
        data: body,
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

      return Responses.success(result);
    },
    {
      body: "create-role",
    },
  )
  .get(":id", async ({ params: { id } }) => {
    const result = await prismaClient.roles.findUnique({
      where: {
        id,
      },
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

    if (!result) {
      throw new NotFoundException("Role not found");
    }

    return Responses.success(result);
  })
  .patch(
    ":id",
    async ({ params: { id }, body }) => {
      const existingRole = await prismaClient.roles.findUnique({
        where: { id },
      });

      if (!existingRole) {
        throw new NotFoundException("Role not found");
      }

      const result = await prismaClient.roles.update({
        where: { id },
        data: body,
      });

      return Responses.success(result);
    },
    {
      body: "update-role",
    },
  )
  .delete(":id", async ({ params: { id } }) => {
    // Check if role exists
    const existingRole = await prismaClient.roles.findUnique({
      where: { id },
    });

    if (!existingRole) {
      throw new NotFoundException("Role not found");
    }

    // Check if role is being used by any users
    const usersWithRole = await prismaClient.user_has_roles.findFirst({
      where: { role_id: id },
    });

    if (usersWithRole) {
      throw new ConflictException(
        "Cannot delete role that is assigned to users",
      );
    }

    // Delete role permissions first (cascade)
    await prismaClient.role_has_permissions.deleteMany({
      where: { role_id: id },
    });

    // Delete the role
    await prismaClient.roles.delete({
      where: { id },
    });

    return Responses.success({ message: "Role deleted successfully" });
  });
