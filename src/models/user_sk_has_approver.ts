import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const user_sk_has_approverPlain = t.Object(
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
);

export const user_sk_has_approverRelations = t.Object(
  {
    user_sk: t.Object(
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

export const user_sk_has_approverPlainInputCreate = t.Object(
  {
    status: t.Union(
      [
        t.Literal("VERIFY"),
        t.Literal("APPROVED"),
        t.Literal("REVISED"),
        t.Literal("REJECTED"),
      ],
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);

export const user_sk_has_approverPlainInputUpdate = t.Object(
  {
    status: t.Optional(
      t.Union(
        [
          t.Literal("VERIFY"),
          t.Literal("APPROVED"),
          t.Literal("REVISED"),
          t.Literal("REJECTED"),
        ],
        { additionalProperties: false },
      ),
    ),
  },
  { additionalProperties: false },
);

export const user_sk_has_approverRelationsInputCreate = t.Object(
  {
    user_sk: t.Object(
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

export const user_sk_has_approverRelationsInputUpdate = t.Partial(
  t.Object(
    {
      user_sk: t.Object(
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

export const user_sk_has_approverWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
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
          updatedAt: t.Date(),
        },
        { additionalProperties: false },
      ),
    { $id: "user_sk_has_approver" },
  ),
);

export const user_sk_has_approverWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect(
      [
        t.Partial(
          t.Object(
            {
              id: t.String(),
              user_sk_id_user_approver_id: t.Object(
                { user_sk_id: t.String(), user_approver_id: t.String() },
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
              user_sk_id_user_approver_id: t.Object(
                { user_sk_id: t.String(), user_approver_id: t.String() },
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
              updatedAt: t.Date(),
            },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "user_sk_has_approver" },
);

export const user_sk_has_approverSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      user_sk_id: t.Boolean(),
      user_approver_id: t.Boolean(),
      status: t.Boolean(),
      createdAt: t.Boolean(),
      updatedAt: t.Boolean(),
      user_sk: t.Boolean(),
      approver: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const user_sk_has_approverInclude = t.Partial(
  t.Object(
    {
      status: t.Boolean(),
      user_sk: t.Boolean(),
      approver: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const user_sk_has_approverOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      user_sk_id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      user_approver_id: t.Union([t.Literal("asc"), t.Literal("desc")], {
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

export const user_sk_has_approver = t.Composite(
  [user_sk_has_approverPlain, user_sk_has_approverRelations],
  { additionalProperties: false },
);

export const user_sk_has_approverInputCreate = t.Composite(
  [
    user_sk_has_approverPlainInputCreate,
    user_sk_has_approverRelationsInputCreate,
  ],
  { additionalProperties: false },
);

export const user_sk_has_approverInputUpdate = t.Composite(
  [
    user_sk_has_approverPlainInputUpdate,
    user_sk_has_approverRelationsInputUpdate,
  ],
  { additionalProperties: false },
);
