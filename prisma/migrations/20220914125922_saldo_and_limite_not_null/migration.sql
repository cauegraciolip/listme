/*
  Warnings:

  - Made the column `saldo` on table `Cartoes` required. This step will fail if there are existing NULL values in that column.
  - Made the column `limite` on table `Cartoes` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Cartoes` MODIFY `saldo` DOUBLE NOT NULL,
    MODIFY `limite` DOUBLE NOT NULL;
