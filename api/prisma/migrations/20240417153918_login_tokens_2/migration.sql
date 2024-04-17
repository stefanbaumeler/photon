/*
  Warnings:

  - You are about to drop the column `datePasswordResetTokenExpiration` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `passwordResetToken` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `signUpToken` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "datePasswordResetTokenExpiration",
DROP COLUMN "passwordResetToken",
DROP COLUMN "signUpToken",
ADD COLUMN     "date_password_reset_token_expiration" TIMESTAMP(3),
ADD COLUMN     "password_reset_token" TEXT DEFAULT '',
ADD COLUMN     "sign_up_token" TEXT DEFAULT '';
