import { createElysia } from "@libs/elysia";
import auth from "./auth";
import dashboard from "./dashboard";
import suratKeterangan from "./surat-keterangan";

const api = createElysia().use(auth).use(dashboard).use(suratKeterangan);

export default api;
