-- -------------------------------------------------------------
-- TablePlus 6.0.0(550)
--
-- https://tableplus.com/
--
-- Database: reservation-db
-- Generation Time: 2024-07-11 21:55:09.9850
-- -------------------------------------------------------------


-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS "TableInfo_id_seq";

-- Table Definition
CREATE TABLE "public"."TableInfo" (
    "id" int4 NOT NULL DEFAULT nextval('"TableInfo_id_seq"'::regclass),
    "tableNo" text NOT NULL,
    "tableSize" text,
    PRIMARY KEY ("id")
);

-- Indices
CREATE UNIQUE INDEX "TableInfo_tableNo_key" ON public."TableInfo" USING btree ("tableNo");

INSERT INTO "public"."TableInfo" ("id", "tableNo", "tableSize") VALUES
(1, '1', 'M'),
(2, '2', 'M'),
(3, '3', 'M'),
(4, '4', 'M'),
(5, '5', 'M'),
(6, '6', 'M'),
(7, '7', 'L'),
(8, '8', 'L');
