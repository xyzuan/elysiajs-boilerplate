import { createElysia } from "@libs/elysia";
import { SignUpController } from "./auth/sign-up";

const api = createElysia({ prefix: "v1/" }).group("auth", (api) =>
  api.use(SignUpController)
);

export default api;
