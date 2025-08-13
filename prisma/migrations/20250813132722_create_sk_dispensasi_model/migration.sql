-- AlterTable
ALTER TABLE `sk_approver_settings` MODIFY `sk_type` ENUM('KEMATIAN', 'TIDAK_MAMPU', 'DISPENSASI') NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `phone_number` VARCHAR(15) NULL;

-- AlterTable
ALTER TABLE `user_sk` MODIFY `sk_type` ENUM('KEMATIAN', 'TIDAK_MAMPU', 'DISPENSASI') NOT NULL;

-- CreateTable
CREATE TABLE `sk_dispensasi` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `born_birth` DATETIME(3) NOT NULL,
    `born_place` VARCHAR(191) NOT NULL,
    `gender` ENUM('MALE', 'FEMALE') NOT NULL,
    `nik` VARCHAR(191) NOT NULL,
    `religion` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `marital_status` ENUM('SINGLE', 'MARRIED', 'DIVORCED', 'WIDOWED', 'SEPARATED', 'SIRI') NOT NULL,
    `start_date` DATETIME(3) NOT NULL,
    `end_date` DATETIME(3) NOT NULL,
    `reason` VARCHAR(191) NOT NULL,
    `purpose` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,
    `user_sk_id` VARCHAR(191) NULL,

    UNIQUE INDEX `sk_dispensasi_user_sk_id_key`(`user_sk_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `sk_dispensasi` ADD CONSTRAINT `sk_dispensasi_user_sk_id_fkey` FOREIGN KEY (`user_sk_id`) REFERENCES `user_sk`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
