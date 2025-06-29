import { createElysia } from "@libs/elysia";
import { skStatusCountController } from "./sk-status-count";

export const dashboardV1 = createElysia().use(skStatusCountController);
