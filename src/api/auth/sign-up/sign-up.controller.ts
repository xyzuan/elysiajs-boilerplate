import { createElysia } from "@libs/elysia";
import signUpSchema from "./sign-up.schema";

export const SignUpController = createElysia()
  .use(signUpSchema)
  .post(
    "/sign-up",
    ({ body }) => {
      return {
        message: "User signed up successfully",
        user: body,
      };
    },
    {
      body: "sign-up",
    }
  );
