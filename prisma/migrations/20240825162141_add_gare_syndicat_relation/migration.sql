/*
  Warnings:

  - You are about to drop the column `pays` on the `syndicat` table. All the data in the column will be lost.
  - Added the required column `syndicatId` to the `Gare` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quartier` to the `Line` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ville` to the `Line` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nationality` to the `Syndicat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `gare` ADD COLUMN `syndicatId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `line` ADD COLUMN `quartier` VARCHAR(80) NOT NULL,
    ADD COLUMN `ville` VARCHAR(80) NOT NULL;

-- AlterTable
ALTER TABLE `syndicat` DROP COLUMN `pays`,
    ADD COLUMN `nationality` VARCHAR(80) NOT NULL;

-- CreateTable
CREATE TABLE `_GareSyndicat` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_GareSyndicat_AB_unique`(`A`, `B`),
    INDEX `_GareSyndicat_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Gare` ADD CONSTRAINT `Gare_syndicatId_fkey` FOREIGN KEY (`syndicatId`) REFERENCES `Syndicat`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_GareSyndicat` ADD CONSTRAINT `_GareSyndicat_A_fkey` FOREIGN KEY (`A`) REFERENCES `Gare`(`gareId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_GareSyndicat` ADD CONSTRAINT `_GareSyndicat_B_fkey` FOREIGN KEY (`B`) REFERENCES `Syndicat`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
