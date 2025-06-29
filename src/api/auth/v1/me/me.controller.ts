import { createElysia } from "@libs/elysia";
import { authJwt } from "@middlewares/jwt";

export const MeController = createElysia()
  .use(authJwt)
  .get("/me", ({ user }) => {
    return {
      status: "SUCCESS",
      data: {
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        role: user.role,
      },
    };
  });
