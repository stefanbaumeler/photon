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
    date_created timestamp(6) with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    date_modified timestamp(6) with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
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
    location float[],
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
09e5e7e1-f13d-4fcd-a729-6532dfbdc1d4	Dev Album 1	\N	39551190-5f17-4886-a200-5361b4d21117	51dde765-a6de-48c6-b372-41534fb91d55
77e4c72c-6ebc-4f8d-a787-9e4a63388288	Dev Album 2	\N	69cab0f7-d6eb-4a8e-81d2-e3c494e719b2	51dde765-a6de-48c6-b372-41534fb91d55
738110c5-c8c1-400f-aa29-b95772d6324e	Dev Album 3	\N	8f31a167-05ef-49e0-9ac7-730e826c32c4	51dde765-a6de-48c6-b372-41534fb91d55
\.


--
-- Data for Name: AlbumMedium; Type: TABLE DATA; Schema: public; Owner: stefanbaumeler
--

COPY public."AlbumMedium" (id, id_album, id_medium) FROM stdin;
74154720-d34b-4347-a29e-8f1496b53eef	09e5e7e1-f13d-4fcd-a729-6532dfbdc1d4	39551190-5f17-4886-a200-5361b4d21117
6026be6a-0aee-47b2-80a9-9d73b7882399	09e5e7e1-f13d-4fcd-a729-6532dfbdc1d4	5ebbdefe-8b60-43c4-8e97-8e0ad2ea8c35
c830db6a-0085-4349-8d68-f4648b181a99	09e5e7e1-f13d-4fcd-a729-6532dfbdc1d4	6ab4ef73-ffb9-47a9-b5da-5d7982b17c96
1eebcc6b-475e-47a6-944a-cf616cfe24b3	09e5e7e1-f13d-4fcd-a729-6532dfbdc1d4	72e8368b-4abd-4dab-9409-30432f6b041d
c216b0ad-e969-4182-b12b-34da7ec888a8	09e5e7e1-f13d-4fcd-a729-6532dfbdc1d4	d578e91d-16e5-4061-b2a2-2e8fef1143d0
a6099068-1a09-4def-adf9-903493258f47	09e5e7e1-f13d-4fcd-a729-6532dfbdc1d4	0ef17bcb-dda0-4e5d-92ea-2fffa889a003
ba3867f1-d13a-4f2b-9c71-2972a4f2686a	09e5e7e1-f13d-4fcd-a729-6532dfbdc1d4	c1619be0-f8ba-4473-b12f-30ce74e924b3
b645e3f7-5ad9-471f-a1ed-1c1970507019	09e5e7e1-f13d-4fcd-a729-6532dfbdc1d4	f4b6aeab-ee3d-4c00-8d4b-8a78aa20e004
548e425b-bfb9-486b-85a1-f5bd610c0ab4	77e4c72c-6ebc-4f8d-a787-9e4a63388288	69cab0f7-d6eb-4a8e-81d2-e3c494e719b2
e7562355-ad88-4fcf-98f2-cfb0136db8a7	77e4c72c-6ebc-4f8d-a787-9e4a63388288	ce5c0eac-9a37-40ff-8c86-074ea7466859
e7641f15-c2ac-4a21-bc5d-be5735749949	77e4c72c-6ebc-4f8d-a787-9e4a63388288	8a414f1a-7c59-429a-9758-956391249883
bba296f3-44da-42eb-8539-954be71e68aa	738110c5-c8c1-400f-aa29-b95772d6324e	8f31a167-05ef-49e0-9ac7-730e826c32c4
2dd1ccde-ad8a-4b25-a3b6-7fd925573e4d	738110c5-c8c1-400f-aa29-b95772d6324e	13722eb1-5607-4af7-af20-11ab901ec1ba
c1961055-dc03-414d-94ec-f37d5d1bc43b	738110c5-c8c1-400f-aa29-b95772d6324e	053aab5b-5366-4fa1-b9ac-7161b6f2dc5a
bf2a39c9-09e4-40db-9f27-c3c4c15eb7e5	738110c5-c8c1-400f-aa29-b95772d6324e	6d5bde04-5e56-4851-b67b-244821666c8b
9de5ee4f-3dbc-4a58-bd67-403be7c5f6e6	738110c5-c8c1-400f-aa29-b95772d6324e	31b41aba-4ce4-43e3-9b90-85e71a1acb14
cf21a88d-08d3-4f64-9473-25e9257928ce	738110c5-c8c1-400f-aa29-b95772d6324e	f2c1af18-eae1-4ff3-ae92-f79247487068
4c392957-f7c7-4648-85d8-401e49c5cce3	738110c5-c8c1-400f-aa29-b95772d6324e	16472155-e18a-4428-9fec-7a86e79c0a0c
b49ddc56-7db4-4812-a870-0f97ededa72c	738110c5-c8c1-400f-aa29-b95772d6324e	3f21bbf0-cf5f-491a-ac9a-66335170a6b0
58b0dcb1-538a-40a1-9d4d-645e7341ade7	738110c5-c8c1-400f-aa29-b95772d6324e	7ff3fb66-381f-4b06-a07b-f2eb2a7c1a31
70bb2c61-ae52-46e8-ba7e-cb005f227dc0	738110c5-c8c1-400f-aa29-b95772d6324e	e4a39dbf-a958-4712-96c1-109d6f48f0de
1f24a002-b987-42e4-a948-6f7ddbfaf875	738110c5-c8c1-400f-aa29-b95772d6324e	c1a8ed5d-5bb4-4311-bedc-fa7298727d35
43e6449b-ceea-4c53-9590-431e4610181b	738110c5-c8c1-400f-aa29-b95772d6324e	8d00dff5-32f4-4fbc-a23c-b3d097e5e796
597c2874-f0e7-4c9d-a2cd-eb42a96354a4	738110c5-c8c1-400f-aa29-b95772d6324e	5f269c44-612f-41ea-9785-18416997c743
dc235ab6-fec2-446c-b956-887c16b740fd	738110c5-c8c1-400f-aa29-b95772d6324e	95b6eb9f-3b66-4bbf-8236-8001bf2e78fe
83835b44-b36f-4f19-9f80-32bdf4ca31d6	738110c5-c8c1-400f-aa29-b95772d6324e	5441c7f2-8b03-4460-815a-98e3e2baa308
6a060065-bc32-4c97-80bb-b61a5317dc07	738110c5-c8c1-400f-aa29-b95772d6324e	8e1cc00e-fc30-4a08-ad1c-1b6545b3f4a8
32930a78-7f8e-4914-8545-e192d863172f	738110c5-c8c1-400f-aa29-b95772d6324e	7d87fcd4-2480-4baf-bf08-142fa8ed1ae2
3285f662-3b93-4d88-9f47-6e24d3173812	738110c5-c8c1-400f-aa29-b95772d6324e	2d04942d-0429-4715-90c4-b59333683c29
57c220d9-5ba8-4bc3-a892-86bbab90117a	738110c5-c8c1-400f-aa29-b95772d6324e	130c2ba3-9879-46e9-a82b-6c47fb5b27f8
8a7a373e-a986-448b-8743-dee86d80fea5	738110c5-c8c1-400f-aa29-b95772d6324e	d9f3b88a-610d-4de1-b2d7-651e11ed6b5d
f8c3f032-de31-4075-aa25-3cb5906bb6e4	738110c5-c8c1-400f-aa29-b95772d6324e	09767849-846b-4715-9054-73e3d0f28a5b
63811a33-2195-47c8-99ec-50ef196bdc43	738110c5-c8c1-400f-aa29-b95772d6324e	6ce608e8-a3d7-448a-a173-9bba39b74537
c75a0b7d-fc69-4668-bf59-4820c1eef578	738110c5-c8c1-400f-aa29-b95772d6324e	8e95a7b5-b510-4fbb-bc2c-e44b34cebfad
0b92e9e9-ab0a-4c9b-a620-d9f15c1f71d2	738110c5-c8c1-400f-aa29-b95772d6324e	94055771-4407-412f-aa2b-65d90f17bbec
98757bf6-13d5-42e0-a9d2-edbc6200f91f	738110c5-c8c1-400f-aa29-b95772d6324e	9275a4b2-350d-4227-8afc-6f600f2b67e6
a1fe3af4-df4d-41dc-b836-a471b00c4b6f	738110c5-c8c1-400f-aa29-b95772d6324e	bb05ea01-73e3-46ac-923f-fd8e8d2ff299
6ae1d88e-fdad-435d-aa2f-33fd76e501a3	738110c5-c8c1-400f-aa29-b95772d6324e	4d4bfabe-3d18-4d41-bfca-b7022465ce11
73ac7721-3514-4d9b-85e6-debc87a6daa2	738110c5-c8c1-400f-aa29-b95772d6324e	80d6c492-6e2a-4a34-acd2-e11b85ce4d2f
98cb6c6b-b812-4fc7-b6ae-f54cc84d3edc	738110c5-c8c1-400f-aa29-b95772d6324e	2cc36219-41db-40a9-bb1d-fc97fd139715
3b2c95d7-2061-4d5c-9e6b-c224dc1b26ed	738110c5-c8c1-400f-aa29-b95772d6324e	6d1e9cc8-8714-4484-a403-4da14cac19e5
082b7f22-b888-41ab-a616-9388d37a640a	738110c5-c8c1-400f-aa29-b95772d6324e	207ae6bf-b563-4efd-be08-bcfbe5f21d1f
3023affb-970d-4e2a-9bef-37878aa3125f	738110c5-c8c1-400f-aa29-b95772d6324e	46bd621f-10f2-4e9d-80c9-9b88cf5e791b
0b94f562-da44-43ed-b25e-98f37b278374	738110c5-c8c1-400f-aa29-b95772d6324e	66fcca20-2666-4281-bce7-3114941961ce
7cbd02f3-ebdd-411c-a550-4f2e51a98120	738110c5-c8c1-400f-aa29-b95772d6324e	5c778a62-d9c4-4cdd-b386-e9e90a28d679
3852c32c-c81e-49b7-9f2c-550236e3489d	738110c5-c8c1-400f-aa29-b95772d6324e	73862c50-14a5-4af7-882e-685f787938d1
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
8f31a167-05ef-49e0-9ac7-730e826c32c4	1698765635742854	2023-03-14 20:32:22.949747+00	2023-03-14 20:32:22.949747+00	2023-03-14 20:32:22.949747+00	2022-11-20 16:12:27+00	9c5dff90-1482-40dd-b943-636c6bdc2b54	PXL_20221120_171227449.jpg	PXL_20221120_171227449		{38.44345833333333,-9.099069444444446}	all	image/jpeg	{"height":3072,"width":4080,"cameraMake":"Google","cameraModel":"Pixel 6","flash":16,"fNumber":1.85,"iso":44,"focalLength":"6.81 mm"}	51dde765-a6de-48c6-b372-41534fb91d55	51dde765-a6de-48c6-b372-41534fb91d55	{"Architecture", "Building", "House", "Housing", "Roof", "Nature", "Outdoors", "Sky", "Tile Roof", "Person"}	Portugal	Setúbal	Sesimbra	Rua Dos Industriais
8a414f1a-7c59-429a-9758-956391249883	4849102632470704	2023-03-14 20:32:22.885245+00	2023-03-14 20:32:22.885245+00	2023-03-14 20:32:22.885245+00	2022-11-25 08:59:24+00	433aed97-476a-4407-8068-60f72ab04e26	PXL_20221125_075924056.jpg	PXL_20221125_075924056		{37.97169166666667,23.723783333333333}	all	image/jpeg	{"height":3072,"width":4080,"cameraMake":"Google","cameraModel":"Pixel 6","flash":16,"fNumber":1.85,"iso":43,"focalLength":"6.81 mm"}	51dde765-a6de-48c6-b372-41534fb91d55	51dde765-a6de-48c6-b372-41534fb91d55	{"Architecture", "Building", "Castle", "Fortress", "Person", "Ruins", "Animal", "Bird", "Cliff", "Nature", "Outdoors"}	Greece	Attica	Athina	Θεωρίας
9275a4b2-350d-4227-8afc-6f600f2b67e6	1623985724696755	2023-03-14 20:32:22.712036+00	2023-03-14 20:32:22.712036+00	2023-03-14 20:32:22.712036+00	2022-11-20 10:43:28+00	505bc523-53db-4770-b46c-98fd25b336e2	PXL_20221120_114328711.jpg	PXL_20221120_114328711		{38.451325000000004,-9.108113888888889}	all	image/jpeg	{"height":3072,"width":4080,"cameraMake":"Google","cameraModel":"Pixel 6","flash":16,"fNumber":1.85,"iso":46,"focalLength":"6.81 mm"}	51dde765-a6de-48c6-b372-41534fb91d55	51dde765-a6de-48c6-b372-41534fb91d55	{"Outdoors", "Nature", "Promontory", "Water", "Scenery", "Land", "Sea", "Architecture", "Building", "Cityscape", "Urban", "Countryside"}	Portugal	Setúbal	Sesimbra	\N
da84465f-635c-45b2-8247-fd18de6ad212	5333618100540581	2023-03-14 20:32:22.994712+00	2023-03-14 20:32:22.994712+00	2023-03-14 20:32:22.994712+00	2022-11-25 09:07:38+00	7182c27e-8b37-49c3-b4d9-de2622e1ae2d	PXL_20221125_080738588.jpg	PXL_20221125_080738588		{37.9742,23.726594444444444}	all	image/jpeg	{"height":3072,"width":4080,"cameraMake":"Google","cameraModel":"Pixel 6","flash":16,"fNumber":1.85,"iso":43,"focalLength":"6.81 mm"}	51dde765-a6de-48c6-b372-41534fb91d55	51dde765-a6de-48c6-b372-41534fb91d55	\N	Greece	Attica	Athina	Κλεψύδρας
46bd621f-10f2-4e9d-80c9-9b88cf5e791b	4460312258968830	2023-03-14 20:32:23.034603+00	2023-03-14 20:32:23.034603+00	2023-03-14 20:32:23.034603+00	2022-11-25 08:43:09+00	d186c501-23bf-45b3-9f7d-b9ecb728b9f6	PXL_20221125_074309494.jpg	PXL_20221125_074309494		{37.97176944444445,23.727508333333333}	all	image/jpeg	{"height":3072,"width":4080,"cameraMake":"Google","cameraModel":"Pixel 6","flash":16,"fNumber":2.2,"iso":46,"focalLength":"2.35 mm"}	51dde765-a6de-48c6-b372-41534fb91d55	51dde765-a6de-48c6-b372-41534fb91d55	\N	Greece	Attica	Athina	\N
330d3f26-ae0f-4c73-9dd5-17c7905fadfe	5855302542671343	2023-03-14 20:32:23.164913+00	2023-03-14 20:32:23.164913+00	2023-03-14 20:32:23.164913+00	2022-12-07 16:36:02+00	2ffe08c6-82be-4e17-bc45-b9d803ce987c	PXL_20221207_103602575.jpg	PXL_20221207_103602575		{7.572463888888889,99.03434722222222}	all	image/jpeg	{"height":3072,"width":4080,"cameraMake":"Google","cameraModel":"Pixel 6","flash":16,"fNumber":1.85,"iso":56,"focalLength":"6.81 mm"}	51dde765-a6de-48c6-b372-41534fb91d55	51dde765-a6de-48c6-b372-41534fb91d55	\N	Thailand	Krabi	Ko Lanta	\N
79aa049c-6688-4a64-88b9-2a75289899e9	4901858449973440	2023-03-14 20:32:23.166501+00	2023-03-14 20:32:23.166501+00	2023-03-14 20:32:23.166501+00	2022-12-07 16:35:35+00	35b7f0c7-411d-4422-aae0-7e32a60267e8	PXL_20221207_103535310.jpg	PXL_20221207_103535310		{7.572463888888889,99.03434722222222}	all	image/jpeg	{"height":3072,"width":4080,"cameraMake":"Google","cameraModel":"Pixel 6","flash":16,"fNumber":1.85,"iso":38,"focalLength":"6.81 mm"}	51dde765-a6de-48c6-b372-41534fb91d55	51dde765-a6de-48c6-b372-41534fb91d55	\N	Thailand	Krabi	Ko Lanta	\N
2d04942d-0429-4715-90c4-b59333683c29	2565056732463327	2023-03-14 20:32:23.004251+00	2023-03-14 20:32:23.004251+00	2023-03-14 20:32:23.004251+00	2022-11-20 11:33:55+00	85daa79e-7a7d-4dc8-9879-726a1009fafd	PXL_20221120_123355770.jpg	PXL_20221120_123355770		{38.47526388888889,-8.984130555555554}	all	image/jpeg	{"height":3072,"width":4080,"cameraMake":"Google","cameraModel":"Pixel 6","flash":16,"fNumber":2.2,"iso":50,"focalLength":"2.35 mm"}	51dde765-a6de-48c6-b372-41534fb91d55	51dde765-a6de-48c6-b372-41534fb91d55	{"Water", "Waterfront", "Pier", "Port", "Nature", "Outdoors", "Scenery", "Promontory", "Harbor", "Sea", "Lake", "Land", "Transportation", "Vehicle", "Watercraft", "Person", "Car", "Marina", "Architecture", "Building", "Cityscape", "Urban"}	Portugal	Setúbal	São Lourenço	\N
81863430-7c50-4178-8f01-c004eb8beb8f	2650359671420651	2023-03-14 20:32:22.864583+00	2023-03-14 20:32:22.864583+00	2023-03-14 20:32:22.864583+00	2022-11-25 08:48:15+00	24bc8255-27e6-467f-b416-6f4de5d1e3c7	PXL_20221125_074815815.jpg	PXL_20221125_074815815		{37.97217777777778,23.72666111111111}	all	image/jpeg	{"height":3072,"width":4080,"cameraMake":"Google","cameraModel":"Pixel 6","flash":16,"fNumber":1.85,"iso":44,"focalLength":"6.81 mm"}	51dde765-a6de-48c6-b372-41534fb91d55	51dde765-a6de-48c6-b372-41534fb91d55	{"Architecture", "Building", "Prayer", "Shrine", "Temple", "Parthenon", "Person", "Pillar", "Ruins", "12.5+"}	Greece	Attica	Athina	\N
5f269c44-612f-41ea-9785-18416997c743	7423567645249913	2023-03-14 20:32:22.710741+00	2023-03-14 20:32:22.710741+00	2023-03-14 20:32:22.710741+00	2022-11-20 11:49:07+00	ced3db47-069c-41c3-9ab9-eb8592f8c3b1	PXL_20221120_124907116.jpg	PXL_20221120_124907116		{38.47893055555556,-8.981652777777779}	all	image/jpeg	{"height":3072,"width":4080,"cameraMake":"Google","cameraModel":"Pixel 6","flash":16,"fNumber":2.2,"iso":45,"focalLength":"2.35 mm"}	51dde765-a6de-48c6-b372-41534fb91d55	51dde765-a6de-48c6-b372-41534fb91d55	\N	Portugal	Setúbal	São Lourenço	Rua Círio Da Arrábida
9eed9fd5-03b1-488b-95ee-5f410c8ba7ab	1322279074920713	2023-03-14 20:32:22.917401+00	2023-03-14 20:32:22.917401+00	2023-03-14 20:32:22.917401+00	2022-11-25 09:37:19+00	5a4bbdbe-44b5-4f26-b2b9-c1c26736ada2	PXL_20221125_083719452.jpg	PXL_20221125_083719452		{37.978386111111114,23.720594444444444}	all	image/jpeg	{"height":3072,"width":4080,"cameraMake":"Google","cameraModel":"Pixel 6","flash":16,"fNumber":2.2,"iso":43,"focalLength":"2.35 mm"}	51dde765-a6de-48c6-b372-41534fb91d55	51dde765-a6de-48c6-b372-41534fb91d55	\N	Greece	Attica	Athina	Αγίων Ασωμάτων
bb05ea01-73e3-46ac-923f-fd8e8d2ff299	8896435219988559	2023-03-14 20:32:22.949841+00	2023-03-14 20:32:22.949841+00	2023-03-14 20:32:22.949841+00	2022-11-20 10:43:26+00	e2a72076-6310-45d4-802e-4dd45c7f476c	PXL_20221120_114326256.jpg	PXL_20221120_114326256		{38.451325000000004,-9.108113888888889}	all	image/jpeg	{"height":3072,"width":4080,"cameraMake":"Google","cameraModel":"Pixel 6","flash":16,"fNumber":1.85,"iso":44,"focalLength":"6.81 mm"}	51dde765-a6de-48c6-b372-41534fb91d55	51dde765-a6de-48c6-b372-41534fb91d55	\N	Portugal	Setúbal	Sesimbra	\N
6d5bde04-5e56-4851-b67b-244821666c8b	7222035962575356	2023-03-14 20:32:22.723715+00	2023-03-14 20:32:22.723715+00	2023-03-14 20:32:22.723715+00	2022-11-20 12:36:07+00	f10780b2-a3a3-49ea-b145-928aa4cfb9a3	PXL_20221120_133607713.jpg	PXL_20221120_133607713		{38.48999166666667,-8.975061111111112}	all	image/jpeg	{"height":3072,"width":4080,"cameraMake":"Google","cameraModel":"Pixel 6","flash":16,"fNumber":2.2,"iso":51,"focalLength":"2.35 mm"}	51dde765-a6de-48c6-b372-41534fb91d55	51dde765-a6de-48c6-b372-41534fb91d55	{"Nature", "Outdoors", "Sea", "Water", "Promontory", "Land", "Shoreline", "Coast", "Bay"}	Portugal	Setúbal	São Lourenço	En 379-1
0df9d6e5-9cd7-4ce2-bb24-b5d4190186f4	1595054759228029	2023-03-14 20:32:23.054245+00	2023-03-14 20:32:23.054245+00	2023-03-14 20:32:23.054245+00	2022-12-23 17:22:46+00	e71450e9-432f-48cd-b316-c1295d85dfdd	PXL_20221223_112246467.jpg	PXL_20221223_112246467		{7.608202777777778,99.03299444444444}	all	image/jpeg	{"height":3072,"width":4080,"cameraMake":"Google","cameraModel":"Pixel 6","flash":16,"fNumber":1.85,"iso":42,"focalLength":"6.81 mm"}	51dde765-a6de-48c6-b372-41534fb91d55	51dde765-a6de-48c6-b372-41534fb91d55	{"Nature", "Outdoors", "Sky", "Sunset", "Horizon", "Sunlight", "Sunrise", "Cloud", "Person", "Beach", "Coast", "Sea", "Shoreline", "Water"}	Thailand	Krabi	Ko Lanta	\N
8e95a7b5-b510-4fbb-bc2c-e44b34cebfad	8325719112149801	2023-03-14 20:32:23.166256+00	2023-03-14 20:32:23.166256+00	2023-03-14 20:32:23.166256+00	2022-11-20 10:46:13+00	e5b5deb7-c6fa-4c80-bcd3-94fea8158310	PXL_20221120_114613048.jpg	PXL_20221120_114613048		{38.450975,-9.107527777777777}	all	image/jpeg	{"height":3072,"width":4080,"cameraMake":"Google","cameraModel":"Pixel 6","flash":16,"fNumber":2.2,"iso":33,"focalLength":"2.35 mm"}	51dde765-a6de-48c6-b372-41534fb91d55	51dde765-a6de-48c6-b372-41534fb91d55	{"Nature", "Outdoors", "Scenery", "Sky", "Cloud", "Cumulus", "Weather", "Promontory", "Water", "Slope", "Fir", "Plant", "Tree", "Architecture", "Building", "Castle", "Fortress", "Sea"}	Portugal	Setúbal	Sesimbra	Rua Santa Maria Do Castelo
c1868ce0-fced-4705-8b29-08eaa3f2af36	8501399381784099	2023-03-14 20:32:22.94848+00	2023-03-14 20:32:22.94848+00	2023-03-14 20:32:22.94848+00	2022-11-25 08:49:20+00	6da5665e-acc0-487d-94c4-e38d7685a2dc	PXL_20221125_074920621.jpg	PXL_20221125_074920621		{37.97132222222223,23.727177777777776}	all	image/jpeg	{"height":3072,"width":4080,"cameraMake":"Google","cameraModel":"Pixel 6","flash":16,"fNumber":1.85,"iso":45,"focalLength":"6.81 mm"}	51dde765-a6de-48c6-b372-41534fb91d55	51dde765-a6de-48c6-b372-41534fb91d55	{"Architecture", "Building", "Cityscape", "Urban", "City", "Neighborhood", "Outdoors", "Horizon", "Nature", "Sky", "Fir", "Plant", "Tree"}	Greece	Attica	Athina	\N
053aab5b-5366-4fa1-b9ac-7161b6f2dc5a	312675025316885	2023-03-14 20:32:23.00183+00	2023-03-14 20:32:23.00183+00	2023-03-14 20:32:23.00183+00	2022-11-20 12:41:45+00	431da548-a2f5-437a-b9fc-f2e2d9c481aa	PXL_20221120_134145988.jpg	PXL_20221120_134145988		{38.48136111111111,-8.989291666666666}	all	image/jpeg	{"height":3072,"width":4080,"cameraMake":"Google","cameraModel":"Pixel 6","flash":16,"fNumber":2.2,"iso":50,"focalLength":"2.35 mm"}	51dde765-a6de-48c6-b372-41534fb91d55	51dde765-a6de-48c6-b372-41534fb91d55	{"Nature", "Outdoors", "Promontory", "Water", "Countryside", "Hill", "Slope", "Architecture", "Building", "Sea", "Scenery", "Land"}	Portugal	Setúbal	São Lourenço	En 379-1
6ce608e8-a3d7-448a-a173-9bba39b74537	4989211576811667	2023-03-14 20:32:22.914203+00	2023-03-14 20:32:22.914203+00	2023-03-14 20:32:22.914203+00	2022-11-20 10:50:10+00	7efb20c2-a240-4f77-bc8f-4a68a1954e2c	PXL_20221120_115010377.jpg	PXL_20221120_115010377		{38.45153888888889,-9.106588888888888}	all	image/jpeg	{"height":3072,"width":4080,"cameraMake":"Google","cameraModel":"Pixel 6","flash":16,"fNumber":2.2,"iso":52,"focalLength":"2.35 mm"}	51dde765-a6de-48c6-b372-41534fb91d55	51dde765-a6de-48c6-b372-41534fb91d55	{"Architecture", "Building", "Castle", "Fortress"}	Portugal	Setúbal	Sesimbra	\N
d8abed81-e640-4328-85e8-e4a2e2cdcb7c	9006768075852262	2023-03-14 20:32:22.940323+00	2023-03-14 20:32:22.940323+00	2023-03-14 20:32:22.940323+00	2022-11-25 08:35:49+00	b847dad5-b4a3-45e7-8365-a553870e4a65	PXL_20221125_073549020.jpg	PXL_20221125_073549020		{37.971580555555555,23.724825}	all	image/jpeg	{"height":3072,"width":4080,"cameraMake":"Google","cameraModel":"Pixel 6","flash":16,"fNumber":2.2,"iso":46,"focalLength":"2.35 mm"}	51dde765-a6de-48c6-b372-41534fb91d55	51dde765-a6de-48c6-b372-41534fb91d55	{"Architecture", "Building", "Cityscape", "Urban", "Neighborhood", "City", "Outdoors", "Nature", "Sky", "Metropolis", "Horizon", "Scenery"}	Greece	Attica	Athina	\N
f4b6aeab-ee3d-4c00-8d4b-8a78aa20e004	6795935672163456	2023-03-14 20:32:23.049461+00	2023-03-14 20:32:23.049461+00	2023-03-14 20:32:23.049461+00	2022-12-23 17:33:53+00	36421664-c48d-49d1-b8e2-9b7615e93c43	PXL_20221223_113353777.jpg	PXL_20221223_113353777		{7.608352777777777,99.03288333333333}	all	image/jpeg	{"height":3072,"width":4080,"cameraMake":"Google","cameraModel":"Pixel 6","flash":16,"fNumber":1.85,"iso":184,"focalLength":"6.81 mm"}	51dde765-a6de-48c6-b372-41534fb91d55	51dde765-a6de-48c6-b372-41534fb91d55	{"Nature", "Outdoors", "Sky", "Sunset", "Horizon", "Person", "Scenery", "Sunlight", "Sunrise", "Sea", "Water", "Beach", "Coast", "Shoreline", "Cloud"}	Thailand	Krabi	Ko Lanta	\N
c1619be0-f8ba-4473-b12f-30ce74e924b3	8733515708934932	2023-03-14 20:32:23.147822+00	2023-03-14 20:32:23.147822+00	2023-03-14 20:32:23.147822+00	2022-12-23 17:29:45+00	8232ed70-4652-44d8-aeba-73c293c7e008	PXL_20221223_112945095.jpg	PXL_20221223_112945095		{7.60835,99.03288611111111}	all	image/jpeg	{"height":3072,"width":4080,"cameraMake":"Google","cameraModel":"Pixel 6","flash":16,"fNumber":2.2,"iso":106,"focalLength":"2.35 mm"}	51dde765-a6de-48c6-b372-41534fb91d55	51dde765-a6de-48c6-b372-41534fb91d55	{"Nature", "Outdoors", "Sky", "Sunset", "Horizon", "Scenery", "Person", "Sunlight"}	Thailand	Krabi	Ko Lanta	\N
95b6eb9f-3b66-4bbf-8236-8001bf2e78fe	3525916985107251	2023-03-14 20:32:22.993128+00	2023-03-14 20:32:22.993128+00	2023-03-14 20:32:22.993128+00	2022-11-20 11:41:59+00	d6613ac9-9df9-4573-8349-5a9f44ac02c2	PXL_20221120_124159507.jpg	PXL_20221120_124159507		{38.478425,-8.982555555555555}	all	image/jpeg	{"height":3072,"width":4080,"cameraMake":"Google","cameraModel":"Pixel 6","flash":16,"fNumber":1.85,"iso":47,"focalLength":"6.81 mm"}	51dde765-a6de-48c6-b372-41534fb91d55	51dde765-a6de-48c6-b372-41534fb91d55	{"Nature", "Outdoors", "Promontory", "Water", "Summer", "Beach", "Coast", "Sea", "Shoreline", "Scenery", "Land"}	Portugal	Setúbal	São Lourenço	Rua Círio Da Arrábida
80ce1b78-8492-490f-b45f-38da306d6f85	823462439587044	2023-03-14 20:32:22.723807+00	2023-03-14 20:32:22.723807+00	2023-03-14 20:32:22.723807+00	2022-11-25 08:24:39+00	4294a043-522c-4b1d-910b-2d4ac07c414f	PXL_20221125_072439102.jpg	PXL_20221125_072439102		{37.97092777777778,23.724966666666663}	all	image/jpeg	{"height":3072,"width":4080,"cameraMake":"Google","cameraModel":"Pixel 6","flash":16,"fNumber":2.2,"iso":49,"focalLength":"2.35 mm"}	51dde765-a6de-48c6-b372-41534fb91d55	51dde765-a6de-48c6-b372-41534fb91d55	\N	Greece	Attica	Athina	\N
c1a8ed5d-5bb4-4311-bedc-fa7298727d35	5568454738695684	2023-03-14 20:32:22.886753+00	2023-03-14 20:32:22.886753+00	2023-03-14 20:32:22.886753+00	2022-11-20 12:04:11+00	b36df268-b817-498f-a49f-6f76bb58df6a	PXL_20221120_130411726.jpg	PXL_20221120_130411726		{38.48485277777778,-8.964763888888887}	all	image/jpeg	{"height":3072,"width":4080,"cameraMake":"Google","cameraModel":"Pixel 6","flash":16,"fNumber":1.85,"iso":53,"focalLength":"6.81 mm"}	51dde765-a6de-48c6-b372-41534fb91d55	51dde765-a6de-48c6-b372-41534fb91d55	\N	Portugal	Setúbal	São Simão	Rua Círio Da Arrábida
9c7bd25a-2de1-4622-a65e-9c9f328daec8	8367987506645791	2023-03-14 20:32:22.751731+00	2023-03-14 20:32:22.751731+00	2023-03-14 20:32:22.751731+00	2022-11-25 08:38:14+00	c9fdc3a4-0408-4824-8b77-8d2990b875af	PXL_20221125_073814019.jpg	PXL_20221125_073814019		{37.97176666666667,23.725027777777775}	all	image/jpeg	{"height":3072,"width":4080,"cameraMake":"Google","cameraModel":"Pixel 6","flash":16,"fNumber":1.85,"iso":42,"focalLength":"6.81 mm"}	51dde765-a6de-48c6-b372-41534fb91d55	51dde765-a6de-48c6-b372-41534fb91d55	{"Person", "Architecture", "Building", "Ruins", "Prayer", "Shrine", "Temple", "Pillar", "Parthenon", "Rock"}	Greece	Attica	Athina	\N
c6ad500c-0bed-404e-8be4-9307a8b2de67	5598575870543456	2023-03-14 20:32:23.092337+00	2023-03-14 20:32:23.092337+00	2023-03-14 20:32:23.092337+00	2022-12-23 17:06:40+00	cfdcb16f-1edd-4a7e-a5c3-800b829bbc54	PXL_20221223_110640689.jpg	PXL_20221223_110640689		{7.608177777777778,99.03267222222222}	all	image/jpeg	{"height":3072,"width":4080,"cameraMake":"Google","cameraModel":"Pixel 6","flash":16,"fNumber":1.85,"iso":59,"focalLength":"6.81 mm"}	51dde765-a6de-48c6-b372-41534fb91d55	51dde765-a6de-48c6-b372-41534fb91d55	{"Nature", "Outdoors", "Sky", "Sunset", "Sunlight", "Person", "Beach", "Coast", "Sea", "Shoreline", "Water", "Sunrise", "Horizon", "Animal", "Bird"}	Thailand	Krabi	Ko Lanta	\N
5ebbdefe-8b60-43c4-8e97-8e0ad2ea8c35	4594776966987925	2023-03-14 20:32:22.928011+00	2023-03-14 20:32:22.928011+00	2023-03-14 20:32:22.928011+00	2022-12-07 17:13:07+00	8f2e6431-c21b-41ea-b525-c662767a2b89	PXL_20221207_111307275.jpg	PXL_20221207_111307275		{7.572238888888888,99.03369444444444}	all	image/jpeg	{"height":3072,"width":4080,"cameraMake":"Google","cameraModel":"Pixel 6","flash":16,"fNumber":1.85,"iso":42,"focalLength":"6.81 mm"}	51dde765-a6de-48c6-b372-41534fb91d55	51dde765-a6de-48c6-b372-41534fb91d55	{"Wood", "Beach", "Coast", "Nature", "Outdoors", "Sea", "Shoreline", "Water", "Sky", "Summer", "Scenery", "Chair", "Furniture"}	Thailand	Krabi	Ko Lanta	\N
8d00dff5-32f4-4fbc-a23c-b3d097e5e796	6321435754599030	2023-03-14 20:32:22.997116+00	2023-03-14 20:32:22.997116+00	2023-03-14 20:32:22.997116+00	2022-11-20 11:50:07+00	2b7336ca-dcaf-45c4-9104-1d55f1087a3f	PXL_20221120_125007042.jpg	PXL_20221120_125007042		{38.47865,-8.982152777777777}	all	image/jpeg	{"height":3072,"width":4080,"cameraMake":"Google","cameraModel":"Pixel 6","flash":16,"fNumber":1.85,"iso":41,"focalLength":"6.81 mm"}	51dde765-a6de-48c6-b372-41534fb91d55	51dde765-a6de-48c6-b372-41534fb91d55	\N	Portugal	Setúbal	São Lourenço	Rua Círio Da Arrábida
b9ea326e-d2cb-4acf-a8ab-e26b6ccf7383	4359102634969581	2023-03-14 20:32:22.925481+00	2023-03-14 20:32:22.925481+00	2023-03-14 20:32:22.925481+00	2022-11-25 08:36:23+00	a950f60e-fafc-42bc-be47-2ade2817ee0f	PXL_20221125_073623146.jpg	PXL_20221125_073623146		{37.97184166666667,23.724844444444443}	all	image/jpeg	{"height":3072,"width":4080,"cameraMake":"Google","cameraModel":"Pixel 6","flash":16,"fNumber":1.85,"iso":49,"focalLength":"6.81 mm"}	51dde765-a6de-48c6-b372-41534fb91d55	51dde765-a6de-48c6-b372-41534fb91d55	{"Person", "Architecture", "Building", "Ruins", "Prayer", "Shrine", "Temple", "Pillar"}	Greece	Attica	Athina	\N
9734b530-68b1-4919-a9ae-82397a92787c	4816304007874834	2023-03-14 20:32:22.997826+00	2023-03-14 20:32:22.997826+00	2023-03-14 20:32:22.997826+00	2022-11-20 10:51:20+00	3347ccff-d3a9-48a4-825d-537976a34abe	PXL_20221120_115120843.jpg	PXL_20221120_115120843		{38.45254166666667,-9.107019444444443}	all	image/jpeg	{"height":3072,"width":4080,"cameraMake":"Google","cameraModel":"Pixel 6","flash":16,"fNumber":2.2,"iso":45,"focalLength":"2.35 mm"}	51dde765-a6de-48c6-b372-41534fb91d55	51dde765-a6de-48c6-b372-41534fb91d55	{"Nature", "Outdoors", "Sky", "Horizon", "Architecture", "Building", "Cityscape", "Urban", "Countryside"}	Portugal	Setúbal	Sesimbra	\N
7ff3fb66-381f-4b06-a07b-f2eb2a7c1a31	3119981646449572	2023-03-14 20:32:22.725477+00	2023-03-14 20:32:22.725477+00	2023-03-14 20:32:22.725477+00	2022-11-20 12:07:13+00	52d72074-d779-48f4-8b2f-0d76bc6c9a2d	PXL_20221120_130713650.jpg	PXL_20221120_130713650		{38.48475277777778,-8.958288888888887}	all	image/jpeg	{"height":3072,"width":4080,"cameraMake":"Google","cameraModel":"Pixel 6","flash":16,"fNumber":1.85,"iso":44,"focalLength":"6.81 mm"}	51dde765-a6de-48c6-b372-41534fb91d55	51dde765-a6de-48c6-b372-41534fb91d55	\N	Portugal	Setúbal	Setúbal	Rua Círio Da Arrábida
13722eb1-5607-4af7-af20-11ab901ec1ba	8045756335954545	2023-03-14 20:32:22.739868+00	2023-03-14 20:32:22.739868+00	2023-03-14 20:32:22.739868+00	2022-11-20 16:08:16+00	aae683b1-9125-427a-a6cb-98fa797e3a35	PXL_20221120_170816929.jpg	PXL_20221120_170816929		{38.44353333333333,-9.098969444444444}	all	image/jpeg	{"height":3072,"width":4080,"cameraMake":"Google","cameraModel":"Pixel 6","flash":16,"fNumber":1.85,"iso":44,"focalLength":"6.81 mm"}	51dde765-a6de-48c6-b372-41534fb91d55	51dde765-a6de-48c6-b372-41534fb91d55	{"Architecture", "Building", "House", "Housing", "Roof", "Tile Roof", "Person"}	Portugal	Setúbal	Sesimbra	Rua Dos Industriais
576a15f6-0b7b-4669-956d-4168420b395b	5512148975854347	2023-03-14 20:32:22.977296+00	2023-03-14 20:32:22.977296+00	2023-03-14 20:32:22.977296+00	2022-11-25 08:40:54+00	afff3d4f-991f-4518-a1b5-f42265f9728a	PXL_20221125_074054819.jpg	PXL_20221125_074054819		{37.97172777777778,23.725441666666665}	all	image/jpeg	{"height":3072,"width":4080,"cameraMake":"Google","cameraModel":"Pixel 6","flash":16,"fNumber":2.2,"iso":51,"focalLength":"2.35 mm"}	51dde765-a6de-48c6-b372-41534fb91d55	51dde765-a6de-48c6-b372-41534fb91d55	{"Architecture", "Building", "Prayer", "Shrine", "Temple", "Parthenon", "Person", "Pillar", "Ruins"}	Greece	Attica	Athina	\N
d152990b-7c2b-4f14-b2dd-353b6b775a38	6031447353896076	2023-03-14 20:32:22.920135+00	2023-03-14 20:32:22.920135+00	2023-03-14 20:32:22.920135+00	2022-11-25 08:22:58+00	fac7c954-d1cf-40a0-8130-d4d5bc3aa980	PXL_20221125_072258964.jpg	PXL_20221125_072258964		{37.97121666666667,23.724644444444444}	all	image/jpeg	{"height":3072,"width":4080,"cameraMake":"Google","cameraModel":"Pixel 6","flash":16,"fNumber":2.2,"iso":51,"focalLength":"2.35 mm"}	51dde765-a6de-48c6-b372-41534fb91d55	51dde765-a6de-48c6-b372-41534fb91d55	{"Amphitheatre", "Architecture", "Arena", "Building"}	Greece	Attica	Athina	\N
3f21bbf0-cf5f-491a-ac9a-66335170a6b0	7433318008101237	2023-03-14 20:32:23.147594+00	2023-03-14 20:32:23.147594+00	2023-03-14 20:32:23.147594+00	2022-11-20 12:29:00+00	5fda78fc-d58a-4fb2-953b-8097aa5813ab	PXL_20221120_132900635.jpg	PXL_20221120_132900635		{38.50120833333333,-8.938655555555556}	all	image/jpeg	{"height":3072,"width":4080,"cameraMake":"Google","cameraModel":"Pixel 6","flash":16,"fNumber":1.85,"iso":47,"focalLength":"6.81 mm"}	51dde765-a6de-48c6-b372-41534fb91d55	51dde765-a6de-48c6-b372-41534fb91d55	{"Countryside", "Hill", "Nature", "Outdoors", "Sky", "Wilderness", "Scenery", "Slope", "Cloud", "Cumulus", "Weather", "Mountain", "Mountain Range"}	Portugal	Setúbal	Setúbal	En 379-1
f7f8594f-325c-46a4-a25c-a939c8bb76dd	7424381256913929	2023-03-14 20:32:23.036314+00	2023-03-14 20:32:23.036314+00	2023-03-14 20:32:23.036314+00	2022-12-07 16:49:14+00	e6e55877-1383-48a8-b3fb-c9a9edff7e42	PXL_20221207_104914291.jpg	PXL_20221207_104914291		{7.572325,99.03365}	all	image/jpeg	{"height":3072,"width":4080,"cameraMake":"Google","cameraModel":"Pixel 6","flash":16,"fNumber":2.2,"iso":51,"focalLength":"2.35 mm"}	51dde765-a6de-48c6-b372-41534fb91d55	51dde765-a6de-48c6-b372-41534fb91d55	{"Wood", "Summer", "Plant", "Tree", "Nature", "Outdoors", "Sky", "Beach", "Coast", "Sea", "Shoreline", "Water", "Scenery"}	Thailand	Krabi	Ko Lanta	\N
05803ce2-9b85-4954-b789-a364607d2570	5413015212981903	2023-03-14 20:32:22.727531+00	2023-03-14 20:32:22.727531+00	2023-03-14 20:32:22.727531+00	2022-11-19 16:11:21+00	b1cef49f-802a-4ded-bcf3-9fef70101bb9	PXL_20221119_171121826.jpg	PXL_20221119_171121826		{38.443425,-9.09888888888889}	all	image/jpeg	{"height":3072,"width":4080,"cameraMake":"Google","cameraModel":"Pixel 6","flash":16,"fNumber":1.85,"iso":38,"focalLength":"6.81 mm"}	51dde765-a6de-48c6-b372-41534fb91d55	51dde765-a6de-48c6-b372-41534fb91d55	{"Architecture", "Building", "House", "Housing", "Roof", "Tile Roof", "Cityscape", "Urban", "Nature", "Outdoors", "Sky"}	Portugal	Setúbal	Sesimbra	R Dr Manuel De Arriaga
dc017da3-3724-4472-8e58-ed66f3eeb826	1473918768176984	2023-03-14 20:32:22.977453+00	2023-03-14 20:32:22.977453+00	2023-03-14 20:32:22.977453+00	2022-11-25 09:07:33+00	9548c943-35aa-4408-b13f-7c36a4069ffb	PXL_20221125_080733613.jpg	PXL_20221125_080733613		{37.9742,23.726594444444444}	all	image/jpeg	{"height":3072,"width":4080,"cameraMake":"Google","cameraModel":"Pixel 6","flash":16,"fNumber":1.85,"iso":42,"focalLength":"6.81 mm"}	51dde765-a6de-48c6-b372-41534fb91d55	51dde765-a6de-48c6-b372-41534fb91d55	{"Architecture", "Building", "Ruins", "Person", "Fir", "Plant", "Tree", "Graveyard", "Outdoors"}	Greece	Attica	Athina	Κλεψύδρας
d8a4300f-80e8-4347-9828-25177f0a6633	1976909186483012	2023-03-14 20:32:23.04601+00	2023-03-14 20:32:23.04601+00	2023-03-14 20:32:23.04601+00	2022-12-07 17:01:02+00	cc1bb326-2524-499f-b6c1-5cbf42a97ccb	PXL_20221207_110102051.jpg	PXL_20221207_110102051		{7.572325,99.03386944444445}	all	image/jpeg	{"height":3072,"width":4080,"cameraMake":"Google","cameraModel":"Pixel 6","flash":16,"fNumber":1.85,"iso":45,"focalLength":"6.81 mm"}	51dde765-a6de-48c6-b372-41534fb91d55	51dde765-a6de-48c6-b372-41534fb91d55	\N	Thailand	Krabi	Ko Lanta	\N
94055771-4407-412f-aa2b-65d90f17bbec	8663395256881062	2023-03-14 20:32:23.034908+00	2023-03-14 20:32:23.034908+00	2023-03-14 20:32:23.034908+00	2022-11-20 10:44:01+00	6d7299cc-fb72-43c1-95c9-cbb3b50639e1	PXL_20221120_114401524.jpg	PXL_20221120_114401524		{38.450988888888894,-9.107505555555555}	all	image/jpeg	{"height":3072,"width":4080,"cameraMake":"Google","cameraModel":"Pixel 6","flash":16,"fNumber":2.2,"iso":57,"focalLength":"2.35 mm"}	51dde765-a6de-48c6-b372-41534fb91d55	51dde765-a6de-48c6-b372-41534fb91d55	{"Nature", "Outdoors", "Sky", "Cloud", "Cumulus", "Weather", "Scenery", "Promontory", "Water", "Land", "Horizon", "Sea", "Landscape"}	Portugal	Setúbal	Sesimbra	Rua Santa Maria Do Castelo
7d87fcd4-2480-4baf-bf08-142fa8ed1ae2	1140045337488214	2023-03-14 20:32:23.160035+00	2023-03-14 20:32:23.160035+00	2023-03-14 20:32:23.160035+00	2022-11-20 11:35:47+00	94d901aa-1b68-44a4-8967-d35824df0ecf	PXL_20221120_123547044.jpg	PXL_20221120_123547044		{38.475297222222224,-8.984122222222222}	all	image/jpeg	{"height":3072,"width":4080,"cameraMake":"Google","cameraModel":"Pixel 6","flash":16,"fNumber":1.85,"iso":38,"focalLength":"6.81 mm"}	51dde765-a6de-48c6-b372-41534fb91d55	51dde765-a6de-48c6-b372-41534fb91d55	{"Nature", "Outdoors", "Promontory", "Water", "Scenery", "Waterfront", "Flag", "Rubble", "Path", "Walkway", "Sea", "Motorcycle", "Transportation", "Vehicle", "Person", "Road", "restaurante o farol", "restaurante", "o farol"}	Portugal	Setúbal	\N	\N
31b41aba-4ce4-43e3-9b90-85e71a1acb14	7909340033579582	2023-03-14 20:32:22.724103+00	2023-03-14 20:32:22.724103+00	2023-03-14 20:32:22.724103+00	2022-11-20 12:35:54+00	964d62bd-922f-4d14-9628-e55ef61a2c82	PXL_20221120_133554498.jpg	PXL_20221120_133554498		{38.48999166666667,-8.975061111111112}	all	image/jpeg	{"height":3072,"width":4080,"cameraMake":"Google","cameraModel":"Pixel 6","flash":16,"fNumber":1.85,"iso":42,"focalLength":"6.81 mm"}	51dde765-a6de-48c6-b372-41534fb91d55	51dde765-a6de-48c6-b372-41534fb91d55	{"Nature", "Outdoors", "Sea", "Water", "Land", "Shoreline", "Coast", "Promontory"}	Portugal	Setúbal	São Lourenço	En 379-1
6d1e9cc8-8714-4484-a403-4da14cac19e5	8230225140135590	2023-03-14 20:32:22.920305+00	2023-03-14 20:32:22.920305+00	2023-03-14 20:32:22.920305+00	2022-11-25 08:26:21+00	38130cd7-b68c-4a05-af0d-dcd7899fcbf0	PXL_20221125_072621288.jpg	PXL_20221125_072621288		{37.97078055555556,23.726094444444442}	all	image/jpeg	{"height":3072,"width":4080,"cameraMake":"Google","cameraModel":"Pixel 6","flash":16,"fNumber":1.85,"iso":46,"focalLength":"6.81 mm"}	51dde765-a6de-48c6-b372-41534fb91d55	51dde765-a6de-48c6-b372-41534fb91d55	{"Archaeology", "Architecture", "Building", "Ruins", "Slate", "Outdoors"}	Greece	Attica	Athina	\N
0f189014-7f29-42e6-9864-f0f1c6fed25c	1457062378439922	2023-03-14 20:32:22.98219+00	2023-03-14 20:32:22.98219+00	2023-03-14 20:32:22.98219+00	2022-11-25 09:42:27+00	09738c8e-d41e-44e7-b52b-fb47dbd40471	PXL_20221125_084227394.jpg	PXL_20221125_084227394		{37.977872222222224,23.717191666666665}	all	image/jpeg	{"height":3072,"width":4080,"cameraMake":"Google","cameraModel":"Pixel 6","flash":16,"fNumber":1.85,"iso":40,"focalLength":"6.81 mm"}	51dde765-a6de-48c6-b372-41534fb91d55	51dde765-a6de-48c6-b372-41534fb91d55	\N	Greece	Attica	Athina	Ερμού
880a5013-84c3-4834-ace6-c7d86bffa38d	7335648393736937	2023-03-14 20:32:23.012128+00	2023-03-14 20:32:23.012128+00	2023-03-14 20:32:23.012128+00	2022-11-25 08:45:55+00	0ce789d3-50e5-4c68-8be5-993b13541915	PXL_20221125_074555040.jpg	PXL_20221125_074555040		{37.971983333333334,23.727597222222222}	all	image/jpeg	{"height":3072,"width":4080,"cameraMake":"Google","cameraModel":"Pixel 6","flash":16,"fNumber":2.2,"iso":46,"focalLength":"2.35 mm"}	51dde765-a6de-48c6-b372-41534fb91d55	51dde765-a6de-48c6-b372-41534fb91d55	{"Person", "Architecture", "Building", "Prayer", "Shrine", "Temple", "Parthenon", "Pillar", "Clothing", "Footwear", "Shoe"}	Greece	Attica	Athina	\N
e4a39dbf-a958-4712-96c1-109d6f48f0de	5938575439949939	2023-03-14 20:32:22.708516+00	2023-03-14 20:32:22.708516+00	2023-03-14 20:32:22.708516+00	2022-11-20 12:07:05+00	a3b0a703-b5ab-436d-bc6c-9ab977688ee7	PXL_20221120_130705854.jpg	PXL_20221120_130705854		{38.484925000000004,-8.964644444444444}	all	image/jpeg	{"height":3072,"width":4080,"cameraMake":"Google","cameraModel":"Pixel 6","flash":16,"fNumber":1.85,"iso":39,"focalLength":"6.81 mm"}	51dde765-a6de-48c6-b372-41534fb91d55	51dde765-a6de-48c6-b372-41534fb91d55	{"Nature", "Outdoors", "Promontory", "Water", "Sea", "Scenery", "Land", "Shoreline", "Coast", "Road"}	Portugal	Setúbal	São Simão	Rua Círio Da Arrábida
39551190-5f17-4886-a200-5361b4d21117	7328207424238836	2023-03-14 20:32:22.93309+00	2023-03-14 20:32:22.93309+00	2023-03-14 20:32:22.93309+00	2022-12-07 17:17:09+00	07df6986-c485-4a70-812c-dbac0a568ed1	PXL_20221207_111709162.jpg	PXL_20221207_111709162		{7.572238888888888,99.03369444444444}	all	image/jpeg	{"height":3072,"width":4080,"cameraMake":"Google","cameraModel":"Pixel 6","flash":16,"fNumber":2.2,"iso":83,"focalLength":"2.35 mm"}	51dde765-a6de-48c6-b372-41534fb91d55	51dde765-a6de-48c6-b372-41534fb91d55	\N	Thailand	Krabi	Ko Lanta	\N
69cab0f7-d6eb-4a8e-81d2-e3c494e719b2	30550962048572	2023-03-14 20:32:23.158474+00	2023-03-14 20:32:23.158474+00	2023-03-14 20:32:23.158474+00	2022-11-25 09:45:25+00	0b1157a5-5848-4c55-97c0-2c6f58dfba22	PXL_20221125_084525631.jpg	PXL_20221125_084525631		{37.97830833333334,23.717652777777776}	all	image/jpeg	{"height":3072,"width":4080,"cameraMake":"Google","cameraModel":"Pixel 6","flash":16,"fNumber":2.2,"iso":47,"focalLength":"2.35 mm"}	51dde765-a6de-48c6-b372-41534fb91d55	51dde765-a6de-48c6-b372-41534fb91d55	\N	Greece	Attica	Athina	Ερμού
db8a2b90-d4d3-4131-9c40-93b61735a30e	7985912282189521	2023-03-14 20:32:22.727496+00	2023-03-14 20:32:22.727496+00	2023-03-14 20:32:22.727496+00	2022-11-19 16:09:12+00	9678f13a-3332-4f34-9762-2700d026da4a	PXL_20221119_170912571.jpg	PXL_20221119_170912571		{38.443425,-9.09888888888889}	all	image/jpeg	{"height":3072,"width":4080,"cameraMake":"Google","cameraModel":"Pixel 6","flash":16,"fNumber":1.85,"iso":44,"focalLength":"6.81 mm"}	51dde765-a6de-48c6-b372-41534fb91d55	51dde765-a6de-48c6-b372-41534fb91d55	{"Architecture", "Building", "House", "Housing", "Roof", "Tile Roof"}	Portugal	Setúbal	Sesimbra	R Dr Manuel De Arriaga
74000313-5dac-4c9c-b0c0-15039f4646d6	2951015591897253	2023-03-14 20:32:22.968377+00	2023-03-14 20:32:22.968377+00	2023-03-14 20:32:22.968377+00	2022-11-25 08:34:59+00	bd66a07a-1d9d-40f3-9f5e-b0663c0401bd	PXL_20221125_073459561.jpg	PXL_20221125_073459561		{37.97065,23.727294444444443}	all	image/jpeg	{"height":3072,"width":4080,"cameraMake":"Google","cameraModel":"Pixel 6","flash":16,"fNumber":1.85,"iso":39,"focalLength":"6.81 mm"}	51dde765-a6de-48c6-b372-41534fb91d55	51dde765-a6de-48c6-b372-41534fb91d55	{"Path", "Walkway", "Archaeology", "Architecture", "Building", "Cityscape", "Urban", "Flagstone", "Person", "Clothing", "Footwear", "Shoe", "City", "Wall", "Outdoors", "Hat", "Castle", "Fortress"}	Greece	Attica	Athina	\N
22fac9fe-1c4a-4217-a444-9840c4b9cb1a	589179987899490	2023-03-14 20:32:23.04969+00	2023-03-14 20:32:23.04969+00	2023-03-14 20:32:23.04969+00	2022-11-25 08:41:43+00	1535a3e0-fdca-4e0d-9e72-cd434a5d6653	PXL_20221125_074143157.jpg	PXL_20221125_074143157		{37.971725,23.727152777777775}	all	image/jpeg	{"height":3072,"width":4080,"cameraMake":"Google","cameraModel":"Pixel 6","flash":16,"fNumber":1.85,"iso":37,"focalLength":"6.81 mm"}	51dde765-a6de-48c6-b372-41534fb91d55	51dde765-a6de-48c6-b372-41534fb91d55	{"Architecture", "Building", "Prayer", "Shrine", "Temple", "Parthenon", "Person", "Pillar", "Accessories", "Bag", "Handbag"}	Greece	Attica	Athina	\N
3e12716f-e0d8-461e-accc-bfa685f0691c	3644789673889558	2023-03-14 20:32:22.708714+00	2023-03-14 20:32:22.708714+00	2023-03-14 20:32:22.708714+00	2022-11-19 16:14:15+00	b389a344-25ff-45a0-800c-3bd786fad50f	PXL_20221119_171415162.jpg	PXL_20221119_171415162		{38.44343055555555,-9.0989}	all	image/jpeg	{"height":3072,"width":4080,"cameraMake":"Google","cameraModel":"Pixel 6","flash":16,"fNumber":1.85,"iso":44,"focalLength":"6.81 mm"}	51dde765-a6de-48c6-b372-41534fb91d55	51dde765-a6de-48c6-b372-41534fb91d55	{"Architecture", "Building", "House", "Housing", "Roof", "Boat", "Transportation", "Vehicle", "Tile Roof", "Person"}	Portugal	Setúbal	Sesimbra	R Dr Manuel De Arriaga
73862c50-14a5-4af7-882e-685f787938d1	3281666504811166	2023-03-14 20:32:22.971759+00	2023-03-14 20:32:22.971759+00	2023-03-14 20:32:22.971759+00	2022-11-25 08:40:53+00	ef0b35b3-b62e-458a-9566-72a0f7a7086a	PXL_20221125_074053658.jpg	PXL_20221125_074053658		{37.97172777777778,23.725441666666665}	all	image/jpeg	{"height":3072,"width":4080,"cameraMake":"Google","cameraModel":"Pixel 6","flash":16,"fNumber":2.2,"iso":50,"focalLength":"2.35 mm"}	51dde765-a6de-48c6-b372-41534fb91d55	51dde765-a6de-48c6-b372-41534fb91d55	{"Architecture", "Building", "Prayer", "Shrine", "Temple", "Parthenon", "Person", "Pillar"}	Greece	Attica	Athina	\N
46f4735e-3f16-4d18-8120-68857286eda7	8251330654252682	2023-03-14 20:32:23.031256+00	2023-03-14 20:32:23.031256+00	2023-03-14 20:32:23.031256+00	2022-11-20 10:52:46+00	42f23e0c-3a4b-4421-a707-cff2f0678fe2	PXL_20221120_115246320.jpg	PXL_20221120_115246320		{38.45256944444445,-9.107030555555555}	all	image/jpeg	{"height":3072,"width":4080,"cameraMake":"Google","cameraModel":"Pixel 6","flash":16,"fNumber":1.85,"iso":41,"focalLength":"6.81 mm"}	51dde765-a6de-48c6-b372-41534fb91d55	51dde765-a6de-48c6-b372-41534fb91d55	\N	Portugal	Setúbal	Sesimbra	\N
66fcca20-2666-4281-bce7-3114941961ce	1301999992291539	2023-03-14 20:32:23.096197+00	2023-03-14 20:32:23.096197+00	2023-03-14 20:32:23.096197+00	2022-11-25 08:43:00+00	2c2f1176-a976-46d4-885a-90fd5e443a3f	PXL_20221125_074300030.jpg	PXL_20221125_074300030		{37.97176944444445,23.727508333333333}	all	image/jpeg	{"height":3072,"width":4080,"cameraMake":"Google","cameraModel":"Pixel 6","flash":16,"fNumber":1.85,"iso":38,"focalLength":"6.81 mm"}	51dde765-a6de-48c6-b372-41534fb91d55	51dde765-a6de-48c6-b372-41534fb91d55	\N	Greece	Attica	Athina	\N
80d6c492-6e2a-4a34-acd2-e11b85ce4d2f	3244530533094706	2023-03-14 20:32:22.975978+00	2023-03-14 20:32:22.975978+00	2023-03-14 20:32:22.975978+00	2022-11-25 08:34:53+00	a3f1b86a-b09a-4961-bdd5-216918889f99	PXL_20221125_073453764.jpg	PXL_20221125_073453764		{37.97065,23.727294444444443}	all	image/jpeg	{"height":3072,"width":4080,"cameraMake":"Google","cameraModel":"Pixel 6","flash":16,"fNumber":2.2,"iso":47,"focalLength":"2.35 mm"}	51dde765-a6de-48c6-b372-41534fb91d55	51dde765-a6de-48c6-b372-41534fb91d55	{"Person", "Clothing", "Footwear", "Shoe", "Accessories", "Bag", "Handbag"}	Greece	Attica	Athina	\N
4d4bfabe-3d18-4d41-bfca-b7022465ce11	6527288664765493	2023-03-14 20:32:22.711815+00	2023-03-14 20:32:22.711815+00	2023-03-14 20:32:22.711815+00	2022-11-20 10:43:24+00	f6686374-ed54-4f3b-8f2c-75a7a7e0e431	PXL_20221120_114324640.jpg	PXL_20221120_114324640		{38.451325000000004,-9.108113888888889}	all	image/jpeg	{"height":3072,"width":4080,"cameraMake":"Google","cameraModel":"Pixel 6","flash":16,"fNumber":1.85,"iso":44,"focalLength":"6.81 mm"}	51dde765-a6de-48c6-b372-41534fb91d55	51dde765-a6de-48c6-b372-41534fb91d55	{"Outdoors", "Nature", "Promontory", "Water", "Countryside", "Scenery", "Land", "Architecture", "Building"}	Portugal	Setúbal	Sesimbra	\N
e1ebb99a-6471-4db4-80c1-7fabd2eca7bf	8630447296963368	2023-03-14 20:32:22.75284+00	2023-03-14 20:32:22.75284+00	2023-03-14 20:32:22.75284+00	2022-11-25 08:37:30+00	c92ff12c-5175-4008-a3ae-300fb9c64271	PXL_20221125_073730070.jpg	PXL_20221125_073730070		{37.97176666666667,23.725027777777775}	all	image/jpeg	{"height":3072,"width":4080,"cameraMake":"Google","cameraModel":"Pixel 6","flash":16,"fNumber":2.2,"iso":51,"focalLength":"2.35 mm"}	51dde765-a6de-48c6-b372-41534fb91d55	51dde765-a6de-48c6-b372-41534fb91d55	{"Architecture", "Building", "Prayer", "Shrine", "Temple", "Person", "Clothing", "Footwear", "Shoe", "Parthenon", "Pillar", "Accessories", "Bag", "Handbag", "Head"}	Greece	Attica	Athina	\N
6ab4ef73-ffb9-47a9-b5da-5d7982b17c96	8861886361293255	2023-03-14 20:32:22.988467+00	2023-03-14 20:32:22.988467+00	2023-03-14 20:32:22.988467+00	2022-12-07 17:04:47+00	70dc4ab4-c1f6-4c64-8154-a78d7802db81	PXL_20221207_110447620.jpg	PXL_20221207_110447620		{7.572258333333333,99.03369722222222}	all	image/jpeg	{"height":3072,"width":4080,"cameraMake":"Google","cameraModel":"Pixel 6","flash":16,"fNumber":1.85,"iso":27,"focalLength":"6.81 mm"}	51dde765-a6de-48c6-b372-41534fb91d55	51dde765-a6de-48c6-b372-41534fb91d55	{"Wood", "Summer", "Plywood", "Outdoors", "Nature", "Architecture", "Building", "Hotel", "Resort", "Person", "Shelter", "Sea", "Water", "Beach", "Coast", "Shoreline", "Bench", "Furniture", "House", "Housing", "Porch", "Scenery", "Sky"}	Thailand	Krabi	Ko Lanta	\N
16472155-e18a-4428-9fec-7a86e79c0a0c	8364612252173035	2023-03-14 20:32:22.726477+00	2023-03-14 20:32:22.726477+00	2023-03-14 20:32:22.726477+00	2022-11-20 12:29:10+00	93f889e9-bde7-494e-823b-135e4ce994cc	PXL_20221120_132910326.jpg	PXL_20221120_132910326		{38.49420833333333,-8.966827777777779}	all	image/jpeg	{"height":3072,"width":4080,"cameraMake":"Google","cameraModel":"Pixel 6","flash":16,"fNumber":2.2,"iso":57,"focalLength":"2.35 mm"}	51dde765-a6de-48c6-b372-41534fb91d55	51dde765-a6de-48c6-b372-41534fb91d55	{"Nature", "Outdoors", "Sky", "Cloud", "Cumulus", "Weather", "Azure Sky", "Horizon", "Plateau", "Scenery"}	Portugal	Setúbal	São Simão	En 379-1
246bd204-4fd1-40fc-9c04-06435858d098	1308615210664991	2023-03-14 20:32:22.983475+00	2023-03-14 20:32:22.983475+00	2023-03-14 20:32:22.983475+00	2022-11-25 09:08:55+00	53659d71-4426-44e3-9d45-17c61fb19c7f	PXL_20221125_080855624.jpg	PXL_20221125_080855624		{37.97439444444445,23.727038888888888}	all	image/jpeg	{"height":3072,"width":4080,"cameraMake":"Google","cameraModel":"Pixel 6","flash":16,"fNumber":1.85,"iso":35,"focalLength":"6.81 mm"}	51dde765-a6de-48c6-b372-41534fb91d55	51dde765-a6de-48c6-b372-41534fb91d55	\N	Greece	Attica	Athina	Πελοπίδα
ce5c0eac-9a37-40ff-8c86-074ea7466859	6006961356767797	2023-03-14 20:32:22.765127+00	2023-03-14 20:32:22.765127+00	2023-03-14 20:32:22.765127+00	2022-11-25 09:06:25+00	abcad369-494e-4141-b431-9ae8b3335cf5	PXL_20221125_080625987.jpg	PXL_20221125_080625987		{37.97463611111111,23.725494444444443}	all	image/jpeg	{"height":3072,"width":4080,"cameraMake":"Google","cameraModel":"Pixel 6","flash":16,"fNumber":1.85,"iso":48,"focalLength":"6.81 mm"}	51dde765-a6de-48c6-b372-41534fb91d55	51dde765-a6de-48c6-b372-41534fb91d55	{"Architecture", "Building", "Ruins", "Person", "Fir", "Plant", "Tree", "Car", "Transportation", "Vehicle", "Clothing", "Footwear", "Shoe", "Temple", "Prayer", "Shrine", "Pillar"}	Greece	Attica	Athina	Επαμεινώνδα
5c778a62-d9c4-4cdd-b386-e9e90a28d679	104429689482976	2023-03-14 20:32:23.006142+00	2023-03-14 20:32:23.006142+00	2023-03-14 20:32:23.006142+00	2022-11-25 08:44:17+00	53510391-91b0-4bd7-b9c9-30b679d3ef31	PXL_20221125_074417158.jpg	PXL_20221125_074417158		{37.97182222222222,23.72798333333333}	all	image/jpeg	{"height":3072,"width":4080,"cameraMake":"Google","cameraModel":"Pixel 6","flash":16,"fNumber":2.2,"iso":46,"focalLength":"2.35 mm"}	51dde765-a6de-48c6-b372-41534fb91d55	51dde765-a6de-48c6-b372-41534fb91d55	{"Architecture", "Building", "Cityscape", "Urban", "Neighborhood", "Nature", "Outdoors", "Sky", "City", "Metropolis", "Horizon"}	Greece	Attica	Athina	\N
09767849-846b-4715-9054-73e3d0f28a5b	7458620955452088	2023-03-14 20:32:23.164341+00	2023-03-14 20:32:23.164341+00	2023-03-14 20:32:23.164341+00	2022-11-20 10:51:16+00	29357c9b-d583-4336-b4f8-489acfbabff0	PXL_20221120_115116968.jpg	PXL_20221120_115116968		{38.45254166666667,-9.107019444444443}	all	image/jpeg	{"height":3072,"width":4080,"cameraMake":"Google","cameraModel":"Pixel 6","flash":16,"fNumber":1.85,"iso":39,"focalLength":"6.81 mm"}	51dde765-a6de-48c6-b372-41534fb91d55	51dde765-a6de-48c6-b372-41534fb91d55	{"Nature", "Outdoors", "Sky", "Architecture", "Building", "Cityscape", "Urban", "Horizon", "Neighborhood", "Cloud", "Cumulus", "Weather", "City"}	Portugal	Setúbal	Sesimbra	\N
7fbbbc67-84c0-4cb6-81e0-2a248c3d9153	4719680844323746	2023-03-14 20:32:23.367699+00	2023-03-14 20:32:23.367699+00	2023-03-14 20:32:23.367699+00	2022-11-19 16:09:23+00	1018026f-62fe-466d-ba6b-fb33b8f20659	PXL_20221119_170923401.jpg	PXL_20221119_170923401		{38.443425,-9.09888888888889}	all	image/jpeg	{"height":3072,"width":4080,"cameraMake":"Google","cameraModel":"Pixel 6","flash":16,"fNumber":1.85,"iso":43,"focalLength":"6.81 mm"}	51dde765-a6de-48c6-b372-41534fb91d55	51dde765-a6de-48c6-b372-41534fb91d55	{"Architecture", "Building", "House", "Housing", "Roof", "Nature", "Outdoors", "Sky", "Tile Roof", "Boat", "Transportation", "Vehicle"}	Portugal	Setúbal	Sesimbra	R Dr Manuel De Arriaga
8e1cc00e-fc30-4a08-ad1c-1b6545b3f4a8	252052960717297	2023-03-14 20:32:23.42322+00	2023-03-14 20:32:23.42322+00	2023-03-14 20:32:23.42322+00	2022-11-20 11:39:01+00	55094216-a1c5-4afa-ae43-1dc618cdb2a7	PXL_20221120_123901138.jpg	PXL_20221120_123901138		{38.47806388888889,-8.982952777777777}	all	image/jpeg	{"height":3072,"width":4080,"cameraMake":"Google","cameraModel":"Pixel 6","flash":16,"fNumber":1.85,"iso":49,"focalLength":"6.81 mm"}	51dde765-a6de-48c6-b372-41534fb91d55	51dde765-a6de-48c6-b372-41534fb91d55	{"Nature", "Outdoors", "Promontory", "Water", "Rock", "Sea", "Scenery", "Land", "Beach", "Coast", "Shoreline", "Cliff", "Sky", "Landscape"}	Portugal	Setúbal	São Lourenço	Rua Círio Da Arrábida
2cc36219-41db-40a9-bb1d-fc97fd139715	6904649184436486	2023-03-14 20:32:22.743831+00	2023-03-14 20:32:22.743831+00	2023-03-14 20:32:22.743831+00	2022-11-25 08:27:58+00	982d4c34-883d-4bd3-a27a-f7c7fd6eb45d	PXL_20221125_072758277.jpg	PXL_20221125_072758277		{37.970683333333334,23.726699999999997}	all	image/jpeg	{"height":3072,"width":4080,"cameraMake":"Google","cameraModel":"Pixel 6","flash":16,"fNumber":1.85,"iso":38,"focalLength":"6.81 mm"}	51dde765-a6de-48c6-b372-41534fb91d55	51dde765-a6de-48c6-b372-41534fb91d55	{"Fir", "Plant", "Tree", "Nature", "Outdoors", "Plateau", "Wilderness", "Scenery", "Sky", "Person", "Mountain", "Mountain Range"}	Greece	Attica	Athina	\N
207ae6bf-b563-4efd-be08-bcfbe5f21d1f	1541128559595231	2023-03-14 20:32:23.00695+00	2023-03-14 20:32:23.00695+00	2023-03-14 20:32:23.00695+00	2022-11-25 08:44:10+00	d1e090d3-4a4e-4f9a-bf73-18ff354eec12	PXL_20221125_074410508.jpg	PXL_20221125_074410508		{37.97182222222222,23.72798333333333}	all	image/jpeg	{"height":3072,"width":4080,"cameraMake":"Google","cameraModel":"Pixel 6","flash":16,"fNumber":1.85,"iso":39,"focalLength":"6.81 mm"}	51dde765-a6de-48c6-b372-41534fb91d55	51dde765-a6de-48c6-b372-41534fb91d55	\N	Greece	Attica	Athina	\N
e6257bfb-2f5f-4229-874d-544f109b12f4	3327322571197117	2023-03-14 20:32:23.49326+00	2023-03-14 20:32:23.49326+00	2023-03-14 20:32:23.49326+00	2022-11-25 08:49:33+00	964af95f-3986-491c-a956-bc3a08167427	PXL_20221125_074933814.jpg	PXL_20221125_074933814		{37.97132222222223,23.727177777777776}	all	image/jpeg	{"height":3072,"width":4080,"cameraMake":"Google","cameraModel":"Pixel 6","flash":16,"fNumber":2.2,"iso":49,"focalLength":"2.35 mm"}	51dde765-a6de-48c6-b372-41534fb91d55	51dde765-a6de-48c6-b372-41534fb91d55	\N	Greece	Attica	Athina	\N
d578e91d-16e5-4061-b2a2-2e8fef1143d0	2731405634330822	2023-03-14 20:32:23.509458+00	2023-03-14 20:32:23.509458+00	2023-03-14 20:32:23.509458+00	2022-11-25 08:51:25+00	667719f1-3cb5-46fa-adea-313e1ccc2fb7	PXL_20221125_075125605.jpg	PXL_20221125_075125605		{37.97114166666667,23.72638611111111}	all	image/jpeg	{"height":3072,"width":4080,"cameraMake":"Google","cameraModel":"Pixel 6","flash":16,"fNumber":1.85,"iso":44,"focalLength":"6.81 mm"}	51dde765-a6de-48c6-b372-41534fb91d55	51dde765-a6de-48c6-b372-41534fb91d55	\N	Greece	Attica	Athina	\N
5441c7f2-8b03-4460-815a-98e3e2baa308	4712277261998867	2023-03-14 20:32:23.890372+00	2023-03-14 20:32:23.890372+00	2023-03-14 20:32:23.890372+00	2022-11-20 11:40:06+00	df4ccb87-2908-43cf-8643-56f9498aba11	PXL_20221120_124006327.jpg	PXL_20221120_124006327		{38.478369444444446,-8.982641666666666}	all	image/jpeg	{"height":3072,"width":4080,"cameraMake":"Google","cameraModel":"Pixel 6","flash":16,"fNumber":1.85,"iso":44,"focalLength":"6.81 mm"}	51dde765-a6de-48c6-b372-41534fb91d55	51dde765-a6de-48c6-b372-41534fb91d55	\N	Portugal	Setúbal	São Lourenço	Rua Círio Da Arrábida
6a88f2ef-725e-466c-a176-97bce493ce32	2075615603041522	2023-03-14 20:32:22.765211+00	2023-03-14 20:32:22.765211+00	2023-03-14 20:32:22.765211+00	2022-11-25 08:50:35+00	84fdd466-f177-4f05-9f54-9abd91e5a86c	PXL_20221125_075035569.jpg	PXL_20221125_075035569		{37.97114166666667,23.72638611111111}	all	image/jpeg	{"height":3072,"width":4080,"cameraMake":"Google","cameraModel":"Pixel 6","flash":16,"fNumber":2.2,"iso":51,"focalLength":"2.35 mm"}	51dde765-a6de-48c6-b372-41534fb91d55	51dde765-a6de-48c6-b372-41534fb91d55	{"Architecture", "Building", "Prayer", "Shrine", "Temple", "Parthenon", "Person", "Pillar", "1150"}	Greece	Attica	Athina	\N
72e8368b-4abd-4dab-9409-30432f6b041d	3051960004230797	2023-03-14 20:32:23.000987+00	2023-03-14 20:32:23.000987+00	2023-03-14 20:32:23.000987+00	2022-11-25 09:42:24+00	157d2e3f-500b-423e-ad73-b03697b57b55	PXL_20221125_084224102.jpg	PXL_20221125_084224102		{37.977872222222224,23.717191666666665}	all	image/jpeg	{"height":3072,"width":4080,"cameraMake":"Google","cameraModel":"Pixel 6","flash":16,"fNumber":1.85,"iso":42,"focalLength":"6.81 mm"}	51dde765-a6de-48c6-b372-41534fb91d55	51dde765-a6de-48c6-b372-41534fb91d55	\N	Greece	Attica	Athina	Ερμού
afe575b5-2539-4cb6-97b7-bfaeaa454d47	6381444228157325	2023-03-14 20:32:23.180421+00	2023-03-14 20:32:23.180421+00	2023-03-14 20:32:23.180421+00	2022-12-07 16:48:46+00	43a7f4e3-e765-4dfd-8968-b9c103c753e3	PXL_20221207_104846736.jpg	PXL_20221207_104846736		{7.572330555555555,99.03387777777778}	all	image/jpeg	{"height":3072,"width":4080,"cameraMake":"Google","cameraModel":"Pixel 6","flash":16,"fNumber":1.85,"iso":45,"focalLength":"6.81 mm"}	51dde765-a6de-48c6-b372-41534fb91d55	51dde765-a6de-48c6-b372-41534fb91d55	\N	Thailand	Krabi	Ko Lanta	\N
130c2ba3-9879-46e9-a82b-6c47fb5b27f8	3065742801878929	2023-03-14 20:32:23.000854+00	2023-03-14 20:32:23.000854+00	2023-03-14 20:32:23.000854+00	2022-11-20 11:32:56+00	6ae3430e-5aa7-43d9-8792-19e18a597f47	PXL_20221120_123256451.jpg	PXL_20221120_123256451		{38.47526388888889,-8.984130555555554}	all	image/jpeg	{"height":3072,"width":4080,"cameraMake":"Google","cameraModel":"Pixel 6","flash":16,"fNumber":1.85,"iso":39,"focalLength":"6.81 mm"}	51dde765-a6de-48c6-b372-41534fb91d55	51dde765-a6de-48c6-b372-41534fb91d55	\N	Portugal	Setúbal	São Lourenço	\N
eb4af731-52d4-428d-b482-b6bba8e9b086	1202149734973591	2023-03-14 20:32:22.727522+00	2023-03-14 20:32:22.727522+00	2023-03-14 20:32:22.727522+00	2022-11-19 16:11:15+00	60d0a726-c597-4fab-beff-0749cc6319af	PXL_20221119_171115090.jpg	PXL_20221119_171115090		{38.443425,-9.09888888888889}	all	image/jpeg	{"height":3072,"width":4080,"cameraMake":"Google","cameraModel":"Pixel 6","flash":16,"fNumber":2.2,"iso":48,"focalLength":"2.35 mm"}	51dde765-a6de-48c6-b372-41534fb91d55	51dde765-a6de-48c6-b372-41534fb91d55	{"Architecture", "Building", "House", "Housing", "Roof", "Tile Roof", "Cityscape", "Urban"}	Portugal	Setúbal	Sesimbra	R Dr Manuel De Arriaga
9edb5d7f-0bb2-452b-8b2a-7606f338e815	7900444035633978	2023-03-14 20:32:23.100368+00	2023-03-14 20:32:23.100368+00	2023-03-14 20:32:23.100368+00	2022-12-23 17:04:45+00	29f3a311-12df-4831-bd65-92d515f7a009	PXL_20221223_110445455.jpg	PXL_20221223_110445455		{7.608219444444444,99.03264444444444}	all	image/jpeg	{"height":3072,"width":4080,"cameraMake":"Google","cameraModel":"Pixel 6","flash":16,"fNumber":2.2,"iso":52,"focalLength":"2.35 mm"}	51dde765-a6de-48c6-b372-41534fb91d55	51dde765-a6de-48c6-b372-41534fb91d55	{"Nature", "Outdoors", "Sky", "Sunset", "Sunlight", "Beach", "Coast", "Sea", "Shoreline", "Water", "Person", "Sunrise", "Horizon"}	Thailand	Krabi	Ko Lanta	\N
d9f3b88a-610d-4de1-b2d7-651e11ed6b5d	8207714429167222	2023-03-14 20:32:23.016146+00	2023-03-14 20:32:23.016146+00	2023-03-14 20:32:23.016146+00	2022-11-20 10:53:13+00	b75c91d1-923c-4681-a1a7-39d32252bba7	PXL_20221120_115313538.jpg	PXL_20221120_115313538		{38.45263333333334,-9.106927777777777}	all	image/jpeg	{"height":3072,"width":4080,"cameraMake":"Google","cameraModel":"Pixel 6","flash":16,"fNumber":2.2,"iso":52,"focalLength":"2.35 mm"}	51dde765-a6de-48c6-b372-41534fb91d55	51dde765-a6de-48c6-b372-41534fb91d55	{"Architecture", "Building", "Castle", "Fortress"}	Portugal	Setúbal	Sesimbra	Rua Santa Maria Do Castelo
5263a2f0-0f23-415d-9569-97de15a29b3c	5110767957217142	2023-03-14 20:32:22.740616+00	2023-03-14 20:32:22.740616+00	2023-03-14 20:32:22.740616+00	2022-11-25 08:20:49+00	02a456ea-5423-414d-b7e9-0d5043b810ce	PXL_20221125_072049695.jpg	PXL_20221125_072049695		{37.97159444444445,23.723927777777774}	all	image/jpeg	{"height":3072,"width":4080,"cameraMake":"Google","cameraModel":"Pixel 6","flash":16,"fNumber":2.2,"iso":51,"focalLength":"2.35 mm"}	51dde765-a6de-48c6-b372-41534fb91d55	51dde765-a6de-48c6-b372-41534fb91d55	{"Amphitheatre", "Architecture", "Arena", "Building", "Castle", "Fortress"}	Greece	Attica	Athina	Θεωρίας
f2c1af18-eae1-4ff3-ae92-f79247487068	7631908407974524	2023-03-14 20:32:22.72687+00	2023-03-14 20:32:22.72687+00	2023-03-14 20:32:22.72687+00	2022-11-20 12:31:54+00	546c4c9c-4d1b-4ead-bab9-4a3bd086df65	PXL_20221120_133154127.jpg	PXL_20221120_133154127		{38.49412777777778,-8.966816666666666}	all	image/jpeg	{"height":3072,"width":4080,"cameraMake":"Google","cameraModel":"Pixel 6","flash":16,"fNumber":1.85,"iso":50,"focalLength":"6.81 mm"}	51dde765-a6de-48c6-b372-41534fb91d55	51dde765-a6de-48c6-b372-41534fb91d55	{"Nature", "Outdoors", "Promontory", "Water", "Land", "Sea", "Sky", "Scenery", "Shoreline", "Coast"}	Portugal	Setúbal	São Simão	En 379-1
3898c6ef-8440-4bde-9c7e-893c43f331bb	7866792378202981	2023-03-14 20:32:23.026354+00	2023-03-14 20:32:23.026354+00	2023-03-14 20:32:23.026354+00	2022-11-20 10:52:49+00	d3d5c87d-8ad5-478d-ae27-1d28b1981f25	PXL_20221120_115249095.jpg	PXL_20221120_115249095		{38.45256944444445,-9.107030555555555}	all	image/jpeg	{"height":3072,"width":4080,"cameraMake":"Google","cameraModel":"Pixel 6","flash":16,"fNumber":1.85,"iso":44,"focalLength":"6.81 mm"}	51dde765-a6de-48c6-b372-41534fb91d55	51dde765-a6de-48c6-b372-41534fb91d55	{"Summer", "Nature", "Outdoors", "Scenery", "Sky", "Fir", "Plant", "Tree", "Cloud", "Cumulus", "Weather", "Path", "Grass", "Vegetation"}	Portugal	Setúbal	Sesimbra	\N
0ef17bcb-dda0-4e5d-92ea-2fffa889a003	7305339643117307	2023-03-14 20:32:23.057438+00	2023-03-14 20:32:23.057438+00	2023-03-14 20:32:23.057438+00	2022-12-23 17:28:28+00	6bc6d5c4-3338-499b-a872-5a3352de7921	PXL_20221223_112828166.jpg	PXL_20221223_112828166		{7.608383333333333,99.032925}	archived	image/jpeg	{"height":3072,"width":4080,"cameraMake":"Google","cameraModel":"Pixel 6","flash":16,"fNumber":2.2,"iso":71,"focalLength":"2.35 mm"}	51dde765-a6de-48c6-b372-41534fb91d55	51dde765-a6de-48c6-b372-41534fb91d55	{"Nature", "Outdoors", "Sky", "Sunset", "Horizon", "Sunlight", "Scenery", "Person", "Sunrise"}	Thailand	Krabi	Ko Lanta	\N
b8e1ed16-3e79-4dcf-9bfb-9a88616a3e1e	9001299508817580	2023-03-14 20:32:23.055646+00	2023-03-14 20:32:23.055646+00	2023-03-14 20:32:23.055646+00	2022-12-23 17:26:20+00	c6ec4f60-3529-494c-af77-263c4a5ee910	PXL_20221223_112620693.jpg	PXL_20221223_112620693		{7.6083944444444445,99.03283888888889}	archived	image/jpeg	{"height":3072,"width":4080,"cameraMake":"Google","cameraModel":"Pixel 6","flash":16,"fNumber":1.85,"iso":86,"focalLength":"6.81 mm"}	51dde765-a6de-48c6-b372-41534fb91d55	51dde765-a6de-48c6-b372-41534fb91d55	{"Nature", "Outdoors", "Sky", "Horizon", "Sunset", "Person", "Scenery", "Cloud", "Sea", "Water", "Sunrise", "Clothing", "Footwear", "Shoe", "Beach", "Coast", "Shoreline", "Sunlight"}	Thailand	Krabi	Ko Lanta	\N
0002b987-2c93-40f4-8b21-6e4d7207b385	6934407696472599	2023-03-14 20:32:23.048921+00	2023-03-14 20:32:23.048921+00	2023-03-14 20:32:23.048921+00	2022-12-23 17:24:34+00	a0710ae4-f9ef-4440-a985-32d0592487ff	PXL_20221223_112434261.jpg	PXL_20221223_112434261		{7.608225,99.03295277777778}	archived	image/jpeg	{"height":3072,"width":4080,"cameraMake":"Google","cameraModel":"Pixel 6","flash":16,"fNumber":2.2,"iso":50,"focalLength":"2.35 mm"}	51dde765-a6de-48c6-b372-41534fb91d55	51dde765-a6de-48c6-b372-41534fb91d55	{"Nature", "Outdoors", "Sky", "Sunset", "Horizon", "Scenery", "Boat", "Transportation", "Vehicle", "Sunlight", "Beach", "Coast", "Sea", "Shoreline", "Water", "Person", "Sunrise"}	Thailand	Krabi	Ko Lanta	\N
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: stefanbaumeler
--

COPY public."User" (id, date_created, date_modified, mail, password, first_name, last_name) FROM stdin;
51dde765-a6de-48c6-b372-41534fb91d55	2022-11-10 23:00:00+00	2022-11-10 23:00:00+00	test@test.com	$argon2id$v=19$m=65536,t=3,p=4$jIw2VMLJrnHEUw8yMW52ug$Fz9Zeci/TsP1+OE9WVrsEMsDxfFaoIqAheVYG0WwVSA	Test	McTestface
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
0ef17bcb-dda0-4e5d-92ea-2fffa889a003	51dde765-a6de-48c6-b372-41534fb91d55
f4b6aeab-ee3d-4c00-8d4b-8a78aa20e004	51dde765-a6de-48c6-b372-41534fb91d55
c1619be0-f8ba-4473-b12f-30ce74e924b3	51dde765-a6de-48c6-b372-41534fb91d55
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

