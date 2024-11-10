import { createElysia } from "@libs/elysia";
import HiController from "./controller/hi.controller";

const api = createElysia({ prefix: "v1/" }).group("hi", (api) =>
  api.use(HiController)
);

export default api;
