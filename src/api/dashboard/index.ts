import { createElysia } from "@libs/elysia";
import { skStatusCountController } from "./sk-status-count";

export default createElysia().group("/dashboard", (api) =>
  api.use(skStatusCountController),
);
