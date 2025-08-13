import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const userPlain = t.Object(
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
);

export const userRelations = t.Object(
  {
    user_sks: t.Array(
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
      { additionalProperties: false },
    ),
    refresh_tokens: t.Array(
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
      { additionalProperties: false },
    ),
    user_roles: t.Array(
      t.Object(
        {
          id: t.String(),
          user_id: t.String(),
          role_id: t.String(),
          created_at: t.Date(),
          updated_at: __nullable__(t.Date()),
        },
        { additionalProperties: false },
      ),
      { additionalProperties: false },
    ),
    user_permissions: t.Array(
      t.Object(
        {
          id: t.String(),
          user_id: t.String(),
          permission_id: t.String(),
          created_at: t.Date(),
          updated_at: __nullable__(t.Date()),
          deleted_at: __nullable__(t.Date()),
        },
        { additionalProperties: false },
      ),
      { additionalProperties: false },
    ),
    user_sk_has_approver: t.Array(
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
    sk_approver_settings: t.Array(
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
          updatedAt: __nullable__(t.Date()),
        },
        { additionalProperties: false },
      ),
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);

export const userPlainInputCreate = t.Object(
  {
    name: t.String(),
    email: t.String(),
    phone_number: t.Optional(__nullable__(t.String())),
    password: t.String(),
    born_birth: t.Optional(__nullable__(t.Date())),
    born_place: t.Optional(__nullable__(t.String())),
    gender: t.Optional(
      __nullable__(
        t.Union([t.Literal("MALE"), t.Literal("FEMALE")], {
          additionalProperties: false,
        }),
      ),
    ),
    work: t.Optional(__nullable__(t.String())),
    marital_status: t.Optional(
      __nullable__(
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
    ),
    nik: t.Optional(__nullable__(t.String())),
    religion: t.Optional(__nullable__(t.String())),
    address: t.Optional(__nullable__(t.String())),
  },
  { additionalProperties: false },
);

export const userPlainInputUpdate = t.Object(
  {
    name: t.Optional(t.String()),
    email: t.Optional(t.String()),
    phone_number: t.Optional(__nullable__(t.String())),
    password: t.Optional(t.String()),
    born_birth: t.Optional(__nullable__(t.Date())),
    born_place: t.Optional(__nullable__(t.String())),
    gender: t.Optional(
      __nullable__(
        t.Union([t.Literal("MALE"), t.Literal("FEMALE")], {
          additionalProperties: false,
        }),
      ),
    ),
    work: t.Optional(__nullable__(t.String())),
    marital_status: t.Optional(
      __nullable__(
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
    ),
    nik: t.Optional(__nullable__(t.String())),
    religion: t.Optional(__nullable__(t.String())),
    address: t.Optional(__nullable__(t.String())),
  },
  { additionalProperties: false },
);

export const userRelationsInputCreate = t.Object(
  {
    user_sks: t.Optional(
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
    refresh_tokens: t.Optional(
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
    user_roles: t.Optional(
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
    user_permissions: t.Optional(
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
    user_sk_has_approver: t.Optional(
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
    sk_approver_settings: t.Optional(
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

export const userRelationsInputUpdate = t.Partial(
  t.Object(
    {
      user_sks: t.Partial(
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
      refresh_tokens: t.Partial(
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
      user_roles: t.Partial(
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
      user_permissions: t.Partial(
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
      user_sk_has_approver: t.Partial(
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
      sk_approver_settings: t.Partial(
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

export const userWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
          id: t.String(),
          name: t.String(),
          email: t.String(),
          phone_number: t.String(),
          password: t.String(),
          born_birth: t.Date(),
          born_place: t.String(),
          gender: t.Union([t.Literal("MALE"), t.Literal("FEMALE")], {
            additionalProperties: false,
          }),
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
          nik: t.String(),
          religion: t.String(),
          address: t.String(),
          createdAt: t.Date(),
          updatedAt: t.Date(),
        },
        { additionalProperties: false },
      ),
    { $id: "user" },
  ),
);

export const userWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect(
      [
        t.Partial(
          t.Object(
            { id: t.String(), email: t.String(), nik: t.String() },
            { additionalProperties: false },
          ),
          { additionalProperties: false },
        ),
        t.Union(
          [
            t.Object({ id: t.String() }),
            t.Object({ email: t.String() }),
            t.Object({ nik: t.String() }),
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
              name: t.String(),
              email: t.String(),
              phone_number: t.String(),
              password: t.String(),
              born_birth: t.Date(),
              born_place: t.String(),
              gender: t.Union([t.Literal("MALE"), t.Literal("FEMALE")], {
                additionalProperties: false,
              }),
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
              nik: t.String(),
              religion: t.String(),
              address: t.String(),
              createdAt: t.Date(),
              updatedAt: t.Date(),
            },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "user" },
);

export const userSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      name: t.Boolean(),
      email: t.Boolean(),
      phone_number: t.Boolean(),
      password: t.Boolean(),
      born_birth: t.Boolean(),
      born_place: t.Boolean(),
      gender: t.Boolean(),
      work: t.Boolean(),
      marital_status: t.Boolean(),
      nik: t.Boolean(),
      religion: t.Boolean(),
      address: t.Boolean(),
      createdAt: t.Boolean(),
      updatedAt: t.Boolean(),
      user_sks: t.Boolean(),
      refresh_tokens: t.Boolean(),
      user_roles: t.Boolean(),
      user_permissions: t.Boolean(),
      user_sk_has_approver: t.Boolean(),
      sk_approver_settings: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const userInclude = t.Partial(
  t.Object(
    {
      gender: t.Boolean(),
      marital_status: t.Boolean(),
      user_sks: t.Boolean(),
      refresh_tokens: t.Boolean(),
      user_roles: t.Boolean(),
      user_permissions: t.Boolean(),
      user_sk_has_approver: t.Boolean(),
      sk_approver_settings: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const userOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      name: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      email: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      phone_number: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      password: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      born_birth: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      born_place: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      work: t.Union([t.Literal("asc"), t.Literal("desc")], {
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

export const user = t.Composite([userPlain, userRelations], {
  additionalProperties: false,
});

export const userInputCreate = t.Composite(
  [userPlainInputCreate, userRelationsInputCreate],
  { additionalProperties: false },
);

export const userInputUpdate = t.Composite(
  [userPlainInputUpdate, userRelationsInputUpdate],
  { additionalProperties: false },
);
