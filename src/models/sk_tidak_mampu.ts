import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const sk_tidak_mampuPlain = t.Object(
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
    reason: t.String(),
    work: t.String(),
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
    createdAt: t.Date(),
    updatedAt: __nullable__(t.Date()),
    user_sk_id: __nullable__(t.String()),
  },
  { additionalProperties: false },
);

export const sk_tidak_mampuRelations = t.Object(
  {
    user_sk: __nullable__(
      t.Object(
        {
          id: t.String(),
          user_id: t.String(),
          sk_type: t.Union([t.Literal("KEMATIAN"), t.Literal("TIDAK_MAMPU")], {
            additionalProperties: false,
          }),
          createdAt: t.Date(),
          updatedAt: __nullable__(t.Date()),
        },
        { additionalProperties: false },
      ),
    ),
  },
  { additionalProperties: false },
);

export const sk_tidak_mampuPlainInputCreate = t.Object(
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
    reason: t.String(),
    work: t.String(),
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
  },
  { additionalProperties: false },
);

export const sk_tidak_mampuPlainInputUpdate = t.Object(
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
    reason: t.Optional(t.String()),
    work: t.Optional(t.String()),
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
  },
  { additionalProperties: false },
);

export const sk_tidak_mampuRelationsInputCreate = t.Object(
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

export const sk_tidak_mampuRelationsInputUpdate = t.Partial(
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

export const sk_tidak_mampuWhere = t.Partial(
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
          reason: t.String(),
          work: t.String(),
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
          createdAt: t.Date(),
          updatedAt: t.Date(),
          user_sk_id: t.String(),
        },
        { additionalProperties: false },
      ),
    { $id: "sk_tidak_mampu" },
  ),
);

export const sk_tidak_mampuWhereUnique = t.Recursive(
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
              reason: t.String(),
              work: t.String(),
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
  { $id: "sk_tidak_mampu" },
);

export const sk_tidak_mampuSelect = t.Partial(
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
      reason: t.Boolean(),
      work: t.Boolean(),
      marital_status: t.Boolean(),
      createdAt: t.Boolean(),
      updatedAt: t.Boolean(),
      user_sk_id: t.Boolean(),
      user_sk: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const sk_tidak_mampuInclude = t.Partial(
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

export const sk_tidak_mampuOrderBy = t.Partial(
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
      reason: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      work: t.Union([t.Literal("asc"), t.Literal("desc")], {
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

export const sk_tidak_mampu = t.Composite(
  [sk_tidak_mampuPlain, sk_tidak_mampuRelations],
  { additionalProperties: false },
);

export const sk_tidak_mampuInputCreate = t.Composite(
  [sk_tidak_mampuPlainInputCreate, sk_tidak_mampuRelationsInputCreate],
  { additionalProperties: false },
);

export const sk_tidak_mampuInputUpdate = t.Composite(
  [sk_tidak_mampuPlainInputUpdate, sk_tidak_mampuRelationsInputUpdate],
  { additionalProperties: false },
);
