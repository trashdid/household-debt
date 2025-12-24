# Postgres
The relational database used for this project is Postgres. This was decided over MSSQL because I have not work with it
before, and it was relatively easy to spin up in a docker container

## Init Script
The init script is used to create the schemas and tables that are used for managing the data. Then using two temp tables,
the data is ingested from the raw data folder and then properly parsed out into their respective tables.

## Table Structures

### State
| Column    | Type        | Constraints      | Description                                                         |
| --------- | ----------- | ---------------- | ------------------------------------------------------------------- |
| id        | serial      | PK               | Surrogate key for the state                                         |
| name      | varchar(20) | NOT NULL         | State name                                                          |
| code      | varchar(2)  | NOT NULL, UNIQUE | State postal abbreviation (e.g., `MI`)                              |
| fips_code | varchar(3)  | NOT NULL, UNIQUE | State FIPS code (recommend storing as 2-digit text like `01`, `26`) |

### County
| Column    | Type        | Constraints                                            | Description                                                                   |
| --------- | ----------- | ------------------------------------------------------ | ----------------------------------------------------------------------------- |
| id        | serial      | PK                                                     | Surrogate key for the county                                                  |
| state_id  | integer     | NOT NULL, FK → `core.states(id)`                       | Parent state                                                                  |
| name      | varchar(30) |                                                        | County name                                                                   |
| fips_code | varchar(4)  | UNIQUE with `state_id` (`UNIQUE(fips_code, state_id)`) | County FIPS *within the state* (recommend storing as 3-digit text like `001`) |

### Debt
| Column    | Type    | Constraints                                                                     | Description                              |
| --------- | ------- | ------------------------------------------------------------------------------- | ---------------------------------------- |
| id        | serial  | PK                                                                              | Surrogate key for the debt record        |
| date      | date    | CHECK: quarter start (`month in 1,4,7,10` and `day = 1`)                        | Quarter start date                       |
| low       | float4  |                                                                                 | Lower bound value for the county/quarter |
| high      | float4  |                                                                                 | Upper bound value for the county/quarter |
| county_id | integer | NOT NULL, FK → `core.county(id)`, UNIQUE with `date` (`UNIQUE(county_id,date)`) | County reference                         |

