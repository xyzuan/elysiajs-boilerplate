import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const sk_dispensasiPlain = t.Object(
  {
    id: t.String(),
    name: t.String(),
    born_birth: t.Date(),
    born_place: t.String(),
    gender: t.Union([t.Literal("MALE"), t.Literal("FEMALE")], {
      additionalProperties: false,
    }),
    nik: t.String(),
    religion: t.String(),
    address: t.String(),
    marital_status: t.Union(
      [
        t.Literal("SINGLE"),
        t.Literal("MARRIED"),
        t.Literal("DIVORCED"),
        t.Literal("WIDOWED"),
        t.Literal("SEPARATED"),
        t.Literal("SIRI"),
      ],
      { additionalProperties: false },
    ),
    start_date: t.Date(),
    end_date: t.Date(),
    reason: t.String(),
    purpose: t.String(),
    createdAt: t.Date(),
    updatedAt: __nullable__(t.Date()),
    user_sk_id: __nullable__(t.String()),
  },
  { additionalProperties: false },
);

export const sk_dispensasiRelations = t.Object(
  {
    user_sk: __nullable__(
      t.Object(
        {
          id: t.String(),
          user_id: t.String(),
          sk_type: t.Union(
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
          ),
          createdAt: t.Date(),
          updatedAt: __nullable__(t.Date()),
        },
        { additionalProperties: false },
      ),
    ),
  },
  { additionalProperties: false },
);

export const sk_dispensasiPlainInputCreate = t.Object(
  {
    name: t.String(),
    born_birth: t.Date(),
    born_place: t.String(),
    gender: t.Union([t.Literal("MALE"), t.Literal("FEMALE")], {
      additionalProperties: false,
    }),
    nik: t.String(),
    religion: t.String(),
    address: t.String(),
    marital_status: t.Union(
      [
        t.Literal("SINGLE"),
        t.Literal("MARRIED"),
        t.Literal("DIVORCED"),
        t.Literal("WIDOWED"),
        t.Literal("SEPARATED"),
        t.Literal("SIRI"),
      ],
      { additionalProperties: false },
    ),
    start_date: t.Date(),
    end_date: t.Date(),
    reason: t.String(),
    purpose: t.String(),
  },
  { additionalProperties: false },
);

export const sk_dispensasiPlainInputUpdate = t.Object(
  {
    name: t.Optional(t.String()),
    born_birth: t.Optional(t.Date()),
    born_place: t.Optional(t.String()),
    gender: t.Optional(
      t.Union([t.Literal("MALE"), t.Literal("FEMALE")], {
        additionalProperties: false,
      }),
    ),
    nik: t.Optional(t.String()),
    religion: t.Optional(t.String()),
    address: t.Optional(t.String()),
    marital_status: t.Optional(
      t.Union(
        [
          t.Literal("SINGLE"),
          t.Literal("MARRIED"),
          t.Literal("DIVORCED"),
          t.Literal("WIDOWED"),
          t.Literal("SEPARATED"),
          t.Literal("SIRI"),
        ],
        { additionalProperties: false },
      ),
    ),
    start_date: t.Optional(t.Date()),
    end_date: t.Optional(t.Date()),
    reason: t.Optional(t.String()),
    purpose: t.Optional(t.String()),
  },
  { additionalProperties: false },
);

export const sk_dispensasiRelationsInputCreate = t.Object(
  {
    user_sk: t.Optional(
      t.Object(
        {
          connect: t.Object(
            {
              id: t.String({ additionalProperties: false }),
            },
            { additionalProperties: false },
          ),
        },
        { additionalProperties: false },
      ),
    ),
  },
  { additionalProperties: false },
);

export const sk_dispensasiRelationsInputUpdate = t.Partial(
  t.Object(
    {
      user_sk: t.Partial(
        t.Object(
          {
            connect: t.Object(
              {
                id: t.String({ additionalProperties: false }),
              },
              { additionalProperties: false },
            ),
            disconnect: t.Boolean(),
          },
          { additionalProperties: false },
        ),
      ),
    },
    { additionalProperties: false },
  ),
);

