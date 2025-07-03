/*
  Warnings:

  - You are about to drop the `permission_groups` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `permissions` DROP FOREIGN KEY `permissions_permission_group_id_fkey`;

-- DropTable
DROP TABLE `permission_groups`;
