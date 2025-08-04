import Elysia, { t } from "elysia";

const usersSchema = new Elysia().model({
  "update-user": t.Object({
    name: t.Optional(
      t.String({
        minLength: 1,
        maxLength: 255,
      })
    ),
    email: t.Optional(
      t.String({
        format: "email",
      })
    ),
    nik: t.Optional(
      t.String({
        minLength: 16,
        maxLength: 16,
      })
    ),
    work: t.Optional(
      t.String({
        maxLength: 255,
      })
    ),
    gender: t.Optional(
      t.Union([t.Literal("MALE"), t.Literal("FEMALE")])
    ),
    marital_status: t.Optional(
      t.Union([t.Literal("SINGLE"), t.Literal("MARRIED"), t.Literal("DIVORCED"), t.Literal("WIDOWED")])
    ),
    roleIds: t.Optional(
      t.Array(t.String())
    ),
    permissionIds: t.Optional(
      t.Array(t.String())
    ),
  }),
});

export default usersSchema;
