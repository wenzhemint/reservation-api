-- CreateTable
CREATE TABLE "TableInfo" (
    "id" SERIAL NOT NULL,
    "tableNo" TEXT NOT NULL,
    "tableSize" TEXT,

    CONSTRAINT "TableInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" SERIAL NOT NULL,
    "guestName" TEXT NOT NULL,
    "contactInfo" TEXT NOT NULL,
    "arrivalTime" TIMESTAMP(3) NOT NULL,
    "bookingStatus" BOOLEAN DEFAULT true,
    "tableInfoId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TableInfo_tableNo_key" ON "TableInfo"("tableNo");

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_tableInfoId_fkey" FOREIGN KEY ("tableInfoId") REFERENCES "TableInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
