/*
  Warnings:

  - Added the required column `batch_id` to the `TicketOrder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `TicketOrder` ADD COLUMN `batch_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `TicketOrder` ADD CONSTRAINT `TicketOrder_batch_id_fkey` FOREIGN KEY (`batch_id`) REFERENCES `TicketBatch`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
