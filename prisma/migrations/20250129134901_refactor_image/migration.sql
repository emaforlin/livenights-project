/*
  Warnings:

  - You are about to drop the column `event_id` on the `Image` table. All the data in the column will be lost.
  - Added the required column `owner_id` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Image` DROP FOREIGN KEY `Image_event_id_fkey`;

-- DropIndex
DROP INDEX `Image_event_id_fkey` ON `Image`;

-- AlterTable
ALTER TABLE `Image` DROP COLUMN `event_id`,
    ADD COLUMN `owner_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Image` ADD CONSTRAINT `Image_owner_id_fkey` FOREIGN KEY (`owner_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
