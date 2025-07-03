/*
  Warnings:

  - You are about to drop the column `permission_group_id` on the `permissions` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `permissions_permission_group_id_fkey` ON `permissions`;

-- AlterTable
ALTER TABLE `permissions` DROP COLUMN `permission_group_id`;
