import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const user_skPlain = t.Object(
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
);

export const user_skRelations = t.Object(
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
    sk_kematian: __nullable__(
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
          updatedAt: __nullable__(t.Date()),
          user_sk_id: __nullable__(t.String()),
        },
        { additionalProperties: false },
      ),
    ),
    sk_tidak_mampu: __nullable__(
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
          updatedAt: __nullable__(t.Date()),
          user_sk_id: __nullable__(t.String()),
        },
        { additionalProperties: false },
      ),
    ),
    user_approvers: t.Array(
      t.Object(
        {
          id: t.String(),
          user_sk_id: t.String(),
          user_approver_id: t.String(),
          status: t.Union(
            [
              t.Literal("VERIFY"),
              t.Literal("APPROVED"),
              t.Literal("REVISED"),
              t.Literal("REJECTED"),
            ],
            { additionalProperties: false },
          ),
          createdAt: t.Date(),
          updatedAt: __nullable__(t.Date()),
        },
        { additionalProperties: false },
      ),
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);

export const user_skPlainInputCreate = t.Object(
  {
    sk_type: t.Union([t.Literal("KEMATIAN"), t.Literal("TIDAK_MAMPU")], {
      additionalProperties: false,
    }),
  },
  { additionalProperties: false },
);

export const user_skPlainInputUpdate = t.Object(
  {
    sk_type: t.Optional(
      t.Union([t.Literal("KEMATIAN"), t.Literal("TIDAK_MAMPU")], {
        additionalProperties: false,
      }),
    ),
  },
  { additionalProperties: false },
);

export const user_skRelationsInputCreate = t.Object(
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
    sk_kematian: t.Optional(
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
    sk_tidak_mampu: t.Optional(
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
    user_approvers: t.Optional(
      t.Object(
        {
          connect: t.Array(
            t.Object(
              {
                id: t.String({ additionalProperties: false }),
              },
              { additionalProperties: false },
            ),
            { additionalProperties: false },
          ),
        },
        { additionalProperties: false },
      ),
    ),
  },
  { additionalProperties: false },
);

export const user_skRelationsInputUpdate = t.Partial(
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
      sk_kematian: t.Partial(
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
      sk_tidak_mampu: t.Partial(
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
      user_approvers: t.Partial(
        t.Object(
          {
            connect: t.Array(
              t.Object(
                {
                  id: t.String({ additionalProperties: false }),
                },
                { additionalProperties: false },
              ),
              { additionalProperties: false },
            ),
            disconnect: t.Array(
              t.Object(
                {
                  id: t.String({ additionalProperties: false }),
                },
                { additionalProperties: false },
              ),
              { additionalProperties: false },
            ),
          },
          { additionalProperties: false },
        ),
      ),
    },
    { additionalProperties: false },
  ),
);

export const user_skWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
          id: t.String(),
          user_id: t.String(),
          sk_type: t.Union([t.Literal("KEMATIAN"), t.Literal("TIDAK_MAMPU")], {
            additionalProperties: false,
          }),
          createdAt: t.Date(),
          updatedAt: t.Date(),
        },
        { additionalProperties: false },
      ),
    { $id: "user_sk" },
  ),
);

export const user_skWhereUnique = t.Recursive(
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
              sk_type: t.Union(
                [t.Literal("KEMATIAN"), t.Literal("TIDAK_MAMPU")],
                { additionalProperties: false },
              ),
              createdAt: t.Date(),
              updatedAt: t.Date(),
            },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "user_sk" },
);

export const user_skSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      user_id: t.Boolean(),
      sk_type: t.Boolean(),
      createdAt: t.Boolean(),
      updatedAt: t.Boolean(),
      user: t.Boolean(),
      sk_kematian: t.Boolean(),
      sk_tidak_mampu: t.Boolean(),
      user_approvers: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const user_skInclude = t.Partial(
  t.Object(
    {
      sk_type: t.Boolean(),
      user: t.Boolean(),
      sk_kematian: t.Boolean(),
      sk_tidak_mampu: t.Boolean(),
      user_approvers: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const user_skOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      user_id: t.Union([t.Literal("asc"), t.Literal("desc")], {
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

export const user_sk = t.Composite([user_skPlain, user_skRelations], {
  additionalProperties: false,
});

export const user_skInputCreate = t.Composite(
  [user_skPlainInputCreate, user_skRelationsInputCreate],
  { additionalProperties: false },
);

export const user_skInputUpdate = t.Composite(
  [user_skPlainInputUpdate, user_skRelationsInputUpdate],
  { additionalProperties: false },
);
