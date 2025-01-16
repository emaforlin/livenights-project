/*
  Warnings:

  - You are about to drop the column `using` on the `Image` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Image` DROP COLUMN `using`,
    ADD COLUMN `in_use` BOOLEAN NOT NULL DEFAULT false;
