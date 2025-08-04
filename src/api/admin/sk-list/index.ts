import { createElysia } from "@libs/elysia";
import { skListController } from "./sk-list.controller";

export const skList = createElysia().use(skListController);
