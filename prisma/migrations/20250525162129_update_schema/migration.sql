/*
  Warnings:

  - Added the required column `category` to the `favorite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdBy` to the `favorite` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "favorite" ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "createdBy" TEXT NOT NULL;
