# Database Seeders

This directory contains database seeders for populating the database with initial data.

## Available Seeders

### 1. Role and Permission Seeder (`role_permission.seed.ts`)

Creates initial roles and permissions for the RBAC system:

- **Roles**: Kepala Desa, Warga Desa, Staff Desa
- **Permissions**: VIEW_SK, REQUEST_SK, APPROVE_SK
- **Role-Permission Assignments**: Maps appropriate permissions to each role

### 2. User Seeder (`user.seed.ts`)

Creates sample users with different roles:

- **Kepala Desa**: `kepaladesa@desaku.com` (password: `password123`)
- **Staff Desa**: `staffdesa@desaku.com` (password: `password123`)
- **Warga Desa 1**: `warga1@desaku.com` (password: `password123`)
- **Warga Desa 2**: `warga2@desaku.com` (password: `password123`)
- **Warga Desa 3**: `warga3@desaku.com` (password: `password123`)

Each user includes complete profile information (NIK, address, birth details, etc.) and is automatically assigned the appropriate role.

### 3. Comprehensive Seeder (`seed-all.ts`)

Runs both role-permission and user seeders in the correct order.

## Usage

### Run Individual Seeders

```bash
# Seed roles and permissions only
bun run seed-role-permission

# Seed users only (requires roles to exist first)
bun run seed-user

# Run all seeders in the correct order
bun run seed-all
```

### Manual Execution

```bash
# Run role-permission seeder directly
bun prisma/seeders/role_permission.seed.ts

# Run user seeder directly
bun prisma/seeders/user.seed.ts

# Run comprehensive seeder directly
bun prisma/seeders/seed-all.ts
```

## Prerequisites

Before running the seeders, ensure:

1. Database is set up and migrations are applied
2. Environment variables are configured (DATABASE_URL)
3. Prisma client is generated (`bun prisma generate`)

## Notes

- All seeders use `upsert` operations to avoid duplicate entries
- Passwords are hashed using Bun's built-in password hashing (bcrypt algorithm, cost: 10)
- User seeder automatically assigns roles based on email patterns
- The comprehensive seeder runs seeders in the correct dependency order

## Sample User Credentials

| Role         | Email                 | Password    |
| ------------ | --------------------- | ----------- |
| Kepala Desa  | kepaladesa@desaku.com | password123 |
| Staff Desa   | staffdesa@desaku.com  | password123 |
| Warga Desa 1 | warga1@desaku.com     | password123 |
| Warga Desa 2 | warga2@desaku.com     | password123 |
| Warga Desa 3 | warga3@desaku.com     | password123 |
