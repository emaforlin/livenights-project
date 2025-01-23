/*
  Warnings:

  - Added the required column `event_id` to the `TicketOrder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `TicketOrder` ADD COLUMN `event_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `TicketOrder` ADD CONSTRAINT `TicketOrder_event_id_fkey` FOREIGN KEY (`event_id`) REFERENCES `Event`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
