/*
  Warnings:

  - Added the required column `total` to the `Compras` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Compras` ADD COLUMN `total` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `Produtos` MODIFY `valor` DOUBLE NULL;