export const sk_dispensasiWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
          id: t.String(),
          name: t.String(),
          born_birth: t.Date(),
          born_place: t.String(),
          gender: t.Union([t.Literal("MALE"), t.Literal("FEMALE")], {
            additionalProperties: false,
          }),
          nik: t.String(),
          religion: t.String(),
          address: t.String(),
          marital_status: t.Union(
            [
              t.Literal("SINGLE"),
              t.Literal("MARRIED"),
              t.Literal("DIVORCED"),
              t.Literal("WIDOWED"),
              t.Literal("SEPARATED"),
              t.Literal("SIRI"),
            ],
            { additionalProperties: false },
          ),
          start_date: t.Date(),
          end_date: t.Date(),
          reason: t.String(),
          purpose: t.String(),
          createdAt: t.Date(),
          updatedAt: t.Date(),
          user_sk_id: t.String(),
        },
        { additionalProperties: false },
      ),
    { $id: "sk_dispensasi" },
  ),
);

export const sk_dispensasiWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect(
      [
        t.Partial(
          t.Object(
            { id: t.String(), user_sk_id: t.String() },
            { additionalProperties: false },
          ),
          { additionalProperties: false },
        ),
        t.Union(
          [t.Object({ id: t.String() }), t.Object({ user_sk_id: t.String() })],
          { additionalProperties: false },
        ),
        t.Partial(
          t.Object({
            AND: t.Union([
              Self,
              t.Array(Self, { additionalProperties: false }),
            ]),
            NOT: t.Union([
              Self,
              t.Array(Self, { additionalProperties: false }),
            ]),
            OR: t.Array(Self, { additionalProperties: false }),
          }),
          { additionalProperties: false },
        ),
        t.Partial(
          t.Object(
            {
              id: t.String(),
              name: t.String(),
              born_birth: t.Date(),
              born_place: t.String(),
              gender: t.Union([t.Literal("MALE"), t.Literal("FEMALE")], {
                additionalProperties: false,
              }),
              nik: t.String(),
              religion: t.String(),
              address: t.String(),
              marital_status: t.Union(
                [
                  t.Literal("SINGLE"),
                  t.Literal("MARRIED"),
                  t.Literal("DIVORCED"),
                  t.Literal("WIDOWED"),
                  t.Literal("SEPARATED"),
                  t.Literal("SIRI"),
                ],
                { additionalProperties: false },
              ),
              start_date: t.Date(),
              end_date: t.Date(),
              reason: t.String(),
              purpose: t.String(),
              createdAt: t.Date(),
              updatedAt: t.Date(),
              user_sk_id: t.String(),
            },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "sk_dispensasi" },
);

export const sk_dispensasiSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      name: t.Boolean(),
      born_birth: t.Boolean(),
      born_place: t.Boolean(),
      gender: t.Boolean(),
      nik: t.Boolean(),
      religion: t.Boolean(),
      address: t.Boolean(),
      marital_status: t.Boolean(),
      start_date: t.Boolean(),
      end_date: t.Boolean(),
      reason: t.Boolean(),
      purpose: t.Boolean(),
      createdAt: t.Boolean(),
      updatedAt: t.Boolean(),
      user_sk_id: t.Boolean(),
      user_sk: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const sk_dispensasiInclude = t.Partial(
  t.Object(
    {
      gender: t.Boolean(),
      marital_status: t.Boolean(),
      user_sk: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const sk_dispensasiOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      name: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      born_birth: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      born_place: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      nik: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      religion: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      address: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      start_date: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      end_date: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      reason: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      purpose: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      createdAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      updatedAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      user_sk_id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
    },
    { additionalProperties: false },
  ),
);

export const sk_dispensasi = t.Composite(
  [sk_dispensasiPlain, sk_dispensasiRelations],
  { additionalProperties: false },
);

export const sk_dispensasiInputCreate = t.Composite(
  [sk_dispensasiPlainInputCreate, sk_dispensasiRelationsInputCreate],
  { additionalProperties: false },
);

export const sk_dispensasiInputUpdate = t.Composite(
  [sk_dispensasiPlainInputUpdate, sk_dispensasiRelationsInputUpdate],
  { additionalProperties: false },
);
