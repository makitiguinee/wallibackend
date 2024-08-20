/*
  Warnings:

  - You are about to drop the column `quartie` on the `syndicat` table. All the data in the column will be lost.
  - Added the required column `quartier` to the `Syndicat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `syndicat` DROP COLUMN `quartie`,
    ADD COLUMN `quartier` VARCHAR(80) NOT NULL;
