/*
  Warnings:

  - Added the required column `isdeleted` to the `Boutique` table without a default value. This is not possible if the table is not empty.
  - Added the required column `intereseted` to the `Produit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isdeleted` to the `Produit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `boutique` ADD COLUMN `isdeleted` BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE `produit` ADD COLUMN `intereseted` BOOLEAN NOT NULL,
    ADD COLUMN `isdeleted` BOOLEAN NOT NULL;
