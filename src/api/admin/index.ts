import { createElysia } from "@libs/elysia";
import { changeStatusSkModule } from "./sk-change-status";
import { rolePermission } from "./role-permission";
import { users } from "./users";
import { skList } from "./sk-list";
import { skDownload } from "./sk-download";

export default createElysia().group("/admin", (api) =>
  api
    .use(changeStatusSkModule)
    .use(rolePermission)
    .use(users)
    .use(skList)
    .use(skDownload),
);
