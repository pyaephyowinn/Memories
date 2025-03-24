/*
  Warnings:

  - Made the column `currency` on table `Listing` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Listing" ALTER COLUMN "currency" SET NOT NULL,
ALTER COLUMN "currency" DROP DEFAULT;
