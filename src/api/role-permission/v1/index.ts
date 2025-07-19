import { createElysia } from "@libs/elysia";
import { rolesController } from "./roles";
import { permissionsController } from "./permissions";
import { assignUserRoleController } from "./assign-user-role";
import { assignUserPermissionController } from "./assign-user-permission";
import { assignRolePermissionController } from "./assign-role-permission";

export const rolePermissionV1 = createElysia()
  .use(rolesController)
  .use(permissionsController)
  .use(assignUserRoleController)
  .use(assignUserPermissionController)
  .use(assignRolePermissionController);
