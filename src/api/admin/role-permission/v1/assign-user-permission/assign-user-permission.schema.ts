import Elysia, { t } from "elysia";

const assignUserPermissionSchema = new Elysia().model({
  "assign-user-permission": t.Object({
    userId: t.String(),
    permissionIds: t.Array(t.String()),
  }),
});

export default assignUserPermissionSchema;
