/*
  Warnings:

  - Added the required column `filetype` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Image` ADD COLUMN `filetype` VARCHAR(191) NOT NULL;
