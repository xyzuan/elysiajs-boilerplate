import { createElysia } from "@libs/elysia";
import signInSchema from "./sign-in.schema";

export const SignInController = createElysia()
  .use(signInSchema)
  .post(
    "/sign-in",
    async ({ body }) => {
      return {
        message: "User signed in successfully",
        user: body,
      };
    },
    {
      body: "sign-in",
    }
  );
