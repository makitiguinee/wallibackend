/*
  Warnings:

  - Added the required column `nom` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `image` ADD COLUMN `nom` VARCHAR(180) NOT NULL;
