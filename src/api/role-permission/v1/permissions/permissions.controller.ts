import { Responses } from "@constants/responses";
import { IParams } from "@interfaces/params.interface";
import { createElysia } from "@libs/elysia";
import { prismaClient } from "@libs/prisma";
import rbac from "@middlewares/rbac";
import { parseQuery } from "@utils/queryHandler";
import Elysia from "elysia";

export const permissionsController = createElysia({
  prefix: "permissions",
})
  .use((app: Elysia) => rbac(app, "MANAGE_ROLES_PERMISSIONS"))
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
  });
