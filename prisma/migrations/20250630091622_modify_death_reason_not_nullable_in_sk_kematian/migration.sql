/*
  Warnings:

  - Made the column `death_reason` on table `sk_kematian` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `sk_kematian` MODIFY `death_reason` VARCHAR(191) NOT NULL;
