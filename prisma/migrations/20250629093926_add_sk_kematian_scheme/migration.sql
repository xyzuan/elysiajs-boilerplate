-- CreateTable
CREATE TABLE `sk_kematian` (
    `id` VARCHAR(191) NOT NULL,
    `born_birth` DATETIME(3) NOT NULL,
    `born_place` VARCHAR(191) NOT NULL,
    `nik` VARCHAR(191) NOT NULL,
    `religion` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
