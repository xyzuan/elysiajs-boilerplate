import Elysia, { t } from "elysia";

const skApproverSettingsSchema = new Elysia().model({
  query: t.Object({
    sk_type: t.Optional(
      t.Union([t.Literal("KEMATIAN"), t.Literal("TIDAK_MAMPU")])
    ),
  }),
  "sk-approver-settings": t.Object({
    sk_type: t.Union([t.Literal("KEMATIAN"), t.Literal("TIDAK_MAMPU")]),
    approvers: t.Array(
      t.Object({
        user_approver_id: t.String(),
        is_active: t.Boolean(),
        order_priority: t.Integer({ minimum: 1 }),
      })
    ),
  }),
});

export default skApproverSettingsSchema;
