import { createElysia } from "@libs/elysia";
import { skDownloadV1 } from "./v1";

export const skDownloadV1Export = createElysia().use(skDownloadV1);
