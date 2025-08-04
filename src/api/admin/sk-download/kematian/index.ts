import { createElysia } from "@libs/elysia";
import { kematianController } from "./kematian.controller";

export const kematian = createElysia().use(kematianController);
