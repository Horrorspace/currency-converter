/*
  Warnings:

  - You are about to drop the column `AMD` on the `ThbExchangeRate` table. All the data in the column will be lost.
  - You are about to drop the column `AZN` on the `ThbExchangeRate` table. All the data in the column will be lost.
  - You are about to drop the column `BGN` on the `ThbExchangeRate` table. All the data in the column will be lost.
  - You are about to drop the column `BRL` on the `ThbExchangeRate` table. All the data in the column will be lost.
  - You are about to drop the column `BYN` on the `ThbExchangeRate` table. All the data in the column will be lost.
  - You are about to drop the column `GEL` on the `ThbExchangeRate` table. All the data in the column will be lost.
  - You are about to drop the column `KGS` on the `ThbExchangeRate` table. All the data in the column will be lost.
  - You are about to drop the column `KZT` on the `ThbExchangeRate` table. All the data in the column will be lost.
  - You are about to drop the column `MDL` on the `ThbExchangeRate` table. All the data in the column will be lost.
  - You are about to drop the column `RON` on the `ThbExchangeRate` table. All the data in the column will be lost.
  - You are about to drop the column `RSD` on the `ThbExchangeRate` table. All the data in the column will be lost.
  - You are about to drop the column `TJS` on the `ThbExchangeRate` table. All the data in the column will be lost.
  - You are about to drop the column `TMT` on the `ThbExchangeRate` table. All the data in the column will be lost.
  - You are about to drop the column `TRY` on the `ThbExchangeRate` table. All the data in the column will be lost.
  - You are about to drop the column `UAH` on the `ThbExchangeRate` table. All the data in the column will be lost.
  - You are about to drop the column `UZS` on the `ThbExchangeRate` table. All the data in the column will be lost.
  - You are about to drop the column `XDR` on the `ThbExchangeRate` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ThbExchangeRate" DROP COLUMN "AMD",
DROP COLUMN "AZN",
DROP COLUMN "BGN",
DROP COLUMN "BRL",
DROP COLUMN "BYN",
DROP COLUMN "GEL",
DROP COLUMN "KGS",
DROP COLUMN "KZT",
DROP COLUMN "MDL",
DROP COLUMN "RON",
DROP COLUMN "RSD",
DROP COLUMN "TJS",
DROP COLUMN "TMT",
DROP COLUMN "TRY",
DROP COLUMN "UAH",
DROP COLUMN "UZS",
DROP COLUMN "XDR";
