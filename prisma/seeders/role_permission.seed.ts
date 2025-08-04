import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function seedRolesAndPermissions() {
  const roles = [
    { name: "Kepala Desa" },
    { name: "Warga Desa" },
    { name: "Staff Desa" },
  ];

  const permissions = [
    { name: "VIEW_SK" },
    { name: "REQUEST_SK" },
    { name: "APPROVE_SK" },
    { name: "MANAGE_USERS" },
    { name: "MANAGE_SK_APPROVERS" },
    { name: "USER_DASHBOARD" },
    { name: "ADMIN_DASHBOARD" },
    { name: "MANAGE_ROLES_PERMISSIONS" },
  ];

  for (const role of roles) {
    await prisma.roles.upsert({
      where: { name: role.name },
      update: {},
      create: role,
    });
  }

  for (const permission of permissions) {
    await prisma.permissions.upsert({
      where: { name: permission.name },
      update: {},
      create: permission,
    });
  }
}

async function createRoleHasPermissionEntries() {
  const roles = await prisma.roles.findMany();
  const permissions = await prisma.permissions.findMany();
  const wargaDesaRole = roles.find((role) => role.name === "Warga Desa");
  const kepalaDesaRole = roles.find((role) => role.name === "Kepala Desa");
  const staffDesaRole = roles.find((role) => role.name === "Staff Desa");

  const viewUserDashboardPermission = permissions.find(
    (permission) => permission.name === "USER_DASHBOARD"
  );
  const adminDashboardPermission = permissions.find(
    (permission) => permission.name === "ADMIN_DASHBOARD"
  );
  const manageUsersPermission = permissions.find(
    (permission) => permission.name === "MANAGE_USERS"
  );
  const manageRolesPermissionsPermission = permissions.find(
    (permission) => permission.name === "MANAGE_ROLES_PERMISSIONS"
  );
  const manageSkApproversPermission = permissions.find(
    (permission) => permission.name === "MANAGE_SK_APPROVERS"
  );
  const viewSkPermission = permissions.find(
    (permission) => permission.name === "VIEW_SK"
  );
  const requestSkPermission = permissions.find(
    (permission) => permission.name === "REQUEST_SK"
  );
  const approveSkPermission = permissions.find(
    (permission) => permission.name === "APPROVE_SK"
  );

  if (kepalaDesaRole && viewSkPermission && approveSkPermission) {
    await prisma.role_has_permissions.create({
      data: {
        role_id: kepalaDesaRole.id,
        permission_id: viewSkPermission.id,
      },
    });
    await prisma.role_has_permissions.create({
      data: {
        role_id: kepalaDesaRole.id,
        permission_id: approveSkPermission.id,
      },
    });
  }

  if (staffDesaRole && viewSkPermission && requestSkPermission) {
    await prisma.role_has_permissions.create({
      data: {
        role_id: staffDesaRole.id,
        permission_id: viewSkPermission.id,
      },
    });
    await prisma.role_has_permissions.create({
      data: {
        role_id: staffDesaRole.id,
        permission_id: requestSkPermission.id,
      },
    });
  }

  if (
    wargaDesaRole &&
    viewSkPermission &&
    requestSkPermission &&
    viewUserDashboardPermission
  ) {
    await prisma.role_has_permissions.create({
      data: {
        role_id: wargaDesaRole.id,
        permission_id: viewSkPermission.id,
      },
    });
    await prisma.role_has_permissions.create({
      data: {
        role_id: wargaDesaRole.id,
        permission_id: requestSkPermission.id,
      },
    });
    await prisma.role_has_permissions.create({
      data: {
        role_id: wargaDesaRole.id,
        permission_id: viewUserDashboardPermission.id,
      },
    });
  }
}

async function main() {
  await seedRolesAndPermissions();
  await createRoleHasPermissionEntries();
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
