/*
  Warnings:

  - You are about to drop the column `other` on the `Catalogue` table. All the data in the column will be lost.
  - Added the required column `other_data` to the `Catalogue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `condition_notes` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `property_id` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `xy_coordinates` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Property` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Catalogue" DROP COLUMN "other",
ADD COLUMN     "other_data" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "condition_notes" TEXT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "image" BYTEA NOT NULL,
ADD COLUMN     "installation_date" TIMESTAMP(3),
ADD COLUMN     "property_id" TEXT NOT NULL,
ADD COLUMN     "xy_coordinates" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "Property" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "image" BYTEA NOT NULL;

-- CreateTable
CREATE TABLE "Employee" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Issue" (
    "id" TEXT NOT NULL,
    "item_id" TEXT NOT NULL,
    "employee_id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Issue_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Issue" ADD CONSTRAINT "Issue_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Issue" ADD CONSTRAINT "Issue_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
