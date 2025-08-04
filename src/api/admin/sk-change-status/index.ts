import { createElysia } from "@libs/elysia";
import { changeStatusSk } from "./change-status-sk.controller";

export const changeStatusSkModule = createElysia().use(changeStatusSk);
