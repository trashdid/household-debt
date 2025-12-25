from psycopg_pool import AsyncConnectionPool

from api.routers.states.models import State


class StatesRepository:
    def __init__(self, pool: AsyncConnectionPool):
        self.pool = pool

    async def get_states(self, name: str | None, code: str | None, fips_code: str | None) -> list[State]:
        async with self.pool.connection() as conn:
                query = """
                            SELECT
                                name,
                                code,
                                fips_code
                            FROM core.states
                        """

                filters = []
                params = {}

                if name is not None:
                    filters.append("name = %(name)s")
                    params["name"] = name.upper()

                if code is not None:
                    filters.append("code = %(code)s")
                    params["code"] = code.upper()

                if fips_code is not None:
                    filters.append("fips_code = %(fips_code)s")
                    params["fips_code"] = fips_code

                if filters:
                    query += " WHERE " + " AND ".join(filters)

                cursor = await conn.execute(query, params)
                results = await cursor.fetchall()

        response = []
        for row in results:
            response.append(State.model_validate(row))
        return response
