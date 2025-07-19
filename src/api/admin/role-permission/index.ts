import { createElysia } from "@libs/elysia";
import { rolesController } from "./v1/roles";
import { permissionsController } from "./v1/permissions";
import { assignUserRoleController } from "./v1/assign-user-role";
import { assignUserPermissionController } from "./v1/assign-user-permission";
import { assignRolePermissionController } from "./v1/assign-role-permission";

export const rolePermissionV1 = createElysia()
  .use(rolesController)
  .use(permissionsController)
  .use(assignUserRoleController)
  .use(assignUserPermissionController)
  .use(assignRolePermissionController);
