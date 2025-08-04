import Elysia, { t } from "elysia";

const assignRolePermissionSchema = new Elysia().model({
  "assign-role-permission": t.Object({
    roleId: t.String(),
    permissionIds: t.Array(t.String()),
  }),
});

export default assignRolePermissionSchema;
