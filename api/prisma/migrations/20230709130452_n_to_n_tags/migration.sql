/*
  Warnings:

  - You are about to drop the `MediumTag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MediumTag" DROP CONSTRAINT "medium_tag_id_medium";

-- DropForeignKey
ALTER TABLE "MediumTag" DROP CONSTRAINT "medium_tag_id_user_foreign";

-- DropTable
DROP TABLE "MediumTag";

-- CreateTable
CREATE TABLE "Tag" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "label" TEXT NOT NULL,
    "id_user" UUID NOT NULL,
    "source" TEXT NOT NULL DEFAULT 'generated',

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MediumToTag" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Tag_id_user_label_key" ON "Tag"("id_user", "label");

-- CreateIndex
CREATE UNIQUE INDEX "_MediumToTag_AB_unique" ON "_MediumToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_MediumToTag_B_index" ON "_MediumToTag"("B");

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "tag_id_user_foreign" FOREIGN KEY ("id_user") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "_MediumToTag" ADD CONSTRAINT "_MediumToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Medium"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MediumToTag" ADD CONSTRAINT "_MediumToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
