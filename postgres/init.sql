CREATE SCHEMA IF NOT EXISTS core;

CREATE TABLE IF NOT EXISTS core.states
(
    id        serial PRIMARY KEY,
    name      varchar(20) NOT NULL,
    code      varchar(2)  NOT NULL,
    fips_code varchar(3)  NOT NULL,
    UNIQUE (code),
    UNIQUE (fips_code)
);

CREATE TABLE IF NOT EXISTS core.county
(
    id        serial PRIMARY KEY,
    state_id  integer     NOT NULL REFERENCES core.states (id),
    name      varchar(30) NOT NULL,
    fips_code varchar(4)  NOT NULL,
    UNIQUE (fips_code, state_id)
);

CREATE TABLE IF NOT EXISTS core.debt
(
    id        serial PRIMARY KEY,
    date      date,
    low       float4,
    high      float4,
    county_id integer NOT NULL REFERENCES core.county (id)
        CONSTRAINT debt_quarter_start_chk
            CHECK (
                EXTRACT(MONTH FROM date) IN (1, 4, 7, 10)
                    AND EXTRACT(DAY FROM date) = 1
                ),
    CONSTRAINT debt_unique_county_date UNIQUE (county_id, date)
);

CREATE TEMPORARY TABLE t
(
    state_name           varchar,
    county_name          varchar,
    city_name            varchar,
    state_code           varchar,
    state_fips_code      varchar,
    county_code          varchar,
    stcnty_fips_code     varchar,
    city_code            varchar,
    stcntycity_fips_code varchar
);

COPY t (state_name, county_name, city_name, state_code, state_fips_code, county_code, stcnty_fips_code, city_code,
        stcntycity_fips_code)
    FROM '/data/State,_County_and_City_FIPS_Reference_Table_20251222.csv'
    WITH (FORMAT CSV, HEADER TRUE );

INSERT INTO core.states (name, code, fips_code)
SELECT t.state_name, t.state_code, t.state_fips_code
FROM t
GROUP BY t.state_name, t.state_code, t.state_fips_code;

INSERT INTO core.county (state_id, name, fips_code)
SELECT states.id, t.county_name, right(t.county_code, 3)
FROM t
         INNER JOIN core.states states
                    ON states.code = t.state_code
WHERE t.county_name IS NOT NULL
    AND t.county_code IS NOT NULL
GROUP BY states.id, t.county_name, t.county_code;

DROP TABLE t;

CREATE TEMPORARY TABLE t
(
    year      int,
    qtr       int,
    area_fips varchar(8),
    low       float4,
    high      float4
);

COPY t (year, qtr, area_fips, low, high)
    FROM '/data/household-debt-by-county.csv'
    WITH (FORMAT CSV, HEADER TRUE );

INSERT INTO core.debt (date, low, high, county_id)
SELECT make_date(t.year, (t.qtr - 1) * 3 + 1, 1) AS date, t.low, t.high, c.id
FROM t
         INNER JOIN core.states s
                    ON s.fips_code = left(t.area_fips, 2)
         INNER JOIN core.county c
                    ON c.state_id = s.id
                        AND c.fips_code = right(t.area_fips, 3);

DROP TABLE t;