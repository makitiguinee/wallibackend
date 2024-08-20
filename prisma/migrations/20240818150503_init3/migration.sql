/*
  Warnings:

  - Added the required column `isdeleted` to the `Line` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `line` ADD COLUMN `isdeleted` BOOLEAN NOT NULL;
