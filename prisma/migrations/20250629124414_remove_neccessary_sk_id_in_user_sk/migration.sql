/*
  Warnings:

  - You are about to drop the column `sk_id` on the `user_sk` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `user_sk_sk_id_key` ON `user_sk`;

-- AlterTable
ALTER TABLE `user_sk` DROP COLUMN `sk_id`;
