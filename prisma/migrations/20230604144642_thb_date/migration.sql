/*
  Warnings:

  - Changed the type of `date` on the `ThbExchangeRate` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "ThbExchangeRate" DROP COLUMN "date",
ADD COLUMN     "date" DATE NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ThbExchangeRate_date_key" ON "ThbExchangeRate"("date");
