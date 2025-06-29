import { createElysia } from "@libs/elysia";
import auth from "./auth";

const api = createElysia().use(auth);

export default api;
