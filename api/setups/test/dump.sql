--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2
-- Dumped by pg_dump version 15.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE IF EXISTS ONLY public."Medium" DROP CONSTRAINT IF EXISTS medium_uploader_foreign;
ALTER TABLE IF EXISTS ONLY public."Medium" DROP CONSTRAINT IF EXISTS medium_owner_foreign;
ALTER TABLE IF EXISTS ONLY public."Album" DROP CONSTRAINT IF EXISTS album_owner_foreign;
ALTER TABLE IF EXISTS ONLY public."AlbumMedium" DROP CONSTRAINT IF EXISTS album_medium_id_medium_foreign;
ALTER TABLE IF EXISTS ONLY public."AlbumMedium" DROP CONSTRAINT IF EXISTS album_medium_id_album_foreign;
ALTER TABLE IF EXISTS ONLY public."Album" DROP CONSTRAINT IF EXISTS album_id_medium_foreign;
ALTER TABLE IF EXISTS ONLY public."_MediumToUser" DROP CONSTRAINT IF EXISTS "_MediumToUser_B_fkey";
ALTER TABLE IF EXISTS ONLY public."_MediumToUser" DROP CONSTRAINT IF EXISTS "_MediumToUser_A_fkey";
ALTER TABLE IF EXISTS ONLY public."_DeviceToUser" DROP CONSTRAINT IF EXISTS "_DeviceToUser_B_fkey";
ALTER TABLE IF EXISTS ONLY public."_DeviceToUser" DROP CONSTRAINT IF EXISTS "_DeviceToUser_A_fkey";
DROP INDEX IF EXISTS public."_MediumToUser_B_index";
DROP INDEX IF EXISTS public."_MediumToUser_AB_unique";
DROP INDEX IF EXISTS public."_DeviceToUser_B_index";
DROP INDEX IF EXISTS public."_DeviceToUser_AB_unique";
DROP INDEX IF EXISTS public."Medium_hash_key";
DROP INDEX IF EXISTS public."AlbumMedium_id_album_id_medium_key";
ALTER TABLE IF EXISTS ONLY public."User" DROP CONSTRAINT IF EXISTS "User_pkey";
ALTER TABLE IF EXISTS ONLY public."Medium" DROP CONSTRAINT IF EXISTS "Medium_pkey";
ALTER TABLE IF EXISTS ONLY public."Device" DROP CONSTRAINT IF EXISTS "Device_pkey";
ALTER TABLE IF EXISTS ONLY public."Album" DROP CONSTRAINT IF EXISTS "Album_pkey";
ALTER TABLE IF EXISTS ONLY public."AlbumMedium" DROP CONSTRAINT IF EXISTS "AlbumMedium_pkey";
DROP TABLE IF EXISTS public."_MediumToUser";
DROP TABLE IF EXISTS public."_DeviceToUser";
DROP TABLE IF EXISTS public."User";
DROP TABLE IF EXISTS public."Medium";
DROP TABLE IF EXISTS public."Device";
DROP TABLE IF EXISTS public."AlbumMedium";
DROP TABLE IF EXISTS public."Album";
DROP EXTENSION IF EXISTS postgis;
--
-- Name: postgis; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS postgis WITH SCHEMA public;


--
-- Name: EXTENSION postgis; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION postgis IS 'PostGIS geometry and geography spatial types and functions';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Album; Type: TABLE; Schema: public; Owner: stefanbaumeler
--

CREATE TABLE public."Album" (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    title character varying(100),
    description text,
    id_cover uuid,
    id_owner uuid
);


ALTER TABLE public."Album" OWNER TO stefanbaumeler;

--
-- Name: AlbumMedium; Type: TABLE; Schema: public; Owner: stefanbaumeler
--

CREATE TABLE public."AlbumMedium" (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    id_album uuid NOT NULL,
    id_medium uuid NOT NULL
);


ALTER TABLE public."AlbumMedium" OWNER TO stefanbaumeler;

--
-- Name: Device; Type: TABLE; Schema: public; Owner: stefanbaumeler
--

