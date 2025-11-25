-- CreateEnum
CREATE TYPE "KycStatus" AS ENUM ('PENDING', 'APPROVED', 'REUPLOAD_REQUIRED');

-- CreateTable
CREATE TABLE "KycApplication" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "pan" TEXT,
    "aadhaar" TEXT,
    "address" TEXT,
    "status" "KycStatus" NOT NULL DEFAULT 'PENDING',
    "failureReason" TEXT,
    "documentFiles" JSONB NOT NULL,
    "photoFile" TEXT,
    "signatureFile" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "KycApplication_pkey" PRIMARY KEY ("id")
);
