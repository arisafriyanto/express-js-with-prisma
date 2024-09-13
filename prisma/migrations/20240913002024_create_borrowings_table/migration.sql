-- CreateTable
CREATE TABLE `borrowings` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `memberCode` VARCHAR(191) NOT NULL,
    `bookCode` VARCHAR(191) NOT NULL,
    `borrowDate` DATETIME(0) NOT NULL,
    `returnDate` DATETIME(0) NULL,
    `fine` INTEGER NOT NULL DEFAULT 0,
    `returned` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE InnoDB;

-- AddForeignKey
ALTER TABLE `borrowings` ADD CONSTRAINT `borrowings_memberCode_fkey` FOREIGN KEY (`memberCode`) REFERENCES `members`(`code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `borrowings` ADD CONSTRAINT `borrowings_bookCode_fkey` FOREIGN KEY (`bookCode`) REFERENCES `books`(`code`) ON DELETE RESTRICT ON UPDATE CASCADE;
