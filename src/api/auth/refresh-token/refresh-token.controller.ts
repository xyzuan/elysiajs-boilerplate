import { createElysia } from "@libs/elysia";

export const RefreshTokenController = createElysia().post(
  "/refresh-token",
  () => {
    return {
      message: "User token refreshed successfully",
    };
  }
);
