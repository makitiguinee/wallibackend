/*
  Warnings:

  - Added the required column `isdeletd` to the `Proprietaire` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `proprietaire` ADD COLUMN `isdeletd` BOOLEAN NOT NULL;
