import { createElysia } from "@libs/elysia";

export const SignOutController = createElysia().post("/log-out", () => {
  return {
    message: "User logged out successfully",
  };
});
