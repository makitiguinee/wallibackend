-- CreateTable
CREATE TABLE `User` (
    `userId` INTEGER NOT NULL AUTO_INCREMENT,
    `firstname` VARCHAR(80) NOT NULL,
    `lastname` VARCHAR(80) NOT NULL,
    `username` VARCHAR(80) NOT NULL,
    `sexe` VARCHAR(15) NOT NULL,
    `email` VARCHAR(80) NOT NULL,
    `password` VARCHAR(80) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
