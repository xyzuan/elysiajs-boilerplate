import { baseElysia } from "@libs/elysia";
import { docs } from "@libs/swagger";

import api from "./api";

export const app = baseElysia()
  .use(docs)
  .use(api)
  .listen(process.env.PORT || 4056);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
