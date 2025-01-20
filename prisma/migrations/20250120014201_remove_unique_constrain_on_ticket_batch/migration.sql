/*
  Warnings:

  - Made the column `end_date` on table `TicketBatch` required. This step will fail if there are existing NULL values in that column.
  - Made the column `start_date` on table `TicketBatch` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX `TicketBatch_name_key` ON `TicketBatch`;

-- AlterTable
ALTER TABLE `TicketBatch` MODIFY `end_date` DATETIME(3) NOT NULL,
    MODIFY `start_date` DATETIME(3) NOT NULL;
