/*
  Warnings:

  - You are about to drop the column `owner_id` on the `Image` table. All the data in the column will be lost.
  - Added the required column `event_id` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Image` DROP FOREIGN KEY `Image_owner_id_fkey`;

-- DropIndex
DROP INDEX `Image_owner_id_fkey` ON `Image`;

-- AlterTable
ALTER TABLE `Image` DROP COLUMN `owner_id`,
    ADD COLUMN `event_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Image` ADD CONSTRAINT `Image_event_id_fkey` FOREIGN KEY (`event_id`) REFERENCES `Event`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
