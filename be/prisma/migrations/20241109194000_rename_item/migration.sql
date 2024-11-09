/*
  Warnings:

  - You are about to drop the column `description` on the `Catalogue` table. All the data in the column will be lost.
  - Added the required column `category` to the `Catalogue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Catalogue` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Catalogue" DROP COLUMN "description",
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;
