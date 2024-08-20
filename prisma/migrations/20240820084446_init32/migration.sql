/*
  Warnings:

  - Added the required column `userId` to the `Boutique` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `boutique` ADD COLUMN `userId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Boutique` ADD CONSTRAINT `Boutique_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;
