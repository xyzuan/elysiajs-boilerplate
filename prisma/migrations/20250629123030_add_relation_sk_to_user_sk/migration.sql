/*
  Warnings:

  - A unique constraint covering the columns `[user_sk_id]` on the table `sk_kematian` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_sk_id]` on the table `sk_tidak_mampu` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[sk_id]` on the table `user_sk` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `sk_kematian` ADD COLUMN `user_sk_id` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `sk_tidak_mampu` ADD COLUMN `user_sk_id` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `sk_kematian_user_sk_id_key` ON `sk_kematian`(`user_sk_id`);

-- CreateIndex
CREATE UNIQUE INDEX `sk_tidak_mampu_user_sk_id_key` ON `sk_tidak_mampu`(`user_sk_id`);

-- CreateIndex
CREATE UNIQUE INDEX `user_sk_sk_id_key` ON `user_sk`(`sk_id`);

-- AddForeignKey
ALTER TABLE `sk_kematian` ADD CONSTRAINT `sk_kematian_user_sk_id_fkey` FOREIGN KEY (`user_sk_id`) REFERENCES `user_sk`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sk_tidak_mampu` ADD CONSTRAINT `sk_tidak_mampu_user_sk_id_fkey` FOREIGN KEY (`user_sk_id`) REFERENCES `user_sk`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
