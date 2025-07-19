import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const SKStatus = t.Union(
  [
    t.Literal("VERIFY"),
    t.Literal("APPROVED"),
    t.Literal("REVISED"),
    t.Literal("REJECTED"),
  ],
  { additionalProperties: false },
);
