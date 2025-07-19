import { createElysia } from "@libs/elysia";
import { skListController } from "./v1";

export const skListV1 = createElysia().use(skListController);
