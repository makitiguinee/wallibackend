/*
  Warnings:

  - Added the required column `isdeleted` to the `Destination` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `destination` ADD COLUMN `isdeleted` BOOLEAN NOT NULL;
