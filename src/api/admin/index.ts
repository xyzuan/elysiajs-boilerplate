import { createElysia } from "@libs/elysia";
import { rolePermission } from "./role-permission";
import { skApproverSettings } from "./sk-approver-settings";
import { changeStatusSkModule } from "./sk-change-status";
import { skDetail } from "./sk-detail";
import { skList } from "./sk-list";
import { users } from "./users";

export default createElysia().group("/admin", (api) =>
  api
    .use(changeStatusSkModule)
    .use(rolePermission)
    .use(users)
    .use(skList)
    .use(skApproverSettings)
    .use(skDetail)
);
