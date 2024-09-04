-- CreateTable
CREATE TABLE `Image` (
    `imageId` INTEGER NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(255) NOT NULL,
    `produitId` INTEGER NOT NULL,

    PRIMARY KEY (`imageId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Image` ADD CONSTRAINT `Image_produitId_fkey` FOREIGN KEY (`produitId`) REFERENCES `Produit`(`produitId`) ON DELETE RESTRICT ON UPDATE CASCADE;
