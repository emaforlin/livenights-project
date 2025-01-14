/*
  Warnings:

  - You are about to drop the `UserRole` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[image]` on the table `Event` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `image` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role_id` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `UserRole` DROP FOREIGN KEY `UserRole_role_id_fkey`;

-- DropForeignKey
ALTER TABLE `UserRole` DROP FOREIGN KEY `UserRole_user_id_fkey`;

-- AlterTable
ALTER TABLE `Event` ADD COLUMN `image` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `role_id` INTEGER NOT NULL,
    ADD COLUMN `username` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `UserRole`;

-- CreateIndex
CREATE UNIQUE INDEX `Event_image_key` ON `Event`(`image`);

-- CreateIndex
CREATE UNIQUE INDEX `User_username_key` ON `User`(`username`);

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `Role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
