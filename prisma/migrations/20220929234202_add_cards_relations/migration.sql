/*
  Warnings:

  - You are about to drop the column `categoria` on the `Compras` table. All the data in the column will be lost.
  - Added the required column `cartaoId` to the `Compras` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Compras` DROP COLUMN `categoria`,
    ADD COLUMN `cartaoId` VARCHAR(191) NOT NULL;
