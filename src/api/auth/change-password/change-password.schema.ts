import Elysia, { t } from "elysia";

const changePasswordSchema = new Elysia().model({
  "change-password": t.Object({
    currentPassword: t.String(),
    newPassword: t.String({
      minLength: 8,
      maxLength: 64,
    }),
  }),
});

export default changePasswordSchema;
