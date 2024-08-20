/*
  Warnings:

  - You are about to drop the column `adresse` on the `boutique` table. All the data in the column will be lost.
  - Added the required column `altitude` to the `Boutique` table without a default value. This is not possible if the table is not empty.
  - Added the required column `latitude` to the `Boutique` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `Boutique` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pays` to the `Boutique` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quartier` to the `Boutique` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ville` to the `Boutique` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lineId` to the `Engin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `altitude` to the `Gare` table without a default value. This is not possible if the table is not empty.
  - Added the required column `latitude` to the `Gare` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `Gare` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Produit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `boutique` DROP COLUMN `adresse`,
    ADD COLUMN `altitude` VARCHAR(180) NOT NULL,
    ADD COLUMN `latitude` VARCHAR(180) NOT NULL,
    ADD COLUMN `longitude` VARCHAR(180) NOT NULL,
    ADD COLUMN `pays` VARCHAR(50) NOT NULL,
    ADD COLUMN `quartier` VARCHAR(180) NOT NULL,
    ADD COLUMN `ville` VARCHAR(180) NOT NULL;

-- AlterTable
ALTER TABLE `engin` ADD COLUMN `lineId` INTEGER NOT NULL,
    MODIFY `dateService` VARCHAR(191) NOT NULL,
    MODIFY `dateEpireAssurance` VARCHAR(191) NOT NULL,
    MODIFY `dateEpireCarteGris` VARCHAR(191) NOT NULL,
    MODIFY `dateEpireVignette` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `gare` ADD COLUMN `altitude` VARCHAR(180) NOT NULL,
    ADD COLUMN `latitude` VARCHAR(180) NOT NULL,
    ADD COLUMN `longitude` VARCHAR(180) NOT NULL;

-- AlterTable
ALTER TABLE `produit` ADD COLUMN `description` VARCHAR(255) NOT NULL;

-- CreateTable
CREATE TABLE `Syndicat` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `phone` VARCHAR(80) NOT NULL,
    `dateOfBirth` VARCHAR(80) NOT NULL,
    `pays` VARCHAR(80) NOT NULL,
    `ville` VARCHAR(80) NOT NULL,
    `quartie` VARCHAR(80) NOT NULL,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Line` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `phone` VARCHAR(80) NOT NULL,
    `longitude` VARCHAR(180) NOT NULL,
    `altitude` VARCHAR(180) NOT NULL,
    `latitude` VARCHAR(180) NOT NULL,
    `syndicatId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Engin` ADD CONSTRAINT `Engin_lineId_fkey` FOREIGN KEY (`lineId`) REFERENCES `Line`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Syndicat` ADD CONSTRAINT `Syndicat_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Line` ADD CONSTRAINT `Line_syndicatId_fkey` FOREIGN KEY (`syndicatId`) REFERENCES `Syndicat`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
