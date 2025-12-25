from psycopg.rows import dict_row
from psycopg_pool import AsyncConnectionPool

conninfo = f"postgresql://admin:admin@db:5432/housing"

pool = AsyncConnectionPool(conninfo=conninfo, open=False, min_size=1, max_size=5, kwargs={"row_factory": dict_row})

async def open_db():
    await pool.open()

async def close_db():
    await pool.close()