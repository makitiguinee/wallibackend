/*
  Warnings:

  - Added the required column `isdeleted` to the `Syndicat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `syndicat` ADD COLUMN `isdeleted` BOOLEAN NOT NULL;
