-- CreateTable
CREATE TABLE `sk_approver_settings` (
    `id` VARCHAR(191) NOT NULL,
    `sk_type` ENUM('KEMATIAN', 'TIDAK_MAMPU') NOT NULL,
    `user_approver_id` VARCHAR(191) NOT NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `order_priority` INTEGER NOT NULL DEFAULT 1,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    INDEX `sk_approver_settings_sk_type_is_active_order_priority_idx`(`sk_type`, `is_active`, `order_priority`),
    UNIQUE INDEX `sk_approver_settings_sk_type_user_approver_id_key`(`sk_type`, `user_approver_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `sk_approver_settings` ADD CONSTRAINT `sk_approver_settings_user_approver_id_fkey` FOREIGN KEY (`user_approver_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
