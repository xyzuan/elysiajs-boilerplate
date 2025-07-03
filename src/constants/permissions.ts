type Permissions = keyof typeof PERMISSIONS;

const PERMISSIONS = {
  VIEW_SK: "VIEW_SK",
  REQUEST_SK: "REQUEST_SK",
  APPROVE_SK: "APPROVE_SK",
} as const;

export { PERMISSIONS as default, Permissions };
