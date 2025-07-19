import { baseElysia } from "@libs/elysia";
import { docs } from "@libs/swagger";
import cors from "@elysiajs/cors";

import api from "./api";

export const app = baseElysia()
  .use(
    cors({
      origin: [
        "xyzuan.com",
        "http://localhost:5173",
        "https://localhost:5173",
        "http://localhost:3000",
        "https://localhost:3000",
      ],
      allowedHeaders: ["Content-Type", "Authorization"],
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
      preflight: true,
      credentials: true,
    })
  )
  .use(docs)
  .use(api)
  .listen(process.env.PORT || 4056);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
