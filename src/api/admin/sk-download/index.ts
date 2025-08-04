import { createElysia } from "@libs/elysia";
import { kematian } from "./kematian";

export const skDownload = createElysia({
  prefix: "sk-download",
}).use(kematian);
