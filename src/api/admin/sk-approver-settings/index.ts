import { createElysia } from "@libs/elysia";
import { skApproverSettingsController } from "./sk-approver-settings.controller";

export const skApproverSettings = createElysia().use(
  skApproverSettingsController
);
