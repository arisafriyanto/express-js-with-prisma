-- CreateTable
CREATE TABLE `books` (
    `code` VARCHAR(100) NOT NULL,
    `title` VARCHAR(50) NOT NULL,
    `author` VARCHAR(50) NOT NULL,
    `stock` INTEGER NOT NULL DEFAULT 1,

    PRIMARY KEY (`code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE InnoDB;
