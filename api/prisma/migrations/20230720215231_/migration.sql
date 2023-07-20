/*
  Warnings:

  - You are about to drop the column `idOwner` on the `Medium` table. All the data in the column will be lost.
  - You are about to drop the column `idUploader` on the `Medium` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Medium" DROP CONSTRAINT "medium_owner_foreign";

-- DropForeignKey
ALTER TABLE "Medium" DROP CONSTRAINT "medium_uploader_foreign";

-- AlterTable
ALTER TABLE "Medium" DROP COLUMN "idOwner",
DROP COLUMN "idUploader",
ADD COLUMN     "id_owner" UUID,
ADD COLUMN     "id_uploader" UUID;

-- AddForeignKey
ALTER TABLE "Medium" ADD CONSTRAINT "medium_owner_foreign" FOREIGN KEY ("id_owner") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Medium" ADD CONSTRAINT "medium_uploader_foreign" FOREIGN KEY ("id_uploader") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
