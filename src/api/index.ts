import { createElysia } from "@libs/elysia";
import auth from "./auth";
import suratKeterangan from "./surat-keterangan";

const api = createElysia().use(auth).use(suratKeterangan);

export default api;
