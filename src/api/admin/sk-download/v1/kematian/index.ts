import { createElysia } from "@libs/elysia";
import { kematianController } from "./kematian.controller";

export const kematianV1 = createElysia().use(kematianController);
