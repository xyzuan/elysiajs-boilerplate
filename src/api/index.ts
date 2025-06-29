import { createElysia } from "@libs/elysia";
import { MeController } from "./auth/me";
import { SignInController } from "./auth/sign-in";
import { SignUpController } from "./auth/sign-up";
import { SignOutController } from "./auth/sign-out";
import { RefreshTokenController } from "./auth/refresh-token";

const api = createElysia({ prefix: "v1/" }).group("auth", (api) =>
  api
    .use(SignUpController)
    .use(SignInController)
    .use(SignOutController)
    .use(RefreshTokenController)
    .use(MeController)
);

export default api;
