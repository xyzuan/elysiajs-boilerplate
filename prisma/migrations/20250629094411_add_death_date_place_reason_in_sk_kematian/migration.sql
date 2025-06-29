/*
  Warnings:

  - Added the required column `death_date` to the `sk_kematian` table without a default value. This is not possible if the table is not empty.
  - Added the required column `death_place` to the `sk_kematian` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `sk_kematian` ADD COLUMN `death_date` DATETIME(3) NOT NULL,
    ADD COLUMN `death_place` VARCHAR(191) NOT NULL,
    ADD COLUMN `death_reason` VARCHAR(191) NULL;
