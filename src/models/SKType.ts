import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const SKType = t.Union(
  [
    t.Literal("KEMATIAN"),
    t.Literal("TIDAK_MAMPU"),
    t.Literal("DISPENSASI"),
    t.Literal("BEDA_NAMA"),
    t.Literal("DOMISILI"),
    t.Literal("KEHILANGAN"),
    t.Literal("KELAHIRAN"),
    t.Literal("USAHA"),
    t.Literal("KTP_SEMENTARA"),
  ],
  { additionalProperties: false },
);