CREATE TABLE public."Device" (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    date_created timestamp(6) with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    date_modified timestamp(6) with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    name text NOT NULL,
    type text NOT NULL
);


ALTER TABLE public."Device" OWNER TO stefanbaumeler;

--
-- Name: Medium; Type: TABLE; Schema: public; Owner: stefanbaumeler
--

CREATE TABLE public."Medium" (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    hash character varying(255),
    date_created timestamp(6) with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    date_modified timestamp(6) with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    date_modified_status timestamp(6) with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    date_taken timestamp(6) with time zone,
    filename_disk character varying(100),
    filename_download character varying(100),
    title character varying(100),
    description text,
    location jsonb,
    status text DEFAULT 'all'::text,
    mimetype character varying(255),
    meta json,
    "idOwner" uuid,
    "idUploader" uuid,
    "generatedTags" text[],
    country text,
    region text,
    place text,
    address text
);


ALTER TABLE public."Medium" OWNER TO stefanbaumeler;

--
-- Name: User; Type: TABLE; Schema: public; Owner: stefanbaumeler
--

CREATE TABLE public."User" (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    date_created timestamp(6) with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    date_modified timestamp(6) with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    mail character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    first_name character varying(255) NOT NULL,
    last_name character varying(255) NOT NULL
);


ALTER TABLE public."User" OWNER TO stefanbaumeler;

--
-- Name: _DeviceToUser; Type: TABLE; Schema: public; Owner: stefanbaumeler
--

CREATE TABLE public."_DeviceToUser" (
    "A" uuid NOT NULL,
    "B" uuid NOT NULL
);


ALTER TABLE public."_DeviceToUser" OWNER TO stefanbaumeler;

--
-- Name: _MediumToUser; Type: TABLE; Schema: public; Owner: stefanbaumeler
--

CREATE TABLE public."_MediumToUser" (
    "A" uuid NOT NULL,
    "B" uuid NOT NULL
);


ALTER TABLE public."_MediumToUser" OWNER TO stefanbaumeler;

--
-- Data for Name: Album; Type: TABLE DATA; Schema: public; Owner: stefanbaumeler
--

COPY public."Album" (id, title, description, id_cover, id_owner) FROM stdin;
26a903e8-e06a-4063-8846-0263168251b6	Test Album 0	Test Description 0	9b004ea9-996f-4c18-92e3-bec2b9051585	51dde765-a6de-48c6-b372-41534fb91d55
064846fe-6e4e-410d-9baf-db12982d287e	Test Album 1	Test Description 1	9b004ea9-996f-4c18-92e3-bec2b9051585	51dde765-a6de-48c6-b372-41534fb91d55
fd8a10df-5db5-44ad-b131-019c274a1096	Test Album 2	Test Description 2	9b004ea9-996f-4c18-92e3-bec2b9051585	51dde765-a6de-48c6-b372-41534fb91d55
de0881c3-b22a-4c03-9ac9-e1cc9ca93bb8	Test Album 3	Test Description 3	9b004ea9-996f-4c18-92e3-bec2b9051585	51dde765-a6de-48c6-b372-41534fb91d55
c9260452-784a-43f0-aef1-4367e42734cb	Test Single	Test Single Description	9b004ea9-996f-4c18-92e3-bec2b9051585	51dde765-a6de-48c6-b372-41534fb91d55
\.


--
-- Data for Name: AlbumMedium; Type: TABLE DATA; Schema: public; Owner: stefanbaumeler
--

