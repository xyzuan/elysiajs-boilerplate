import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const MaritalStatus = t.Union(
  [
    t.Literal("SINGLE"),
    t.Literal("MARRIED"),
    t.Literal("DIVORCED"),
    t.Literal("WIDOWED"),
    t.Literal("SEPARATED"),
    t.Literal("SIRI"),
  ],
  { additionalProperties: false },
);
