/*
  Warnings:

  - You are about to drop the column `enabled` on the `TicketBatch` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `TicketBatch` DROP COLUMN `enabled`,
    ADD COLUMN `active` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `end_date` DATETIME(3) NULL,
    ADD COLUMN `start_date` DATETIME(3) NULL;
