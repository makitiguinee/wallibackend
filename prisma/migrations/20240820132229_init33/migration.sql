/*
  Warnings:

  - You are about to drop the column `destinationId` on the `engin` table. All the data in the column will be lost.
  - You are about to drop the column `destinationId` on the `passager` table. All the data in the column will be lost.
  - Added the required column `prix` to the `Destination` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `engin` DROP FOREIGN KEY `Engin_destinationId_fkey`;

-- DropForeignKey
ALTER TABLE `engin` DROP FOREIGN KEY `Engin_lineId_fkey`;

-- DropForeignKey
ALTER TABLE `passager` DROP FOREIGN KEY `Passager_destinationId_fkey`;

-- AlterTable
ALTER TABLE `destination` ADD COLUMN `prix` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `engin` DROP COLUMN `destinationId`,
    MODIFY `lineId` INTEGER NULL;

-- AlterTable
ALTER TABLE `passager` DROP COLUMN `destinationId`;

-- CreateTable
CREATE TABLE `Trajet` (
    `trajetId` INTEGER NOT NULL AUTO_INCREMENT,
    `passagerId` INTEGER NOT NULL,
    `enginId` INTEGER NOT NULL,
    `destinationId` INTEGER NOT NULL,
    `gareId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`trajetId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Engin` ADD CONSTRAINT `Engin_lineId_fkey` FOREIGN KEY (`lineId`) REFERENCES `Line`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Trajet` ADD CONSTRAINT `Trajet_passagerId_fkey` FOREIGN KEY (`passagerId`) REFERENCES `Passager`(`passagerId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Trajet` ADD CONSTRAINT `Trajet_enginId_fkey` FOREIGN KEY (`enginId`) REFERENCES `Engin`(`enginId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Trajet` ADD CONSTRAINT `Trajet_destinationId_fkey` FOREIGN KEY (`destinationId`) REFERENCES `Destination`(`destinationId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Trajet` ADD CONSTRAINT `Trajet_gareId_fkey` FOREIGN KEY (`gareId`) REFERENCES `Gare`(`gareId`) ON DELETE RESTRICT ON UPDATE CASCADE;
