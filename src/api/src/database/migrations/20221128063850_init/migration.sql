-- CreateTable
CREATE TABLE "albums" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" VARCHAR(100),
    "description" TEXT,
    "id_medium" UUID,
    "owner" UUID,

    CONSTRAINT "albums_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "albums_media" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "id_album" UUID,
    "id_medium" UUID,

    CONSTRAINT "albums_media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "media" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "hash" BIGINT,
    "date_created" TIMESTAMPTZ(6) DEFAULT timezone('utc'::text, now()),
    "date_modified" TIMESTAMPTZ(6) DEFAULT timezone('utc'::text, now()),
    "date_modified_status" TIMESTAMPTZ(6) DEFAULT timezone('utc'::text, now()),
    "date_taken" TIMESTAMPTZ(6),
    "filename_disk" VARCHAR(100),
    "filename_download" VARCHAR(100),
    "title" VARCHAR(100),
    "description" TEXT,
    "lat" REAL,
    "lng" REAL,
    "status" TEXT DEFAULT 'default',
    "mimetype" VARCHAR(255),
    "meta" JSONB,
    "owner" UUID,
    "uploader" UUID,

    CONSTRAINT "media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "date_created" TIMESTAMPTZ(6) DEFAULT timezone('utc'::text, now()),
    "date_modified" TIMESTAMPTZ(6) DEFAULT timezone('utc'::text, now()),
    "mail" VARCHAR(255),
    "password" VARCHAR(255),
    "first_name" VARCHAR(255),
    "last_name" VARCHAR(255),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "albums" ADD CONSTRAINT "albums_id_medium_foreign" FOREIGN KEY ("id_medium") REFERENCES "media"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "albums" ADD CONSTRAINT "albums_owner_foreign" FOREIGN KEY ("owner") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "albums_media" ADD CONSTRAINT "albums_media_id_album_foreign" FOREIGN KEY ("id_album") REFERENCES "albums"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "albums_media" ADD CONSTRAINT "albums_media_id_medium_foreign" FOREIGN KEY ("id_medium") REFERENCES "media"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "media" ADD CONSTRAINT "media_owner_foreign" FOREIGN KEY ("owner") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "media" ADD CONSTRAINT "media_uploader_foreign" FOREIGN KEY ("uploader") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
