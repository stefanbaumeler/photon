/*
  Warnings:

  - You are about to drop the `_album_media` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_album_media" DROP CONSTRAINT "_album_media_A_fkey";

-- DropForeignKey
ALTER TABLE "_album_media" DROP CONSTRAINT "_album_media_B_fkey";

-- DropTable
DROP TABLE "_album_media";

-- CreateTable
CREATE TABLE "_AlbumToMedium" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AlbumToMedium_AB_unique" ON "_AlbumToMedium"("A", "B");

-- CreateIndex
CREATE INDEX "_AlbumToMedium_B_index" ON "_AlbumToMedium"("B");

-- AddForeignKey
ALTER TABLE "_AlbumToMedium" ADD CONSTRAINT "_AlbumToMedium_A_fkey" FOREIGN KEY ("A") REFERENCES "Album"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AlbumToMedium" ADD CONSTRAINT "_AlbumToMedium_B_fkey" FOREIGN KEY ("B") REFERENCES "Medium"("id") ON DELETE CASCADE ON UPDATE CASCADE;
