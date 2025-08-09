import { ConflictException } from "@constants/exceptions";
import { Responses } from "@constants/responses";
import { createElysia } from "@libs/elysia";
import { prismaClient } from "@libs/prisma";
import { authJwt } from "@middlewares/jwt";
import meSchema from "./me.schemas";

export const MeController = createElysia()
  .use(authJwt)
  .use(meSchema)
  .get("/me", ({ user }) => {
    return Responses.success({
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      role: user.user_roles.map((userRole) => ({
        id: userRole.role.id,
        name: userRole.role.name,
      })),
      permissions: Array.from(
        new Map([
          ...user.user_roles
            .flatMap((roles) => roles.role.permissions)
            .map((permissions) => [
              permissions.permission.id,
              permissions.permission,
            ]),
          ...user.user_permissions.map((userPermission) => [
            userPermission.permission.id,
            userPermission.permission,
          ]),
        ] as [string, { id: string; name: string }][]).values()
      ),
    });
  })
  .get("/me/profile", async ({ user }) => {
    return Responses.success({
      ...user,
      role: user.user_roles.map((userRole) => ({
        id: userRole.role.id,
        name: userRole.role.name,
      })),
      permissions: Array.from(
        new Map([
          ...user.user_roles
            .flatMap((roles) => roles.role.permissions)
            .map((permissions) => [
              permissions.permission.id,
              permissions.permission,
            ]),
          ...user.user_permissions.map((userPermission) => [
            userPermission.permission.id,
            userPermission.permission,
          ]),
        ] as [string, { id: string; name: string }][]).values()
      ),
    });
  })
  .get("/me/check-profile", ({ user }) => {
    const requiredFields = [
      "name",
      "email",
      "born_birth",
      "born_place",
      "gender",
      "work",
      "marital_status",
      "nik",
      "religion",
      "address",
    ];

    const missingFields: string[] = [];
    const fieldValues: Record<string, any> = {};

    requiredFields.forEach((field) => {
      const value = user[field as keyof typeof user];
      fieldValues[field] = value;

      if (value === null || value === undefined || value === "") {
        missingFields.push(field);
      }
    });

    const isComplete = missingFields.length === 0;
    const completionPercentage = Math.round(
      ((requiredFields.length - missingFields.length) / requiredFields.length) *
        100
    );

    return Responses.success({
      isComplete,
      completionPercentage,
      missingFields,
      totalFields: requiredFields.length,
      completedFields: requiredFields.length - missingFields.length,
    });
  })
  .put(
    "/me",
    async ({ body, user }) => {
      try {
        if (body.email && body.email !== user.email) {
          const existingUser = await prismaClient.user.findUnique({
            where: { email: body.email },
          });
          if (existingUser)
            throw new ConflictException("Email is already taken");
        }

        if (body.nik && body.nik !== user.nik) {
          const existingUser = await prismaClient.user.findUnique({
            where: { nik: body.nik },
          });
          if (existingUser) throw new ConflictException("NIK is already taken");
        }

        const updatedUser = await prismaClient.user.update({
          where: { id: user.id },
          data: {
            ...body,
            updatedAt: new Date(),
          },
          select: {
            id: true,
            name: true,
            email: true,
            born_birth: true,
            born_place: true,
            gender: true,
            work: true,
            marital_status: true,
            nik: true,
            religion: true,
            address: true,
            createdAt: true,
            updatedAt: true,
          },
        });

        return Responses.success(updatedUser);
      } catch (error) {
        throw error;
      }
    },
    {
      body: "update-profile",
    }
  );
