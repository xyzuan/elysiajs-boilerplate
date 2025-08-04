import { createElysia } from "@libs/elysia";
import { SkKematianController } from "./sk-kematian";
import { SkMyList } from "./sk-my-list";
import { SkTidakMampuController } from "./sk-tidak-mampu";

export default createElysia().group("/sk", (api) =>
  api.use(SkMyList).use(SkKematianController).use(SkTidakMampuController),
);
