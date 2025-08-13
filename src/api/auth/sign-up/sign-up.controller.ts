import { createElysia } from "@libs/elysia";
import { prismaClient } from "@libs/prisma";
import signUpSchema from "./sign-up.schema";
import { Responses } from "@constants/responses";
import { BadRequestException } from "@constants/exceptions";

export const SignUpController = createElysia()
  .use(signUpSchema)
  .post(
    "/sign-up",
    async ({ body }) => {
      const existingUser = await prismaClient.user.findUnique({
        where: { email: body.email },
      });

      if (existingUser) throw new BadRequestException("User already exists");

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
    },
    {
      body: "sign-up",
    }
  );
