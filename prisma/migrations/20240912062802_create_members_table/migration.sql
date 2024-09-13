-- CreateTable
CREATE TABLE `members` (
    `code` VARCHAR(100) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `penalty` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE InnoDB;
