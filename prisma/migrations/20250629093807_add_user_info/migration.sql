/*
  Warnings:

  - A unique constraint covering the columns `[nik]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `address` VARCHAR(191) NULL,
    ADD COLUMN `born_birth` DATETIME(3) NULL,
    ADD COLUMN `born_place` VARCHAR(191) NULL,
    ADD COLUMN `nik` VARCHAR(191) NULL,
    ADD COLUMN `religion` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `user_nik_key` ON `user`(`nik`);
