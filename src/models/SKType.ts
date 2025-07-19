import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const SKType = t.Union(
  [t.Literal("KEMATIAN"), t.Literal("TIDAK_MAMPU")],
  { additionalProperties: false },
);