COPY public."AlbumMedium" (id, id_album, id_medium) FROM stdin;
00b37074-82e2-4bf8-a84d-5addc3b77a81	26a903e8-e06a-4063-8846-0263168251b6	9b004ea9-996f-4c18-92e3-bec2b9051585
f0bb945d-04b3-4fa8-b42c-3e86cdeb57d3	26a903e8-e06a-4063-8846-0263168251b6	2b96675e-2428-4520-909e-91e8a91fb5f9
b88ac88c-80f2-4c00-8af6-33ca08a6a8ee	26a903e8-e06a-4063-8846-0263168251b6	114d5e91-b89e-4a31-9305-d3753bf64f2c
93eb28ab-d6c6-4cfb-9652-dc5b1ed679f0	064846fe-6e4e-410d-9baf-db12982d287e	9b004ea9-996f-4c18-92e3-bec2b9051585
8975ab0f-b818-44a1-b426-48733bc1d2aa	064846fe-6e4e-410d-9baf-db12982d287e	2b96675e-2428-4520-909e-91e8a91fb5f9
33ba14ae-21cf-4c95-8ce8-6d5faa5a6271	064846fe-6e4e-410d-9baf-db12982d287e	114d5e91-b89e-4a31-9305-d3753bf64f2c
5c94f4cd-4114-4029-beb7-2838a2507b1e	fd8a10df-5db5-44ad-b131-019c274a1096	9b004ea9-996f-4c18-92e3-bec2b9051585
800b2fad-4bf5-40c8-8c31-d63bb3efeaa1	fd8a10df-5db5-44ad-b131-019c274a1096	2b96675e-2428-4520-909e-91e8a91fb5f9
055c6b67-8c27-4a39-a238-c7902beee1e8	fd8a10df-5db5-44ad-b131-019c274a1096	114d5e91-b89e-4a31-9305-d3753bf64f2c
ed9466bb-6db5-4029-962b-72d59cba78e7	de0881c3-b22a-4c03-9ac9-e1cc9ca93bb8	9b004ea9-996f-4c18-92e3-bec2b9051585
b654c881-4d80-420d-9a43-38e3449c2496	de0881c3-b22a-4c03-9ac9-e1cc9ca93bb8	2b96675e-2428-4520-909e-91e8a91fb5f9
1f6964b5-2f7e-4e88-8449-31f764aa30a5	de0881c3-b22a-4c03-9ac9-e1cc9ca93bb8	114d5e91-b89e-4a31-9305-d3753bf64f2c
c6c45347-f1fc-492b-a4b8-1bbef5e86b7f	c9260452-784a-43f0-aef1-4367e42734cb	9b004ea9-996f-4c18-92e3-bec2b9051585
\.


--
-- Data for Name: Device; Type: TABLE DATA; Schema: public; Owner: stefanbaumeler
--

COPY public."Device" (id, date_created, date_modified, name, type) FROM stdin;
\.


--
-- Data for Name: Medium; Type: TABLE DATA; Schema: public; Owner: stefanbaumeler
--

