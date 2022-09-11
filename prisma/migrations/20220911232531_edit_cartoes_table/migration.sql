/*
  Warnings:

  - You are about to drop the `LimitesControle` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `limite` to the `Cartoes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Cartoes` ADD COLUMN `limite` DOUBLE NOT NULL;

-- DropTable
DROP TABLE `LimitesControle`;
