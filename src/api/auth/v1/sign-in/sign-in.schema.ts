import Elysia, { t } from "elysia";

const signInSchema = new Elysia().model({
  "sign-in": t.Object({
    email: t.String({
      format: "email",
    }),
    password: t.String(),
  }),
});

export default signInSchema;