COPY public."Medium" (id, hash, date_created, date_modified, date_modified_status, date_taken, filename_disk, filename_download, title, description, location, status, mimetype, meta, "idOwner", "idUploader", "generatedTags", country, region, place, address) FROM stdin;
9b004ea9-996f-4c18-92e3-bec2b9051585	4027638022486444	2022-11-10 23:00:00+00	2022-11-10 23:00:00+00	2023-03-19 09:29:00.582637+00	2022-07-22 13:33:36+00	9b004ea9-996f-4c18-92e3-bec2b9051585	Test Image 0.jpg	Test Image 0		"[null,null]"	all	image/jpeg	{"height":3072,"width":4080,"cameraMake":"Google","cameraModel":"Pixel 6","flash":16,"fNumber":1.85,"iso":40,"focalLength":"6.81 mm"}	51dde765-a6de-48c6-b372-41534fb91d55	51dde765-a6de-48c6-b372-41534fb91d55	{"Hut, Nature, Outdoors, Countryside, Building, Rural, Architecture, Shelter, Housing, Shack"}	\N	\N	\N	\N
2b96675e-2428-4520-909e-91e8a91fb5f9	6399297107300791	2022-11-10 23:00:00+00	2022-11-10 23:00:00+00	2023-03-19 09:29:00.672209+00	2022-07-22 13:18:09+00	2b96675e-2428-4520-909e-91e8a91fb5f9	Test Image 1.jpg	Test Image 1		"[null,null]"	all	image/jpeg	{"height":4108,"width":9216,"cameraMake":"Google","cameraModel":"Pixel 6"}	51dde765-a6de-48c6-b372-41534fb91d55	51dde765-a6de-48c6-b372-41534fb91d55	{"Scenery, Nature, Outdoors, Rubble, Gravel, Road, Rock, Wilderness, Landscape, Person, Slope, Mountain Range, Mountain"}	\N	\N	\N	\N
114d5e91-b89e-4a31-9305-d3753bf64f2c	7970782094991679	2022-11-10 23:00:00+00	2022-11-10 23:00:00+00	2023-03-19 09:29:00.702961+00	2017-06-17 09:47:02+00	114d5e91-b89e-4a31-9305-d3753bf64f2c	Test Image 2.jpg	Test Image 2		"[44.33674166666667,9.158188888888889]"	all	image/jpeg	{"height":3036,"width":4048,"cameraMake":"Google","cameraModel":"Pixel XL","flash":16,"fNumber":2,"iso":62,"focalLength":"4.67 mm"}	51dde765-a6de-48c6-b372-41534fb91d55	51dde765-a6de-48c6-b372-41534fb91d55	{"Scenery, Outdoors, Nature, Boat, Vehicle, Transportation, Railing, Handrail, Bridge, Summer, Water, Bird, Animal"}	\N	\N	\N	\N
bc8b723c-3f58-4bd6-a2e5-9fa1fbdd305d	8031633646104408	2022-11-10 23:00:00+00	2022-11-10 23:00:00+00	2023-03-19 09:29:00.747034+00	2022-07-22 07:18:09+00	bc8b723c-3f58-4bd6-a2e5-9fa1fbdd305d	Test Image 3.jpg	Test Image 3		"[null,null]"	all	image/jpeg	{"height":3072,"width":4080,"cameraMake":"Google","cameraModel":"Pixel 6","flash":16,"fNumber":1.85,"iso":44,"focalLength":"6.81 mm"}	51dde765-a6de-48c6-b372-41534fb91d55	51dde765-a6de-48c6-b372-41534fb91d55	{"Grassland, Nature, Outdoors, Field, Meadow, Countryside, Rural, Plateau, Pasture, Farm, Grass, Plant, Ground, Scenery"}	\N	\N	\N	\N
3498b0eb-9433-4c90-a27b-ac1f08221fa7	4786596051521061	2022-11-10 23:00:00+00	2022-11-10 23:00:00+00	2023-03-19 09:29:00.777215+00	2022-07-22 09:10:19+00	3498b0eb-9433-4c90-a27b-ac1f08221fa7	Test Image 4.jpg	Test Image 4		"[null,null]"	all	image/jpeg	{"height":3072,"width":4080,"cameraMake":"Google","cameraModel":"Pixel 6","flash":16,"fNumber":1.85,"iso":44,"focalLength":"6.81 mm"}	51dde765-a6de-48c6-b372-41534fb91d55	51dde765-a6de-48c6-b372-41534fb91d55	{"Reservoir, Outdoors, Nature, Water, Promontory, Scenery, Sea, Land"}	\N	\N	\N	\N
6e11ebf1-4d3d-457d-b27b-7fcf66d5bb16	1663484318860797	2022-11-10 23:00:00+00	2022-11-10 23:00:00+00	2023-03-19 09:29:00.810302+00	2022-07-22 09:35:19+00	6e11ebf1-4d3d-457d-b27b-7fcf66d5bb16	Test Image 5.jpg	Test Image 5		"[null,null]"	all	image/jpeg	{"height":3072,"width":4080,"cameraMake":"Google","cameraModel":"Pixel 6","flash":16,"fNumber":1.85,"iso":39,"focalLength":"6.81 mm"}	51dde765-a6de-48c6-b372-41534fb91d55	51dde765-a6de-48c6-b372-41534fb91d55	{"Shelter, Outdoors, Building, Architecture, Hut, Nature, Countryside, Rural, Scenery, Car, Vehicle, Transportation, Pickup Truck, Truck, Person"}	\N	\N	\N	\N
2ef6335e-ef45-400f-97ee-213f2c1e1a48	80032229074241	2022-11-10 23:00:00+00	2022-11-10 23:00:00+00	2023-03-19 09:29:00.836332+00	2022-07-22 08:41:00+00	2ef6335e-ef45-400f-97ee-213f2c1e1a48	Test Image 6.jpg	Test Image 6		"[null,null]"	all	image/jpeg	{"height":3072,"width":4080,"cameraMake":"Google","cameraModel":"Pixel 6","flash":16,"fNumber":1.85,"iso":45,"focalLength":"6.81 mm"}	51dde765-a6de-48c6-b372-41534fb91d55	51dde765-a6de-48c6-b372-41534fb91d55	{"Scenery, Outdoors, Nature, Promontory, Water, Beach, Shoreline, Sea, Coast"}	\N	\N	\N	\N
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: stefanbaumeler
--

