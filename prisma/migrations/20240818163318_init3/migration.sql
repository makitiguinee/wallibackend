/*
  Warnings:

  - Added the required column `isdeleted` to the `Engin` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `engin` ADD COLUMN `isdeleted` BOOLEAN NOT NULL;
