import Elysia, { t } from "elysia";

const rolesSchema = new Elysia().model({
  "create-role": t.Object({
    name: t.String({
      minLength: 1,
      maxLength: 255,
    }),
  }),
  "update-role": t.Object({
    name: t.Optional(
      t.String({
        minLength: 1,
        maxLength: 255,
      })
    ),
  }),
});

export default rolesSchema;
