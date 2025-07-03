import { createElysia } from "@libs/elysia";
import { changeStatusSk } from "./v1/change-status-sk.controller";

export const changeStatusSkV1 = createElysia().use(changeStatusSk);
