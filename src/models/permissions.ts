import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const permissionsPlain = t.Object(
  {
    id: t.String(),
    name: t.String(),
    created_at: t.Date(),
    updated_at: __nullable__(t.Date()),
    deleted_at: __nullable__(t.Date()),
  },
  { additionalProperties: false },
);

export const permissionsRelations = t.Object(
  {
    role_permissions: t.Array(
      t.Object(
        {
          id: t.String(),
          role_id: t.String(),
          permission_id: t.String(),
          created_at: t.Date(),
          updated_at: __nullable__(t.Date()),
          deleted_at: __nullable__(t.Date()),
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
  },
  { additionalProperties: false },
);

export const permissionsPlainInputCreate = t.Object(
  {
    name: t.String(),
    created_at: t.Optional(t.Date()),
    deleted_at: t.Optional(__nullable__(t.Date())),
  },
  { additionalProperties: false },
);

export const permissionsPlainInputUpdate = t.Object(
  {
    name: t.Optional(t.String()),
    created_at: t.Optional(t.Date()),
    deleted_at: t.Optional(__nullable__(t.Date())),
  },
  { additionalProperties: false },
);

export const permissionsRelationsInputCreate = t.Object(
  {
    role_permissions: t.Optional(
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
  },
  { additionalProperties: false },
);

export const permissionsRelationsInputUpdate = t.Partial(
  t.Object(
    {
      role_permissions: t.Partial(
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
    },
    { additionalProperties: false },
  ),
);

export const permissionsWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
          id: t.String(),
          name: t.String(),
          created_at: t.Date(),
          updated_at: t.Date(),
          deleted_at: t.Date(),
        },
        { additionalProperties: false },
      ),
    { $id: "permissions" },
  ),
);

export const permissionsWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect(
      [
        t.Partial(
          t.Object(
            { id: t.String(), name: t.String() },
            { additionalProperties: false },
          ),
          { additionalProperties: false },
        ),
        t.Union(
          [t.Object({ id: t.String() }), t.Object({ name: t.String() })],
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
  { $id: "permissions" },
);

export const permissionsSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      name: t.Boolean(),
      created_at: t.Boolean(),
      updated_at: t.Boolean(),
      deleted_at: t.Boolean(),
      role_permissions: t.Boolean(),
      user_permissions: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const permissionsInclude = t.Partial(
  t.Object(
    {
      role_permissions: t.Boolean(),
      user_permissions: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const permissionsOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      name: t.Union([t.Literal("asc"), t.Literal("desc")], {
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

export const permissions = t.Composite(
  [permissionsPlain, permissionsRelations],
  { additionalProperties: false },
);

export const permissionsInputCreate = t.Composite(
  [permissionsPlainInputCreate, permissionsRelationsInputCreate],
  { additionalProperties: false },
);

export const permissionsInputUpdate = t.Composite(
  [permissionsPlainInputUpdate, permissionsRelationsInputUpdate],
  { additionalProperties: false },
);
