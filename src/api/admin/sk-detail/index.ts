import { createElysia } from "@libs/elysia";
import { skDetailController } from "./sk-detail.controller";

export const skDetail = createElysia().use(skDetailController);
