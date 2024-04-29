CREATE TABLE IF NOT EXISTS "album" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"date_created" timestamp(6) with time zone DEFAULT now() NOT NULL,
	"date_modified" timestamp(6) with time zone DEFAULT now() NOT NULL,
	"title" varchar(100),
	"description" text,
	"id_cover" uuid,
	"id_owner" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "device" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"date_created" timestamp(6) with time zone DEFAULT now() NOT NULL,
	"date_modified" timestamp(6) with time zone DEFAULT now() NOT NULL,
	"name" text NOT NULL,
	"type" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "favorite" (
	"id_medium" uuid,
	"id_user" uuid,
	CONSTRAINT "favorite_id_medium_id_user_pk" PRIMARY KEY("id_medium","id_user")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "medium" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"hash" varchar(255),
	"date_created" timestamp(6) with time zone DEFAULT now() NOT NULL,
	"date_modified" timestamp(6) with time zone DEFAULT now() NOT NULL,
	"date_modified_status" timestamp(6) with time zone DEFAULT now() NOT NULL,
	"date_taken" timestamp(6) with time zone,
	"filename_disk" varchar(100) NOT NULL,
	"filename_download" varchar(100),
	"title" varchar(100),
	"description" text,
	"location" double precision[],
	"status" text DEFAULT 'all',
	"mimetype" varchar(255),
	"meta" json,
	"country" text DEFAULT '',
	"region" text DEFAULT '',
	"place" text DEFAULT '',
	"address" text DEFAULT '',
	"id_owner" uuid,
	"id_uploader" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "medium_to_album" (
	"id_medium" uuid,
	"id_album" uuid,
	CONSTRAINT "medium_to_album_id_medium_id_album_pk" PRIMARY KEY("id_medium","id_album")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "medium_to_tag" (
	"id_medium" uuid,
	"id_tag" uuid,
	CONSTRAINT "medium_to_tag_id_medium_id_tag_pk" PRIMARY KEY("id_medium","id_tag")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tag" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"label" text NOT NULL,
	"id_user" uuid NOT NULL,
	"source" text DEFAULT 'generated' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"date_created" timestamp(6) with time zone DEFAULT now() NOT NULL,
	"date_modified" timestamp(6) with time zone DEFAULT now() NOT NULL,
	"mail" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"first_name" varchar(255) NOT NULL,
	"last_name" varchar(255) NOT NULL,
	"language" text NOT NULL,
	"date_password_reset_token_expiration" timestamp(3),
	"password_reset_token" text DEFAULT '',
	"sign_up_token" text DEFAULT ''
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_to_device" (
	"id_user" uuid,
	"id_device" uuid,
	CONSTRAINT "user_to_device_id_user_id_device_pk" PRIMARY KEY("id_user","id_device")
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "medium_hash_key" ON "medium" ("hash");
