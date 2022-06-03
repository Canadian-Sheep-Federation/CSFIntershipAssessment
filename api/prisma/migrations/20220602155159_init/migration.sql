/*
  Warnings:

  - You are about to drop the column `contract` on the `Survey` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Survey` DROP COLUMN `contract`,
    ADD COLUMN `comment` TEXT NULL;
