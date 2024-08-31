/*
  Warnings:

  - Added the required column `gareId` to the `Passager` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `passager` ADD COLUMN `gareId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Passager` ADD CONSTRAINT `Passager_gareId_fkey` FOREIGN KEY (`gareId`) REFERENCES `Gare`(`gareId`) ON DELETE RESTRICT ON UPDATE CASCADE;
