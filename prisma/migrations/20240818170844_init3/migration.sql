/*
  Warnings:

  - Added the required column `isdeleted` to the `Taxe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `taxe` ADD COLUMN `isdeleted` BOOLEAN NOT NULL;
