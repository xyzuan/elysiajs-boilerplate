import { createElysia } from "@libs/elysia";
import { authV1 } from "./v1";

export default createElysia().group("/v1/auth", (api) => api.use(authV1));
