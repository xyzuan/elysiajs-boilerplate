import { createElysia } from "@libs/elysia";
import { changeStatusSkV1 } from "./change-status-sk";
import { rolePermissionV1 } from "./role-permission";
import { usersV1 } from "./users";

export default createElysia().group("v1/admin", (api) =>
  api.use(changeStatusSkV1).use(rolePermissionV1).use(usersV1),
);
