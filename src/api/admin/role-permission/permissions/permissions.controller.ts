import { ConflictException, NotFoundException } from "@constants/exceptions";
import { Responses } from "@constants/responses";
import { IParams } from "@interfaces/params.interface";
import { createElysia } from "@libs/elysia";
import { prismaClient } from "@libs/prisma";
import rbac from "@middlewares/rbac";
import { parseQuery } from "@utils/queryHandler";
import Elysia from "elysia";
import permissionsSchema from "./permissions.schema";

export const permissionsController = createElysia({
  prefix: "permissions",
})
  .use(permissionsSchema)
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
      (await prismaClient.permissions.count({
        where,
      })) / limit,
    );

    const result = await prismaClient.permissions.findMany({
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
      // Check if permission name already exists
      const existingPermission = await prismaClient.permissions.findUnique({
        where: { name: body.name },
      });

      if (existingPermission) {
        throw new ConflictException("Permission with this name already exists");
      }

      const result = await prismaClient.permissions.create({
        data: body,
      });

      return Responses.success(result);
    },
    {
      body: "create-permission",
    },
  )
  .get(":id", async ({ params: { id } }) => {
    const result = await prismaClient.permissions.findUnique({
      where: {
        id,
      },
      include: {
        role_permissions: {
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
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    if (!result) {
      throw new NotFoundException("Permission not found");
    }

    return Responses.success(result);
  })
  .patch(
    ":id",
    async ({ params: { id }, body }) => {
      const existingPermission = await prismaClient.permissions.findUnique({
        where: { id },
      });

      if (!existingPermission) {
        throw new NotFoundException("Permission not found");
      }

      // Check if new name already exists (if name is being updated)
      if (body.name && body.name !== existingPermission.name) {
        const duplicatePermission = await prismaClient.permissions.findUnique({
          where: { name: body.name },
        });

        if (duplicatePermission) {
          throw new ConflictException(
            "Permission with this name already exists",
          );
        }
      }

      const result = await prismaClient.permissions.update({
        where: { id },
        data: body,
      });

      return Responses.success(result);
    },
    {
      body: "update-permission",
    },
  )
  .delete(":id", async ({ params: { id } }) => {
    // Check if permission exists
    const existingPermission = await prismaClient.permissions.findUnique({
      where: { id },
    });

    if (!existingPermission) {
      throw new NotFoundException("Permission not found");
    }

    // Delete the permission (cascade deletion will automatically remove related records)
    await prismaClient.permissions.delete({
      where: { id },
    });

    return Responses.success({ message: "Permission deleted successfully" });
  });
