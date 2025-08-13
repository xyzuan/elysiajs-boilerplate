import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const sk_approver_settingsPlain = t.Object(
  {
    id: t.String(),
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
    user_approver_id: t.String(),
    is_active: t.Boolean(),
    order_priority: t.Integer(),
    createdAt: t.Date(),
    updatedAt: __nullable__(t.Date()),
  },
  { additionalProperties: false },
);

export const sk_approver_settingsRelations = t.Object(
  {
    approver: t.Object(
      {
        id: t.String(),
        name: t.String(),
        email: t.String(),
        phone_number: __nullable__(t.String()),
        password: t.String(),
        born_birth: __nullable__(t.Date()),
        born_place: __nullable__(t.String()),
        gender: __nullable__(
          t.Union([t.Literal("MALE"), t.Literal("FEMALE")], {
            additionalProperties: false,
          }),
        ),
        work: __nullable__(t.String()),
        marital_status: __nullable__(
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
        nik: __nullable__(t.String()),
        religion: __nullable__(t.String()),
        address: __nullable__(t.String()),
        createdAt: t.Date(),
        updatedAt: __nullable__(t.Date()),
      },
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);

export const sk_approver_settingsPlainInputCreate = t.Object(
  {
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
    is_active: t.Optional(t.Boolean()),
    order_priority: t.Optional(t.Integer()),
  },
  { additionalProperties: false },
);

export const sk_approver_settingsPlainInputUpdate = t.Object(
  {
    sk_type: t.Optional(
      t.Union(
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
    ),
    is_active: t.Optional(t.Boolean()),
    order_priority: t.Optional(t.Integer()),
  },
  { additionalProperties: false },
);

export const sk_approver_settingsRelationsInputCreate = t.Object(
  {
    approver: t.Object(
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
  },
  { additionalProperties: false },
);

export const sk_approver_settingsRelationsInputUpdate = t.Partial(
  t.Object(
    {
      approver: t.Object(
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
    },
    { additionalProperties: false },
  ),
);

export const sk_approver_settingsWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
          id: t.String(),
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
          user_approver_id: t.String(),
          is_active: t.Boolean(),
          order_priority: t.Integer(),
          createdAt: t.Date(),
          updatedAt: t.Date(),
        },
        { additionalProperties: false },
      ),
    { $id: "sk_approver_settings" },
  ),
);

export const sk_approver_settingsWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect(
      [
        t.Partial(
          t.Object(
            {
              id: t.String(),
              sk_type_user_approver_id: t.Object(
                {
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
                  user_approver_id: t.String(),
                },
                { additionalProperties: false },
              ),
            },
            { additionalProperties: false },
          ),
          { additionalProperties: false },
        ),
        t.Union(
          [
            t.Object({ id: t.String() }),
            t.Object({
              sk_type_user_approver_id: t.Object(
                {
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
                  user_approver_id: t.String(),
                },
                { additionalProperties: false },
              ),
            }),
          ],
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
              user_approver_id: t.String(),
              is_active: t.Boolean(),
              order_priority: t.Integer(),
              createdAt: t.Date(),
              updatedAt: t.Date(),
            },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "sk_approver_settings" },
);

export const sk_approver_settingsSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      sk_type: t.Boolean(),
      user_approver_id: t.Boolean(),
      is_active: t.Boolean(),
      order_priority: t.Boolean(),
      createdAt: t.Boolean(),
      updatedAt: t.Boolean(),
      approver: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const sk_approver_settingsInclude = t.Partial(
  t.Object(
    { sk_type: t.Boolean(), approver: t.Boolean(), _count: t.Boolean() },
    { additionalProperties: false },
  ),
);

export const sk_approver_settingsOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      user_approver_id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      is_active: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      order_priority: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      createdAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      updatedAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
    },
    { additionalProperties: false },
  ),
);

export const sk_approver_settings = t.Composite(
  [sk_approver_settingsPlain, sk_approver_settingsRelations],
  { additionalProperties: false },
);

export const sk_approver_settingsInputCreate = t.Composite(
  [
    sk_approver_settingsPlainInputCreate,
    sk_approver_settingsRelationsInputCreate,
  ],
  { additionalProperties: false },
);

export const sk_approver_settingsInputUpdate = t.Composite(
  [
    sk_approver_settingsPlainInputUpdate,
    sk_approver_settingsRelationsInputUpdate,
  ],
  { additionalProperties: false },
);
