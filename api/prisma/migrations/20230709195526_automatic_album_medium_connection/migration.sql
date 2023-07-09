/*
  Warnings:

  - You are about to drop the `AlbumMedium` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AlbumMedium" DROP CONSTRAINT "album_medium_id_album_foreign";

-- DropForeignKey
ALTER TABLE "AlbumMedium" DROP CONSTRAINT "album_medium_id_medium_foreign";

-- DropTable
DROP TABLE "AlbumMedium";

-- CreateTable
CREATE TABLE "_album_media" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_album_media_AB_unique" ON "_album_media"("A", "B");

-- CreateIndex
CREATE INDEX "_album_media_B_index" ON "_album_media"("B");

-- RenameForeignKey
ALTER TABLE "Album" RENAME CONSTRAINT "album_id_medium_foreign" TO "album_cover_foreign";

-- AddForeignKey
ALTER TABLE "_album_media" ADD CONSTRAINT "_album_media_A_fkey" FOREIGN KEY ("A") REFERENCES "Album"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_album_media" ADD CONSTRAINT "_album_media_B_fkey" FOREIGN KEY ("B") REFERENCES "Medium"("id") ON DELETE CASCADE ON UPDATE CASCADE;
