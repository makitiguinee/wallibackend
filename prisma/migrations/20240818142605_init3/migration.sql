/*
  Warnings:

  - You are about to drop the column `phone` on the `line` table. All the data in the column will be lost.
  - Added the required column `nomline` to the `Line` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `line` DROP COLUMN `phone`,
    ADD COLUMN `nomline` VARCHAR(80) NOT NULL;
