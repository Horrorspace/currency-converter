/*
  Warnings:

  - The values [AZN,AMD,BYN,BGN,BRL,GEL,KZT,KGS,MDL,RON,XDR,TJS,TRY,TMT,UZS,UAH,RSD] on the enum `CurrencyCodes` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `AMD` on the `RubExchangeRate` table. All the data in the column will be lost.
  - You are about to drop the column `AZN` on the `RubExchangeRate` table. All the data in the column will be lost.
  - You are about to drop the column `BGN` on the `RubExchangeRate` table. All the data in the column will be lost.
  - You are about to drop the column `BRL` on the `RubExchangeRate` table. All the data in the column will be lost.
  - You are about to drop the column `BYN` on the `RubExchangeRate` table. All the data in the column will be lost.
  - You are about to drop the column `GEL` on the `RubExchangeRate` table. All the data in the column will be lost.
  - You are about to drop the column `KGS` on the `RubExchangeRate` table. All the data in the column will be lost.
  - You are about to drop the column `KZT` on the `RubExchangeRate` table. All the data in the column will be lost.
  - You are about to drop the column `MDL` on the `RubExchangeRate` table. All the data in the column will be lost.
  - You are about to drop the column `RON` on the `RubExchangeRate` table. All the data in the column will be lost.
  - You are about to drop the column `RSD` on the `RubExchangeRate` table. All the data in the column will be lost.
  - You are about to drop the column `TJS` on the `RubExchangeRate` table. All the data in the column will be lost.
  - You are about to drop the column `TMT` on the `RubExchangeRate` table. All the data in the column will be lost.
  - You are about to drop the column `TRY` on the `RubExchangeRate` table. All the data in the column will be lost.
  - You are about to drop the column `UAH` on the `RubExchangeRate` table. All the data in the column will be lost.
  - You are about to drop the column `UZS` on the `RubExchangeRate` table. All the data in the column will be lost.
  - You are about to drop the column `XDR` on the `RubExchangeRate` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "CurrencyCodes_new" AS ENUM ('AUD', 'GBP', 'HUF', 'VND', 'HKD', 'DKK', 'AED', 'USD', 'EUR', 'EGP', 'INR', 'IDR', 'CAD', 'QAR', 'CNY', 'NZD', 'NOK', 'PLN', 'SGD', 'THB', 'CZK', 'SEK', 'CHF', 'ZAR', 'KRW', 'JPY', 'RUB');
ALTER TABLE "Currency" ALTER COLUMN "code" TYPE "CurrencyCodes_new" USING ("code"::text::"CurrencyCodes_new");
ALTER TYPE "CurrencyCodes" RENAME TO "CurrencyCodes_old";
ALTER TYPE "CurrencyCodes_new" RENAME TO "CurrencyCodes";
DROP TYPE "CurrencyCodes_old";
COMMIT;

-- AlterTable
ALTER TABLE "RubExchangeRate" DROP COLUMN "AMD",
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
