/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Producer` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Producer_name_key` ON `Producer`(`name`);
