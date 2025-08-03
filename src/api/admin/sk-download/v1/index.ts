import { createElysia } from "@libs/elysia";
import { kematianV1 } from "./kematian";

export const skDownloadV1 = createElysia({
  prefix: "sk-download",
}).use(kematianV1);
