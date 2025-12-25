import os

from psycopg.rows import dict_row
from psycopg_pool import AsyncConnectionPool

conninfo = f"postgresql://{os.getenv("POSTGRES_USER")}:{os.getenv("POSTGRES_PASSWORD")}@{os.getenv("POSTGRES_HOST")}:{os.getenv("POSTGRES_PORT")}/{os.getenv("POSTGRES_DB")}"

pool = AsyncConnectionPool(conninfo=conninfo, open=False, min_size=1, max_size=5, kwargs={"row_factory": dict_row})


async def open_db():
    await pool.open()


async def close_db():
    await pool.close()
