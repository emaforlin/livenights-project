-- CreateTable
CREATE TABLE `TicketBatch` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `price` DOUBLE NOT NULL,
    `quantity` INTEGER NOT NULL,
    `enabled` BOOLEAN NOT NULL DEFAULT false,
    `event_id` INTEGER NOT NULL,

    UNIQUE INDEX `TicketBatch_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TicketBatch` ADD CONSTRAINT `TicketBatch_event_id_fkey` FOREIGN KEY (`event_id`) REFERENCES `Event`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
