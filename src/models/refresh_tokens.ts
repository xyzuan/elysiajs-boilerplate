import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const refresh_tokensPlain = t.Object(
  {
    id: t.String(),
    user_id: t.String(),
    token: t.String(),
    isRevoked: t.Boolean(),
    expiredAt: t.Date(),
    createdAt: t.Date(),
  },
  { additionalProperties: false },
);

export const refresh_tokensRelations = t.Object(
  {
    user: t.Object(
      {
        id: t.String(),
        name: t.String(),
        email: t.String(),
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

export const refresh_tokensPlainInputCreate = t.Object(
  {
    token: t.String(),
    isRevoked: t.Optional(t.Boolean()),
    expiredAt: t.Date(),
  },
  { additionalProperties: false },
);

export const refresh_tokensPlainInputUpdate = t.Object(
  {
    token: t.Optional(t.String()),
    isRevoked: t.Optional(t.Boolean()),
    expiredAt: t.Optional(t.Date()),
  },
  { additionalProperties: false },
);

export const refresh_tokensRelationsInputCreate = t.Object(
  {
    user: t.Object(
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

export const refresh_tokensRelationsInputUpdate = t.Partial(
  t.Object(
    {
      user: t.Object(
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

export const refresh_tokensWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
          id: t.String(),
          user_id: t.String(),
          token: t.String(),
          isRevoked: t.Boolean(),
          expiredAt: t.Date(),
          createdAt: t.Date(),
        },
        { additionalProperties: false },
      ),
    { $id: "refresh_tokens" },
  ),
);

export const refresh_tokensWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect(
      [
        t.Partial(
          t.Object({ id: t.String() }, { additionalProperties: false }),
          { additionalProperties: false },
        ),
        t.Union([t.Object({ id: t.String() })], {
          additionalProperties: false,
        }),
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
              user_id: t.String(),
              token: t.String(),
              isRevoked: t.Boolean(),
              expiredAt: t.Date(),
              createdAt: t.Date(),
            },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "refresh_tokens" },
);

export const refresh_tokensSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      user_id: t.Boolean(),
      token: t.Boolean(),
      isRevoked: t.Boolean(),
      expiredAt: t.Boolean(),
      createdAt: t.Boolean(),
      user: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const refresh_tokensInclude = t.Partial(
  t.Object(
    { user: t.Boolean(), _count: t.Boolean() },
    { additionalProperties: false },
  ),
);

export const refresh_tokensOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      user_id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      token: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      isRevoked: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      expiredAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      createdAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
    },
    { additionalProperties: false },
  ),
);

export const refresh_tokens = t.Composite(
  [refresh_tokensPlain, refresh_tokensRelations],
  { additionalProperties: false },
);

export const refresh_tokensInputCreate = t.Composite(
  [refresh_tokensPlainInputCreate, refresh_tokensRelationsInputCreate],
  { additionalProperties: false },
);

export const refresh_tokensInputUpdate = t.Composite(
  [refresh_tokensPlainInputUpdate, refresh_tokensRelationsInputUpdate],
  { additionalProperties: false },
);
