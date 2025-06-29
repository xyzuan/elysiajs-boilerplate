import { createElysia } from "@libs/elysia";
import { skV1 } from "./v1";

export default createElysia().group("/v1/sk", (api) => api.use(skV1));
