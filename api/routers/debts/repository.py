from datetime import datetime

from fastapi import HTTPException
from psycopg_pool import AsyncConnectionPool

from api.routers.debts.models import DebtExtended


class DebtsRepository:
    def __init__(self, pool: AsyncConnectionPool):
        self.pool = pool

    async def get_debts(self, county: str | None, state: str | None, fips_code: str | None, start_date: datetime,
                        end_date: datetime, skip: int, limit: int) -> list[DebtExtended]:
        async with self.pool.connection() as conn:
            query = """
                    SELECT c.name                           as county,
                           s.name                           as state,
                           concat(s.fips_code, c.fips_code) as fips_code,
                           d.date,
                           d.low,
                           d.high
                    FROM core.county c
                             INNER JOIN core.debt d on c.id = d.county_id
                             INNER JOIN core.states s on s.id = c.state_id
                    WHERE d.date BETWEEN %(start_date)s AND %(end_date)s
            """
            management = """
                    GROUP BY c.name, s.name, concat(s.fips_code, c.fips_code), d.date, d.low, d.high
                    ORDER BY d.date ASC
                    LIMIT %(limit)s
                    OFFSET %(skip)s
            """

            filters = []
            params = {}

            if county is not None:
                filters.append("c.name = %(county)s")
                params["county"] = county.upper()

            if state is not None:
                filters.append("s.name = %(state)s")
                params["state"] = state.upper()

            if fips_code is not None:
                filters.append("s.fips_code = %(fips_code)s")
                params["fips_code"] = fips_code

            if len(filters) > 0:
                query += " AND " + " AND ".join(filters)

            query+=management

            params.update({
                "start_date": start_date,
                "end_date": end_date,
                "limit": limit,
                "skip": skip
            })

            cursor = await conn.execute(query, params)
            result = await cursor.fetchall()

        if len(result) == 0:
            raise HTTPException(status_code=404, detail="No debts found")

        response = []
        for row in result:
            response.append(DebtExtended.model_validate(row))
        return response
