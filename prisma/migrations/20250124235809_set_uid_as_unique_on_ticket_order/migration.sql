/*
  Warnings:

  - A unique constraint covering the columns `[uid]` on the table `TicketOrder` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `TicketOrder_uid_key` ON `TicketOrder`(`uid`);
