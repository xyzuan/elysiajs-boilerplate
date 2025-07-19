import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const role_has_permissionsPlain = t.Object(
  {
    id: t.String(),
    role_id: t.String(),
    permission_id: t.String(),
    created_at: t.Date(),
    updated_at: __nullable__(t.Date()),
    deleted_at: __nullable__(t.Date()),
  },
  { additionalProperties: false },
);

export const role_has_permissionsRelations = t.Object(
  {
    role: t.Object(
      {
        id: t.String(),
        name: t.String(),
        created_at: t.Date(),
        updated_at: __nullable__(t.Date()),
        deleted_at: __nullable__(t.Date()),
      },
      { additionalProperties: false },
    ),
    permission: t.Object(
      {
        id: t.String(),
        name: t.String(),
        created_at: t.Date(),
        updated_at: __nullable__(t.Date()),
        deleted_at: __nullable__(t.Date()),
      },
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);

export const role_has_permissionsPlainInputCreate = t.Object(
  {
    created_at: t.Optional(t.Date()),
    deleted_at: t.Optional(__nullable__(t.Date())),
  },
  { additionalProperties: false },
);

export const role_has_permissionsPlainInputUpdate = t.Object(
  {
    created_at: t.Optional(t.Date()),
    deleted_at: t.Optional(__nullable__(t.Date())),
  },
  { additionalProperties: false },
);

export const role_has_permissionsRelationsInputCreate = t.Object(
  {
    role: t.Object(
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
    permission: t.Object(
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

export const role_has_permissionsRelationsInputUpdate = t.Partial(
  t.Object(
    {
      role: t.Object(
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
      permission: t.Object(
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

export const role_has_permissionsWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
          id: t.String(),
          role_id: t.String(),
          permission_id: t.String(),
          created_at: t.Date(),
          updated_at: t.Date(),
          deleted_at: t.Date(),
        },
        { additionalProperties: false },
      ),
    { $id: "role_has_permissions" },
  ),
);

export const role_has_permissionsWhereUnique = t.Recursive(
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
              role_id: t.String(),
              permission_id: t.String(),
              created_at: t.Date(),
              updated_at: t.Date(),
              deleted_at: t.Date(),
            },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "role_has_permissions" },
);

export const role_has_permissionsSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      role_id: t.Boolean(),
      permission_id: t.Boolean(),
      created_at: t.Boolean(),
      updated_at: t.Boolean(),
      deleted_at: t.Boolean(),
      role: t.Boolean(),
      permission: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const role_has_permissionsInclude = t.Partial(
  t.Object(
    { role: t.Boolean(), permission: t.Boolean(), _count: t.Boolean() },
    { additionalProperties: false },
  ),
);

export const role_has_permissionsOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      role_id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      permission_id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      created_at: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      updated_at: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      deleted_at: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
    },
    { additionalProperties: false },
  ),
);

export const role_has_permissions = t.Composite(
  [role_has_permissionsPlain, role_has_permissionsRelations],
  { additionalProperties: false },
);

export const role_has_permissionsInputCreate = t.Composite(
  [
    role_has_permissionsPlainInputCreate,
    role_has_permissionsRelationsInputCreate,
  ],
  { additionalProperties: false },
);

export const role_has_permissionsInputUpdate = t.Composite(
  [
    role_has_permissionsPlainInputUpdate,
    role_has_permissionsRelationsInputUpdate,
  ],
  { additionalProperties: false },
);
