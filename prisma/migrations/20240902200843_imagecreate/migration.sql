/*
  Warnings:

  - You are about to drop the column `intereseted` on the `produit` table. All the data in the column will be lost.
  - You are about to drop the column `isdeleted` on the `produit` table. All the data in the column will be lost.
  - Added the required column `interessed` to the `Produit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isDeleted` to the `Produit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `produit` DROP COLUMN `intereseted`,
    DROP COLUMN `isdeleted`,
    ADD COLUMN `interessed` BOOLEAN NOT NULL,
    ADD COLUMN `isDeleted` BOOLEAN NOT NULL;
