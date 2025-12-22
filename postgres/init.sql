CREATE SCHEMA IF NOT EXISTS staging;
CREATE SCHEMA IF NOT EXISTS housing;

CREATE TABLE IF NOT EXISTS staging.fips_ref_raw
(
    state       text,
    state_abbr  text,
    state_fips  text,
    county_fips text,
    county_name text
);

CREATE TABLE IF NOT EXISTS staging.debt_raw
(
  year int,
  qtr int,
  area_fipps text,
  low real,
  high real
);

CREATE TABLE housing.public.states
(
    id        serial PRIMARY KEY,
    name      varchar(13) NOT NULL,
    code      varchar(2)  NOT NULL,
    fips_code integer     NOT NULL,
    UNIQUE (code),
    UNIQUE (fips_code)
);

CREATE TABLE housing.public.county
(
    id        serial PRIMARY KEY,
    state_id  integer NOT NULL REFERENCES housing.public.states (id),
    name      varchar(30),
    fips_code varchar(4),
    UNIQUE (name, fips_code)
);

CREATE TABLE housing.public.debt
(
    id        serial PRIMARY KEY,
    date      date,
    low       float4,
    high      float4,
    county_id integer NOT NULL REFERENCES housing.public.county (id)
        CONSTRAINT debt_quarter_start_chk
            CHECK (
                EXTRACT(MONTH FROM date) IN (1, 4, 7, 10)
                    AND EXTRACT(DAY FROM date) = 1
                )
)