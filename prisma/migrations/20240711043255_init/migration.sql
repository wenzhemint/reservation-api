-- CreateTable
CREATE TABLE "Booking" (
    "id" SERIAL NOT NULL,
    "guestName" TEXT NOT NULL,
    "contactInfo" TEXT NOT NULL,
    "arrivalTime" TEXT NOT NULL,
    "bookingStatus" BOOLEAN NOT NULL DEFAULT false,
    "tableInfoId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_tableInfoId_fkey" FOREIGN KEY ("tableInfoId") REFERENCES "TableInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
