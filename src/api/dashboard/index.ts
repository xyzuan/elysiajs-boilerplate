import { createElysia } from "@libs/elysia";
import { dashboardV1 } from "./v1";

export default createElysia().group("/v1/dashboard", (api) =>
  api.use(dashboardV1)
);
