import { createElysia } from "@libs/elysia";
import { SignUpController } from "./sign-up";
import { SignInController } from "./sign-in";
import { SignOutController } from "./sign-out";
import { RefreshTokenController } from "./refresh-token";
import { MeController } from "./me";

export const authV1 = createElysia()
  .use(SignUpController)
  .use(SignInController)
  .use(SignOutController)
  .use(RefreshTokenController)
  .use(MeController);
