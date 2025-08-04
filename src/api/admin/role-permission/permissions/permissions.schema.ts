import Elysia, { t } from "elysia";

const permissionsSchema = new Elysia().model({
  "create-permission": t.Object({
    name: t.String({
      minLength: 1,
      maxLength: 255,
    }),
  }),
  "update-permission": t.Object({
    name: t.Optional(
      t.String({
        minLength: 1,
        maxLength: 255,
      })
    ),
  }),
});

export default permissionsSchema;
