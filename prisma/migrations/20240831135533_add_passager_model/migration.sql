/*
  Warnings:

  - Added the required column `status` to the `Passager` table without a default value. This is not possible if the table is not empty.
  - Added the required column `villeDepart` to the `Passager` table without a default value. This is not possible if the table is not empty.
  - Added the required column `villeDestination` to the `Passager` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `passager` ADD COLUMN `status` ENUM('ANNULER', 'AFFECTER', 'ATTENTE') NOT NULL,
    ADD COLUMN `villeDepart` VARCHAR(80) NOT NULL,
    ADD COLUMN `villeDestination` VARCHAR(80) NOT NULL;
