/*
  Warnings:

  - You are about to drop the column `refreshToken` on the `User` table. All the data in the column will be lost.
  - Added the required column `datePasswordResetTokenExpiration` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `passwordResetToken` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `signUpToken` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "refreshToken",
ADD COLUMN     "datePasswordResetTokenExpiration" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "passwordResetToken" TEXT NOT NULL,
ADD COLUMN     "signUpToken" TEXT NOT NULL;
