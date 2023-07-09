-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "postgis";

-- CreateTable
CREATE TABLE "Album" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "date_created" TIMESTAMPTZ(6) NOT NULL DEFAULT timezone('utc'::text, now()),
    "date_modified" TIMESTAMPTZ(6) NOT NULL DEFAULT timezone('utc'::text, now()),
    "title" VARCHAR(100),
    "description" TEXT,
    "id_cover" UUID,
    "id_owner" UUID,

    CONSTRAINT "Album_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AlbumMedium" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "id_album" UUID NOT NULL,
    "id_medium" UUID NOT NULL,

    CONSTRAINT "AlbumMedium_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Medium" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "hash" VARCHAR(255),
    "date_created" TIMESTAMPTZ(6) NOT NULL DEFAULT timezone('utc'::text, now()),
    "date_modified" TIMESTAMPTZ(6) NOT NULL DEFAULT timezone('utc'::text, now()),
    "date_modified_status" TIMESTAMPTZ(6) NOT NULL DEFAULT timezone('utc'::text, now()),
    "date_taken" TIMESTAMPTZ(6),
    "filename_disk" VARCHAR(100) NOT NULL,
    "filename_download" VARCHAR(100),
    "title" VARCHAR(100),
    "description" TEXT,
    "location" DOUBLE PRECISION[],
    "status" TEXT DEFAULT 'all',
    "mimetype" VARCHAR(255),
    "meta" JSON,
    "idOwner" UUID,
    "idUploader" UUID,
    "country" TEXT DEFAULT '',
    "region" TEXT DEFAULT '',
    "place" TEXT DEFAULT '',
    "address" TEXT DEFAULT '',

    CONSTRAINT "Medium_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MediumTag" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "label" TEXT NOT NULL,
    "id_user" UUID,
    "id_medium" UUID,

    CONSTRAINT "MediumTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Device" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "date_created" TIMESTAMPTZ(6) NOT NULL DEFAULT timezone('utc'::text, now()),
    "date_modified" TIMESTAMPTZ(6) NOT NULL DEFAULT timezone('utc'::text, now()),
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "Device_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "date_created" TIMESTAMPTZ(6) NOT NULL DEFAULT timezone('utc'::text, now()),
    "date_modified" TIMESTAMPTZ(6) NOT NULL DEFAULT timezone('utc'::text, now()),
    "mail" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "first_name" VARCHAR(255) NOT NULL,
    "last_name" VARCHAR(255) NOT NULL,
    "language" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MediumToUser" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_DeviceToUser" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "AlbumMedium_id_album_id_medium_key" ON "AlbumMedium"("id_album", "id_medium");

-- CreateIndex
CREATE UNIQUE INDEX "Medium_hash_key" ON "Medium"("hash");

-- CreateIndex
CREATE UNIQUE INDEX "_MediumToUser_AB_unique" ON "_MediumToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_MediumToUser_B_index" ON "_MediumToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DeviceToUser_AB_unique" ON "_DeviceToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_DeviceToUser_B_index" ON "_DeviceToUser"("B");

-- AddForeignKey
ALTER TABLE "Album" ADD CONSTRAINT "album_id_medium_foreign" FOREIGN KEY ("id_cover") REFERENCES "Medium"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Album" ADD CONSTRAINT "album_owner_foreign" FOREIGN KEY ("id_owner") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "AlbumMedium" ADD CONSTRAINT "album_medium_id_album_foreign" FOREIGN KEY ("id_album") REFERENCES "Album"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "AlbumMedium" ADD CONSTRAINT "album_medium_id_medium_foreign" FOREIGN KEY ("id_medium") REFERENCES "Medium"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Medium" ADD CONSTRAINT "medium_owner_foreign" FOREIGN KEY ("idOwner") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Medium" ADD CONSTRAINT "medium_uploader_foreign" FOREIGN KEY ("idUploader") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "MediumTag" ADD CONSTRAINT "medium_tag_id_user_foreign" FOREIGN KEY ("id_user") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "MediumTag" ADD CONSTRAINT "medium_tag_id_medium" FOREIGN KEY ("id_medium") REFERENCES "Medium"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "_MediumToUser" ADD CONSTRAINT "_MediumToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Medium"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MediumToUser" ADD CONSTRAINT "_MediumToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DeviceToUser" ADD CONSTRAINT "_DeviceToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Device"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DeviceToUser" ADD CONSTRAINT "_DeviceToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
