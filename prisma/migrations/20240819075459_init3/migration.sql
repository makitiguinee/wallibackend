/*
  Warnings:

  - Added the required column `isdeleted` to the `Gare` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `gare` ADD COLUMN `isdeleted` BOOLEAN NOT NULL;
