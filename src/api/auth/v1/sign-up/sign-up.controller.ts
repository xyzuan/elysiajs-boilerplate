import { createElysia } from "@libs/elysia";
import { prismaClient } from "@libs/prisma";
import signUpSchema from "./sign-up.schema";

export const SignUpController = createElysia()
  .use(signUpSchema)
  .post(
    "/sign-up",
    async ({ body }) => {
      try {
        await prismaClient.user.create({
          data: {
            ...body,
            password: await Bun.password.hash(body.password, {
              algorithm: "bcrypt",
              cost: 10,
            }),
          },
        });

        return {
          message: "User signed up successfully",
        };
      } catch (error) {
        throw error;
      }
    },
    {
      body: "sign-up",
    }
  );
