/*
  Warnings:

  - Added the required column `boutiqueId` to the `Produit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `produit` ADD COLUMN `boutiqueId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Produit` ADD CONSTRAINT `Produit_boutiqueId_fkey` FOREIGN KEY (`boutiqueId`) REFERENCES `Boutique`(`boutiqueId`) ON DELETE RESTRICT ON UPDATE CASCADE;
