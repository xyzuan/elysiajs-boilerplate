import { createElysia } from "@libs/elysia";

export const MeController = createElysia().get("/me", () => {
  return {
    message: "User me successfully",
  };
});
