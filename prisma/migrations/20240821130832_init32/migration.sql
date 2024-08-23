/*
  Warnings:

  - Added the required column `isdeleted` to the `Trajet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `trajet` ADD COLUMN `isdeleted` BOOLEAN NOT NULL;
