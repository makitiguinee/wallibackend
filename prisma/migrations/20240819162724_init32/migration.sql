/*
  Warnings:

  - You are about to alter the column `altitude` on the `boutique` table. The data in that column could be lost. The data in that column will be cast from `VarChar(180)` to `Double`.
  - You are about to alter the column `latitude` on the `boutique` table. The data in that column could be lost. The data in that column will be cast from `VarChar(180)` to `Double`.
  - You are about to alter the column `longitude` on the `boutique` table. The data in that column could be lost. The data in that column will be cast from `VarChar(180)` to `Double`.

*/
-- AlterTable
ALTER TABLE `boutique` MODIFY `altitude` DOUBLE NOT NULL,
    MODIFY `latitude` DOUBLE NOT NULL,
    MODIFY `longitude` DOUBLE NOT NULL;
