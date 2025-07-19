import Elysia, { t } from "elysia";

const usersSchema = new Elysia().model({
  "update-user": t.Object({
    name: t.Optional(
      t.String({
        minLength: 3,
        maxLength: 32,
      }),
    ),
    email: t.Optional(
      t.String({
        format: "email",
      }),
    ),
    born_birth: t.Optional(t.Date()),
    born_place: t.Optional(t.String()),
    gender: t.Optional(
      t.String({
        enum: ["MALE", "FEMALE"],
      }),
    ),
    work: t.Optional(t.String()),
    marital_status: t.Optional(
      t.String({
        enum: ["SINGLE", "MARRIED", "DIVORCED", "WIDOWED", "SEPARATED", "SIRI"],
      }),
    ),
    nik: t.Optional(
      t.String({
        minLength: 16,
        maxLength: 16,
      }),
    ),
    religion: t.Optional(t.String()),
    address: t.Optional(t.String()),
    roleIds: t.Optional(t.Array(t.String())),
    permissionIds: t.Optional(t.Array(t.String())),
  }),
});

export default usersSchema;
