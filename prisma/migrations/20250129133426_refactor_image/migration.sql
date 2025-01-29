/*
  Warnings:

  - You are about to drop the column `file` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `in_use` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `last_used` on the `Image` table. All the data in the column will be lost.
  - Added the required column `url` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Image` DROP COLUMN `file`,
    DROP COLUMN `in_use`,
    DROP COLUMN `last_used`,
    ADD COLUMN `url` VARCHAR(191) NOT NULL;
