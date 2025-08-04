import { Responses } from "@constants/responses";
import { createElysia } from "@libs/elysia";
import { authJwt } from "@middlewares/jwt";

export const MeController = createElysia()
  .use(authJwt)
  .get("/me", ({ user }) => {
    return Responses.success({
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      role: user.user_roles.map((userRole) => ({
        id: userRole.role.id,
        name: userRole.role.name,
      })),
      permissions: Array.from(
        new Map([
          ...user.user_roles
            .flatMap((roles) => roles.role.permissions)
            .map((permissions) => [
              permissions.permission.id,
              permissions.permission,
            ]),
          ...user.user_permissions.map((userPermission) => [
            userPermission.permission.id,
            userPermission.permission,
          ]),
        ] as [string, { id: string; name: string }][]).values()
      ),
    });
  });
