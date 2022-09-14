/*
  Warnings:

  - Added the required column `tipo` to the `Cartoes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Cartoes` ADD COLUMN `tipo` VARCHAR(191) NOT NULL;
