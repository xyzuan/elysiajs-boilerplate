import cors from "@elysiajs/cors";
import { env } from "@libs/env";
import { error } from "@utils/errorHandler";
import { Elysia, type ElysiaConfig } from "elysia";

const baseElysia = <
  const BasePath extends string = "",
  const Scoped extends boolean = false
>(
  config?: ElysiaConfig<BasePath, Scoped>
) =>
  new Elysia(config)
    .use(
      cors({
        origin: ["xyzuan.my.id", "localhost:3000", "localhost"],
        allowedHeaders: ["Content-Type", "Authorization"],
      })
    )
    .use(env)
    .use(error);

const createElysia = (config?: Parameters<typeof baseElysia>[0]) =>
  new Elysia(config) as ReturnType<typeof baseElysia>;

export { createElysia, baseElysia };
