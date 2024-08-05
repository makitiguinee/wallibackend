-- CreateTable
CREATE TABLE `Role` (
    `roleId` INTEGER NOT NULL AUTO_INCREMENT,
    `nameRole` VARCHAR(80) NOT NULL,
    `descriptionRole` VARCHAR(180) NOT NULL,
    `permissions` ENUM('READ', 'WRITE', 'DELETE', 'UPDATE') NOT NULL,

    PRIMARY KEY (`roleId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Proprietaire` (
    `proprietaireId` INTEGER NOT NULL AUTO_INCREMENT,
    `city` VARCHAR(80) NOT NULL,
    `phone` VARCHAR(80) NOT NULL,
    `nationality` VARCHAR(80) NOT NULL,
    `dateOfBirth` DATETIME(3) NOT NULL,
    `typePice` ENUM('PASSPORT', 'CARTE_ELECTEUR', 'CARTE_IDENTITE') NOT NULL,
    `pieceNumber` VARCHAR(180) NOT NULL,
    `userId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`proprietaireId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Engin` (
    `enginId` INTEGER NOT NULL AUTO_INCREMENT,
    `immatricule` VARCHAR(80) NOT NULL,
    `marque` VARCHAR(80) NOT NULL,
    `model` VARCHAR(80) NOT NULL,
    `typeActivity` ENUM('MOTO_TAXI', 'VOITURE_TAXI', 'MOTO_PERSONNELLE', 'VOITURE_PERSONNELLE') NOT NULL,
    `dateService` DATETIME(3) NOT NULL,
    `numeroCarteVerte` VARCHAR(80) NOT NULL,
    `existAssurance` BOOLEAN NOT NULL,
    `dateEpireAssurance` DATETIME(3) NOT NULL,
    `existCarteGris` BOOLEAN NOT NULL,
    `dateEpireCarteGris` DATETIME(3) NOT NULL,
    `existVignette` BOOLEAN NOT NULL,
    `dateEpireVignette` DATETIME(3) NOT NULL,
    `proprietaireId` INTEGER NOT NULL,
    `destinationId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`enginId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Taxe` (
    `taxeId` INTEGER NOT NULL AUTO_INCREMENT,
    `montant` DOUBLE NOT NULL,
    `periode` ENUM('MENSUEL', 'TRIMESTRIEL', 'SEMESTRIEL', 'ANNUEL') NOT NULL,
    `statutPaiement` VARCHAR(80) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`taxeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EnginTaxe` (
    `enginTaxeId` INTEGER NOT NULL AUTO_INCREMENT,
    `enginId` INTEGER NOT NULL,
    `taxeId` INTEGER NOT NULL,
    `datePaiement` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `EnginTaxe_enginId_taxeId_key`(`enginId`, `taxeId`),
    PRIMARY KEY (`enginTaxeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Boutique` (
    `boutiqueId` INTEGER NOT NULL AUTO_INCREMENT,
    `nomBoutique` VARCHAR(80) NOT NULL,
    `adresse` VARCHAR(180) NOT NULL,
    `phone` VARCHAR(180) NOT NULL,
    `existAgreement` BOOLEAN NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`boutiqueId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Produit` (
    `produitId` INTEGER NOT NULL AUTO_INCREMENT,
    `nomProduit` VARCHAR(80) NOT NULL,
    `photo` VARCHAR(255) NOT NULL,
    `prix` DOUBLE NOT NULL,
    `type` ENUM('VENTE', 'LOCATION') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`produitId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Passager` (
    `passagerId` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(80) NOT NULL,
    `prenom` VARCHAR(80) NOT NULL,
    `phone` VARCHAR(80) NOT NULL,
    `destinationId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Passager_phone_key`(`phone`),
    PRIMARY KEY (`passagerId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Gare` (
    `gareId` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(80) NOT NULL,
    `city` VARCHAR(180) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`gareId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Destination` (
    `destinationId` INTEGER NOT NULL AUTO_INCREMENT,
    `villeDepart` VARCHAR(80) NOT NULL,
    `villeDestination` VARCHAR(80) NOT NULL,
    `gareId` INTEGER NOT NULL,

    PRIMARY KEY (`destinationId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_UserRole` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_UserRole_AB_unique`(`A`, `B`),
    INDEX `_UserRole_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Proprietaire` ADD CONSTRAINT `Proprietaire_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Engin` ADD CONSTRAINT `Engin_proprietaireId_fkey` FOREIGN KEY (`proprietaireId`) REFERENCES `Proprietaire`(`proprietaireId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Engin` ADD CONSTRAINT `Engin_destinationId_fkey` FOREIGN KEY (`destinationId`) REFERENCES `Destination`(`destinationId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EnginTaxe` ADD CONSTRAINT `EnginTaxe_enginId_fkey` FOREIGN KEY (`enginId`) REFERENCES `Engin`(`enginId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EnginTaxe` ADD CONSTRAINT `EnginTaxe_taxeId_fkey` FOREIGN KEY (`taxeId`) REFERENCES `Taxe`(`taxeId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Passager` ADD CONSTRAINT `Passager_destinationId_fkey` FOREIGN KEY (`destinationId`) REFERENCES `Destination`(`destinationId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Destination` ADD CONSTRAINT `Destination_gareId_fkey` FOREIGN KEY (`gareId`) REFERENCES `Gare`(`gareId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_UserRole` ADD CONSTRAINT `_UserRole_A_fkey` FOREIGN KEY (`A`) REFERENCES `Role`(`roleId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_UserRole` ADD CONSTRAINT `_UserRole_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;
