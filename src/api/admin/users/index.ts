import { createElysia } from "@libs/elysia";
import { usersController } from "./v1";

export const usersV1 = createElysia().use(usersController);
