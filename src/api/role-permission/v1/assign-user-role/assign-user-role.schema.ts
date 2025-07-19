import Elysia, { t } from "elysia";

const assignUserRoleSchema = new Elysia().model({
  "assign-user-role": t.Object({
    userId: t.String(),
    roleIds: t.Array(t.String()),
  }),
});

export default assignUserRoleSchema;
