import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const sk_kelahiranPlain = t.Object(
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
    father_name: t.String(),
    mother_name: t.String(),
    createdAt: t.Date(),
    updatedAt: __nullable__(t.Date()),
    user_sk_id: __nullable__(t.String()),
  },
  { additionalProperties: false },
);

export const sk_kelahiranRelations = t.Object(
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

export const sk_kelahiranPlainInputCreate = t.Object(
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
    father_name: t.String(),
    mother_name: t.String(),
  },
  { additionalProperties: false },
);

export const sk_kelahiranPlainInputUpdate = t.Object(
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
    father_name: t.Optional(t.String()),
    mother_name: t.Optional(t.String()),
  },
  { additionalProperties: false },
);

export const sk_kelahiranRelationsInputCreate = t.Object(
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

export const sk_kelahiranRelationsInputUpdate = t.Partial(
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

export const sk_kelahiranWhere = t.Partial(
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
          father_name: t.String(),
          mother_name: t.String(),
          createdAt: t.Date(),
          updatedAt: t.Date(),
          user_sk_id: t.String(),
        },
        { additionalProperties: false },
      ),
    { $id: "sk_kelahiran" },
  ),
);

export const sk_kelahiranWhereUnique = t.Recursive(
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
              father_name: t.String(),
              mother_name: t.String(),
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
  { $id: "sk_kelahiran" },
);

export const sk_kelahiranSelect = t.Partial(
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
      father_name: t.Boolean(),
      mother_name: t.Boolean(),
      createdAt: t.Boolean(),
      updatedAt: t.Boolean(),
      user_sk_id: t.Boolean(),
      user_sk: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const sk_kelahiranInclude = t.Partial(
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

export const sk_kelahiranOrderBy = t.Partial(
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
      father_name: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      mother_name: t.Union([t.Literal("asc"), t.Literal("desc")], {
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

export const sk_kelahiran = t.Composite(
  [sk_kelahiranPlain, sk_kelahiranRelations],
  { additionalProperties: false },
);

export const sk_kelahiranInputCreate = t.Composite(
  [sk_kelahiranPlainInputCreate, sk_kelahiranRelationsInputCreate],
  { additionalProperties: false },
);

export const sk_kelahiranInputUpdate = t.Composite(
  [sk_kelahiranPlainInputUpdate, sk_kelahiranRelationsInputUpdate],
  { additionalProperties: false },
);