COPY public."User" (id, date_created, date_modified, mail, password, first_name, last_name) FROM stdin;
51dde765-a6de-48c6-b372-41534fb91d55	2022-11-10 23:00:00+00	2022-11-10 23:00:00+00	test@test.com	$argon2id$v=19$m=65536,t=3,p=4$+p2e5v9GTqWN8axjGpEYfQ$gaDJinL+AB1j7T3ky6wANHiRHChysGMEFKlolJvc8/k	Test	McTestface
\.


--
-- Data for Name: _DeviceToUser; Type: TABLE DATA; Schema: public; Owner: stefanbaumeler
--

COPY public."_DeviceToUser" ("A", "B") FROM stdin;
\.


--
-- Data for Name: _MediumToUser; Type: TABLE DATA; Schema: public; Owner: stefanbaumeler
--

COPY public."_MediumToUser" ("A", "B") FROM stdin;
9b004ea9-996f-4c18-92e3-bec2b9051585	51dde765-a6de-48c6-b372-41534fb91d55
2b96675e-2428-4520-909e-91e8a91fb5f9	51dde765-a6de-48c6-b372-41534fb91d55
114d5e91-b89e-4a31-9305-d3753bf64f2c	51dde765-a6de-48c6-b372-41534fb91d55
\.


--
-- Data for Name: spatial_ref_sys; Type: TABLE DATA; Schema: public; Owner: stefanbaumeler
--

COPY public.spatial_ref_sys (srid, auth_name, auth_srid, srtext, proj4text) FROM stdin;
\.


--
-- Name: AlbumMedium AlbumMedium_pkey; Type: CONSTRAINT; Schema: public; Owner: stefanbaumeler
--

ALTER TABLE ONLY public."AlbumMedium"
    ADD CONSTRAINT "AlbumMedium_pkey" PRIMARY KEY (id);


--
-- Name: Album Album_pkey; Type: CONSTRAINT; Schema: public; Owner: stefanbaumeler
--

ALTER TABLE ONLY public."Album"
    ADD CONSTRAINT "Album_pkey" PRIMARY KEY (id);


--
-- Name: Device Device_pkey; Type: CONSTRAINT; Schema: public; Owner: stefanbaumeler
--

ALTER TABLE ONLY public."Device"
    ADD CONSTRAINT "Device_pkey" PRIMARY KEY (id);


--
-- Name: Medium Medium_pkey; Type: CONSTRAINT; Schema: public; Owner: stefanbaumeler
--

ALTER TABLE ONLY public."Medium"
    ADD CONSTRAINT "Medium_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: stefanbaumeler
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: AlbumMedium_id_album_id_medium_key; Type: INDEX; Schema: public; Owner: stefanbaumeler
--

CREATE UNIQUE INDEX "AlbumMedium_id_album_id_medium_key" ON public."AlbumMedium" USING btree (id_album, id_medium);


--
-- Name: Medium_hash_key; Type: INDEX; Schema: public; Owner: stefanbaumeler
--

CREATE UNIQUE INDEX "Medium_hash_key" ON public."Medium" USING btree (hash);


--
-- Name: _DeviceToUser_AB_unique; Type: INDEX; Schema: public; Owner: stefanbaumeler
--

