/*
  Warnings:

  - You are about to drop the column `location` on the `Listing` table. All the data in the column will be lost.
  - Added the required column `city` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `listingType` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `streetAddress` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `yearBuilt` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zipCode` to the `Listing` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Listing" DROP COLUMN "location",
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "images" TEXT[],
ADD COLUMN     "listingType" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL,
ADD COLUMN     "streetAddress" TEXT NOT NULL,
ADD COLUMN     "yearBuilt" INTEGER NOT NULL,
ADD COLUMN     "zipCode" TEXT NOT NULL;
