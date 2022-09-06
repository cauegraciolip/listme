/*
  Warnings:

  - Added the required column `userId` to the `Cartoes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Cartoes` ADD COLUMN `userId` INTEGER NOT NULL;
