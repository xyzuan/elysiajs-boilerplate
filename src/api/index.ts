import { createElysia } from "@libs/elysia";
import admin from "./admin";
import auth from "./auth";
import dashboard from "./dashboard";
import suratKeterangan from "./surat-keterangan";

const api = createElysia()
  .use(admin)
  .use(auth)
  .use(dashboard)
  .use(suratKeterangan);

export default api;
