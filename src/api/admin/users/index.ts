import { createElysia } from "@libs/elysia";
import { usersController } from "./users.controller";

export const users = createElysia().use(usersController);
