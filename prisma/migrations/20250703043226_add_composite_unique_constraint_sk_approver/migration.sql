/*
  Warnings:

  - A unique constraint covering the columns `[user_sk_id,user_approver_id]` on the table `user_sk_has_approver` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `user_sk_has_approver_user_sk_id_user_approver_id_key` ON `user_sk_has_approver`(`user_sk_id`, `user_approver_id`);
