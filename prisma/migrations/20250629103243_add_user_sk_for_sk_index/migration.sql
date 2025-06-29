/*
  Warnings:

  - You are about to drop the column `reporter_id` on the `sk_kematian` table. All the data in the column will be lost.
  - You are about to drop the column `sk_status` on the `sk_kematian` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `sk_kematian` DROP FOREIGN KEY `sk_kematian_reporter_id_fkey`;

-- AlterTable
ALTER TABLE `sk_kematian` DROP COLUMN `reporter_id`,
    DROP COLUMN `sk_status`;

-- CreateTable
CREATE TABLE `user_sk` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `sk_id` VARCHAR(191) NOT NULL,
    `sk_type` ENUM('KEMATIAN') NOT NULL,
    `sk_status` ENUM('VERIFY', 'APPROVED', 'REVISED', 'REJECTED') NOT NULL DEFAULT 'VERIFY',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    INDEX `user_sk_user_id_sk_id_idx`(`user_id`, `sk_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user_sk` ADD CONSTRAINT `user_sk_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
