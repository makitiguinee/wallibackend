/*
  Warnings:

  - Added the required column `isdeleted` to the `Passager` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `passager` ADD COLUMN `isdeleted` BOOLEAN NOT NULL;
