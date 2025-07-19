type Permissions = keyof typeof PERMISSIONS;

const PERMISSIONS = {
  USER_DASHBOARD: "USER_DASHBOARD",
  ADMIN_DASHBOARD: "ADMIN_DASHBOARD",
  VIEW_SK: "VIEW_SK",
  REQUEST_SK: "REQUEST_SK",
  APPROVE_SK: "APPROVE_SK",
} as const;

export { PERMISSIONS as default, Permissions };
