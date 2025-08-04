import { createElysia } from "@libs/elysia";
import { prismaClient } from "@libs/prisma";
import signUpSchema from "./sign-up.schema";
import { Responses } from "@constants/responses";

export const SignUpController = createElysia()
  .use(signUpSchema)
  .post(
    "/sign-up",
    async ({ body }) => {
      try {
        const newUser = await prismaClient.user.create({
          data: {
            ...body,
            password: await Bun.password.hash(body.password, {
              algorithm: "bcrypt",
              cost: 10,
            }),
          },
        });

        const wargaDesaRole = await prismaClient.roles.findUnique({
          where: { name: "Warga Desa" },
        });

        if (wargaDesaRole) {
          await prismaClient.user_has_roles.create({
            data: {
              user_id: newUser.id,
              role_id: wargaDesaRole.id,
            },
          });
        }

        return Responses.success(null);
      } catch (error) {
        throw error;
      }
    },
    {
      body: "sign-up",
    }
  );
