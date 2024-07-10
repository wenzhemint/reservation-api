-- CreateTable
CREATE TABLE "TableInfo" (
    "id" SERIAL NOT NULL,
    "tableNo" TEXT NOT NULL,
    "tableSize" TEXT,

    CONSTRAINT "TableInfo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TableInfo_tableNo_key" ON "TableInfo"("tableNo");
