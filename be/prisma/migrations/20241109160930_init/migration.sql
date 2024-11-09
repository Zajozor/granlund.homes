-- CreateTable
CREATE TABLE "Catalogue" (
    "id" TEXT NOT NULL,
    "serial_number" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "manufacturer" TEXT NOT NULL,
    "manual_url" TEXT NOT NULL,
    "other" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Catalogue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" TEXT NOT NULL,
    "catalogue_id" TEXT NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Property" (
    "id" TEXT NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "Property_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_catalogue_id_fkey" FOREIGN KEY ("catalogue_id") REFERENCES "Catalogue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
