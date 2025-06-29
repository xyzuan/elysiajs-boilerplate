import { createElysia } from "@libs/elysia";
import { SkKematianController } from "./sk-kematian";
import { SkMyList } from "./sk-my-list";

export const skV1 = createElysia().use(SkMyList).use(SkKematianController);
