-- DropForeignKey
ALTER TABLE `role_has_permissions` DROP FOREIGN KEY `role_has_permissions_permission_id_fkey`;

-- DropForeignKey
ALTER TABLE `role_has_permissions` DROP FOREIGN KEY `role_has_permissions_role_id_fkey`;

-- DropForeignKey
ALTER TABLE `user_has_permissions` DROP FOREIGN KEY `user_has_permissions_permission_id_fkey`;

-- DropForeignKey
ALTER TABLE `user_has_permissions` DROP FOREIGN KEY `user_has_permissions_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `user_has_roles` DROP FOREIGN KEY `user_has_roles_role_id_fkey`;

-- DropForeignKey
ALTER TABLE `user_has_roles` DROP FOREIGN KEY `user_has_roles_user_id_fkey`;

-- DropIndex
DROP INDEX `role_has_permissions_permission_id_fkey` ON `role_has_permissions`;

-- DropIndex
DROP INDEX `role_has_permissions_role_id_fkey` ON `role_has_permissions`;

-- DropIndex
DROP INDEX `user_has_permissions_permission_id_fkey` ON `user_has_permissions`;

-- DropIndex
DROP INDEX `user_has_permissions_user_id_fkey` ON `user_has_permissions`;

-- DropIndex
DROP INDEX `user_has_roles_role_id_fkey` ON `user_has_roles`;

-- DropIndex
DROP INDEX `user_has_roles_user_id_fkey` ON `user_has_roles`;

-- AddForeignKey
ALTER TABLE `user_has_roles` ADD CONSTRAINT `user_has_roles_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_has_roles` ADD CONSTRAINT `user_has_roles_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `role_has_permissions` ADD CONSTRAINT `role_has_permissions_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `role_has_permissions` ADD CONSTRAINT `role_has_permissions_permission_id_fkey` FOREIGN KEY (`permission_id`) REFERENCES `permissions`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_has_permissions` ADD CONSTRAINT `user_has_permissions_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_has_permissions` ADD CONSTRAINT `user_has_permissions_permission_id_fkey` FOREIGN KEY (`permission_id`) REFERENCES `permissions`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