CREATE UNIQUE INDEX "_DeviceToUser_AB_unique" ON public."_DeviceToUser" USING btree ("A", "B");


--
-- Name: _DeviceToUser_B_index; Type: INDEX; Schema: public; Owner: stefanbaumeler
--

CREATE INDEX "_DeviceToUser_B_index" ON public."_DeviceToUser" USING btree ("B");


--
-- Name: _MediumToUser_AB_unique; Type: INDEX; Schema: public; Owner: stefanbaumeler
--

CREATE UNIQUE INDEX "_MediumToUser_AB_unique" ON public."_MediumToUser" USING btree ("A", "B");


--
-- Name: _MediumToUser_B_index; Type: INDEX; Schema: public; Owner: stefanbaumeler
--

CREATE INDEX "_MediumToUser_B_index" ON public."_MediumToUser" USING btree ("B");


--
-- Name: _DeviceToUser _DeviceToUser_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: stefanbaumeler
--

ALTER TABLE ONLY public."_DeviceToUser"
    ADD CONSTRAINT "_DeviceToUser_A_fkey" FOREIGN KEY ("A") REFERENCES public."Device"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _DeviceToUser _DeviceToUser_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: stefanbaumeler
--

ALTER TABLE ONLY public."_DeviceToUser"
    ADD CONSTRAINT "_DeviceToUser_B_fkey" FOREIGN KEY ("B") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _MediumToUser _MediumToUser_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: stefanbaumeler
--

ALTER TABLE ONLY public."_MediumToUser"
    ADD CONSTRAINT "_MediumToUser_A_fkey" FOREIGN KEY ("A") REFERENCES public."Medium"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _MediumToUser _MediumToUser_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: stefanbaumeler
--

ALTER TABLE ONLY public."_MediumToUser"
    ADD CONSTRAINT "_MediumToUser_B_fkey" FOREIGN KEY ("B") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Album album_id_medium_foreign; Type: FK CONSTRAINT; Schema: public; Owner: stefanbaumeler
--

ALTER TABLE ONLY public."Album"
    ADD CONSTRAINT album_id_medium_foreign FOREIGN KEY (id_cover) REFERENCES public."Medium"(id) ON DELETE SET NULL;


--
-- Name: AlbumMedium album_medium_id_album_foreign; Type: FK CONSTRAINT; Schema: public; Owner: stefanbaumeler
--

ALTER TABLE ONLY public."AlbumMedium"
    ADD CONSTRAINT album_medium_id_album_foreign FOREIGN KEY (id_album) REFERENCES public."Album"(id) ON DELETE CASCADE;


--
-- Name: AlbumMedium album_medium_id_medium_foreign; Type: FK CONSTRAINT; Schema: public; Owner: stefanbaumeler
--

ALTER TABLE ONLY public."AlbumMedium"
    ADD CONSTRAINT album_medium_id_medium_foreign FOREIGN KEY (id_medium) REFERENCES public."Medium"(id) ON DELETE CASCADE;


--
-- Name: Album album_owner_foreign; Type: FK CONSTRAINT; Schema: public; Owner: stefanbaumeler
--

ALTER TABLE ONLY public."Album"
    ADD CONSTRAINT album_owner_foreign FOREIGN KEY (id_owner) REFERENCES public."User"(id) ON DELETE CASCADE;


--
-- Name: Medium medium_owner_foreign; Type: FK CONSTRAINT; Schema: public; Owner: stefanbaumeler
--

ALTER TABLE ONLY public."Medium"
    ADD CONSTRAINT medium_owner_foreign FOREIGN KEY ("idOwner") REFERENCES public."User"(id) ON DELETE CASCADE;


--
-- Name: Medium medium_uploader_foreign; Type: FK CONSTRAINT; Schema: public; Owner: stefanbaumeler
--

ALTER TABLE ONLY public."Medium"
    ADD CONSTRAINT medium_uploader_foreign FOREIGN KEY ("idUploader") REFERENCES public."User"(id);


--
-- PostgreSQL database dump complete
--

