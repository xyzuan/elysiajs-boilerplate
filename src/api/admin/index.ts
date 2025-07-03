import { createElysia } from "@libs/elysia";
import { changeStatusSkV1 } from "./change-status-sk";

export default createElysia().group("v1/admin", (api) =>
  api.use(changeStatusSkV1)
);
