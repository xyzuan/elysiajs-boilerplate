/*
  Warnings:

  - You are about to drop the column `sk_status` on the `user_sk` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user_sk` DROP COLUMN `sk_status`;

-- CreateTable
CREATE TABLE `user_sk_has_approver` (
    `id` VARCHAR(191) NOT NULL,
    `user_sk_id` VARCHAR(191) NOT NULL,
    `user_approver_id` VARCHAR(191) NOT NULL,
    `status` ENUM('VERIFY', 'APPROVED', 'REVISED', 'REJECTED') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user_sk_has_approver` ADD CONSTRAINT `user_sk_has_approver_user_sk_id_fkey` FOREIGN KEY (`user_sk_id`) REFERENCES `user_sk`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_sk_has_approver` ADD CONSTRAINT `user_sk_has_approver_user_approver_id_fkey` FOREIGN KEY (`user_approver_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
