/*
  Warnings:

  - Added the required column `gender` to the `sk_kematian` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `sk_kematian` ADD COLUMN `gender` ENUM('MALE', 'FEMALE') NOT NULL;
