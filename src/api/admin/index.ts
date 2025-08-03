import { createElysia } from "@libs/elysia";
import { changeStatusSkV1 } from "./sk-change-status";
import { rolePermissionV1 } from "./role-permission";
import { usersV1 } from "./users";
import { skListV1 } from "./sk-list";
import { skDownloadV1Export } from "./sk-download";

export default createElysia().group("v1/admin", (api) =>
  api
    .use(changeStatusSkV1)
    .use(rolePermissionV1)
    .use(usersV1)
    .use(skListV1)
    .use(skDownloadV1Export),
);
