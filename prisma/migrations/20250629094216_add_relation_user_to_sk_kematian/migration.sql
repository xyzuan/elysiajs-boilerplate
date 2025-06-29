/*
  Warnings:

  - Added the required column `reporter_id` to the `sk_kematian` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `sk_kematian` ADD COLUMN `reporter_id` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `sk_kematian` ADD CONSTRAINT `sk_kematian_reporter_id_fkey` FOREIGN KEY (`reporter_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
