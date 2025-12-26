from fastapi import HTTPException
from psycopg_pool import AsyncConnectionPool

from api.routers.counties.models import CountyExtended


class CountiesRepository:
    def __init__(self, pool: AsyncConnectionPool):
        self.pool = pool

    async def get_counties(self, name: str | None, fips_code: str | None) -> list[CountyExtended]:
        async with self.pool.connection() as conn:
            query = """
                    SELECT c.name as name,
                           concat(s.fips_code,c.fips_code) as fips_code,
                           s.code as state_code
                    FROM core.county c
                             INNER JOIN core.states s
                                        ON c.state_id = s.id
                    """

            filters = []
            params = {}

            if name is not None:
                filters.append("c.name = %(name)s")
                params["name"] = name.upper()

            if fips_code is not None:
                filters.append("concat(s.fips_code, c.fips_code) = %(fips_code)s")
                params["fips_code"] = fips_code.upper()

            if len(filters) > 0:
                query += " WHERE " + " AND ".join(filters)

            cursor = await conn.execute(query, params)
            result = await cursor.fetchall()

        if len(result) == 0:
            raise HTTPException(status_code=404, detail="County not found")

        response = []
        for row in result:
            response.append(CountyExtended.model_validate(row))
        return response