import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const sk_kematianPlain = t.Object(
  {
    id: t.String(),
    name: t.String(),
    born_birth: t.Date(),
    born_place: t.String(),
    nik: t.String(),
    gender: t.Union([t.Literal("MALE"), t.Literal("FEMALE")], {
      additionalProperties: false,
    }),
    religion: t.String(),
    address: t.String(),
    death_date: t.Date(),
    death_place: t.String(),
    death_reason: t.String(),
    createdAt: t.Date(),
    updatedAt: __nullable__(t.Date()),
    user_sk_id: __nullable__(t.String()),
  },
  { additionalProperties: false },
);

export const sk_kematianRelations = t.Object(
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

export const sk_kematianPlainInputCreate = t.Object(
  {
    name: t.String(),
    born_birth: t.Date(),
    born_place: t.String(),
    nik: t.String(),
    gender: t.Union([t.Literal("MALE"), t.Literal("FEMALE")], {
      additionalProperties: false,
    }),
    religion: t.String(),
    address: t.String(),
    death_date: t.Date(),
    death_place: t.String(),
    death_reason: t.String(),
  },
  { additionalProperties: false },
);

export const sk_kematianPlainInputUpdate = t.Object(
  {
    name: t.Optional(t.String()),
    born_birth: t.Optional(t.Date()),
    born_place: t.Optional(t.String()),
    nik: t.Optional(t.String()),
    gender: t.Optional(
      t.Union([t.Literal("MALE"), t.Literal("FEMALE")], {
        additionalProperties: false,
      }),
    ),
    religion: t.Optional(t.String()),
    address: t.Optional(t.String()),
    death_date: t.Optional(t.Date()),
    death_place: t.Optional(t.String()),
    death_reason: t.Optional(t.String()),
  },
  { additionalProperties: false },
);

export const sk_kematianRelationsInputCreate = t.Object(
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

export const sk_kematianRelationsInputUpdate = t.Partial(
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

export const sk_kematianWhere = t.Partial(
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
          nik: t.String(),
          gender: t.Union([t.Literal("MALE"), t.Literal("FEMALE")], {
            additionalProperties: false,
          }),
          religion: t.String(),
          address: t.String(),
          death_date: t.Date(),
          death_place: t.String(),
          death_reason: t.String(),
          createdAt: t.Date(),
          updatedAt: t.Date(),
          user_sk_id: t.String(),
        },
        { additionalProperties: false },
      ),
    { $id: "sk_kematian" },
  ),
);

export const sk_kematianWhereUnique = t.Recursive(
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
              nik: t.String(),
              gender: t.Union([t.Literal("MALE"), t.Literal("FEMALE")], {
                additionalProperties: false,
              }),
              religion: t.String(),
              address: t.String(),
              death_date: t.Date(),
              death_place: t.String(),
              death_reason: t.String(),
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
  { $id: "sk_kematian" },
);

export const sk_kematianSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      name: t.Boolean(),
      born_birth: t.Boolean(),
      born_place: t.Boolean(),
      nik: t.Boolean(),
      gender: t.Boolean(),
      religion: t.Boolean(),
      address: t.Boolean(),
      death_date: t.Boolean(),
      death_place: t.Boolean(),
      death_reason: t.Boolean(),
      createdAt: t.Boolean(),
      updatedAt: t.Boolean(),
      user_sk_id: t.Boolean(),
      user_sk: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const sk_kematianInclude = t.Partial(
  t.Object(
    { gender: t.Boolean(), user_sk: t.Boolean(), _count: t.Boolean() },
    { additionalProperties: false },
  ),
);

export const sk_kematianOrderBy = t.Partial(
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
      death_date: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      death_place: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      death_reason: t.Union([t.Literal("asc"), t.Literal("desc")], {
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

export const sk_kematian = t.Composite(
  [sk_kematianPlain, sk_kematianRelations],
  { additionalProperties: false },
);

export const sk_kematianInputCreate = t.Composite(
  [sk_kematianPlainInputCreate, sk_kematianRelationsInputCreate],
  { additionalProperties: false },
);

export const sk_kematianInputUpdate = t.Composite(
  [sk_kematianPlainInputUpdate, sk_kematianRelationsInputUpdate],
  { additionalProperties: false },
);
