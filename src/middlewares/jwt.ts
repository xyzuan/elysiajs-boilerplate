import { UnauthorizedException } from "@constants/exceptions";
import { JWT_SECRET } from "@constants/jwt";
import { jwt } from "@elysiajs/jwt";
import { prismaClient } from "@libs/prisma";
import Elysia from "elysia";

const authJwt = (app: Elysia) =>
  app
    .use(
      jwt({
        secret: JWT_SECRET,
      })
    )
    .derive(async ({ cookie: { accessToken }, set, jwt }) => {
      if (!accessToken.value) {
        set.status = "Unauthorized";
        throw new UnauthorizedException("Access token is missing");
      }
      const jwtPayload = await jwt.verify(accessToken.value);
      if (!jwtPayload) {
        set.status = "Forbidden";
        throw new UnauthorizedException("Access token is invalid");
      }

      const userId = jwtPayload.sub;
      const user = await prismaClient.user.findUnique({
        where: {
          id: userId,
        },
        include: {
          user_roles: {
            include: {
              role: {
                select: {
                  id: true,
                  name: true,
                  permissions: {
                    select: {
                      permission: {
                        select: {
                          id: true,
                          name: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          user_permissions: {
            select: {
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

      if (!user) {
        set.status = "Forbidden";
        throw new UnauthorizedException("Access token is invalid");
      }

      return {
        user,
      };
    });

export { authJwt };
