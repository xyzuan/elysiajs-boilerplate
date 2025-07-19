import { createElysia } from "@libs/elysia";
import { rolePermissionV1 } from "./v1";

export default createElysia().group("/v1/role-permission", (api) =>
  api.use(rolePermissionV1),
);
