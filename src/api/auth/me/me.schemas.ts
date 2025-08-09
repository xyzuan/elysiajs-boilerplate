import Elysia, { t } from "elysia";

const meSchema = new Elysia().model({
  "update-profile": t.Object({
    name: t.Optional(
      t.String({
        minLength: 1,
        maxLength: 60,
      })
    ),
    email: t.Optional(
      t.String({
        format: "email",
      })
    ),
    born_birth: t.Optional(t.Date()),
    born_place: t.Optional(t.String()),
    gender: t.Optional(t.Union([t.Literal("MALE"), t.Literal("FEMALE")])),
    work: t.Optional(t.String()),
    marital_status: t.Optional(
      t.Union([
        t.Literal("SINGLE"),
        t.Literal("MARRIED"),
        t.Literal("DIVORCED"),
        t.Literal("WIDOWED"),
        t.Literal("SEPARATED"),
        t.Literal("SIRI"),
      ])
    ),
    nik: t.Optional(
      t.String({
        minLength: 16,
        maxLength: 16,
      })
    ),
    religion: t.Optional(t.String()),
    address: t.Optional(t.String()),
  }),
});

export default meSchema;
