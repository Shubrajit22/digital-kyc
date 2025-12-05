/*
  Warnings:

  - You are about to drop the column `address` on the `KycApplication` table. All the data in the column will be lost.
  - You are about to drop the column `failureReason` on the `KycApplication` table. All the data in the column will be lost.
  - You are about to drop the column `photoFile` on the `KycApplication` table. All the data in the column will be lost.
  - You are about to drop the column `signatureFile` on the `KycApplication` table. All the data in the column will be lost.
  - Made the column `pan` on table `KycApplication` required. This step will fail if there are existing NULL values in that column.
  - Made the column `aadhaar` on table `KycApplication` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "KycApplication" DROP COLUMN "address",
DROP COLUMN "failureReason",
DROP COLUMN "photoFile",
DROP COLUMN "signatureFile",
ALTER COLUMN "pan" SET NOT NULL,
ALTER COLUMN "aadhaar" SET NOT NULL,
ALTER COLUMN "documentFiles" DROP NOT NULL;
