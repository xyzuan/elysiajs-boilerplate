import Elysia, { t } from "elysia";

const signUpSchema = new Elysia().model({
  "sign-up": t.Object({
    email: t.String({
      format: "email",
    }),
    password: t.String({
      minLength: 8,
      maxLength: 64,
    }),
    name: t.String({
      minLength: 3,
      maxLength: 32,
    }),
  }),
});

export default signUpSchema;
