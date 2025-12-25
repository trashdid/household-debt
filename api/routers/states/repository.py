from psycopg_pool import AsyncConnectionPool

from api.routers.states.models import State


class StatesRepository:
    def __init__(self, pool: AsyncConnectionPool):
        self.pool = pool

    async def get_states(self) -> list[State]:
        async with self.pool.connection() as conn:
                query = """
                            SELECT
                                name,
                                code,
                                fips_code
                            FROM core.states
                        """
                cursor = await conn.execute(query)
                results = await cursor.fetchall()

        response = []
        for row in results:
            response.append(State.model_validate(row))
        return response
