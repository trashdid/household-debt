from datetime import datetime

from api.routers.debts.models import DebtExtended
from api.routers.debts.repository import DebtsRepository


class DebtsService:
    def __init__(self, repository: DebtsRepository):
        self.repository = repository

    async def get_debts(self, county: str | None, state: str | None, fips_code: str | None, start_date: datetime, end_date: datetime, skip: int, limit: int) -> list[DebtExtended]:
        debts = await self.repository.get_debts(county, state, fips_code, start_date, end_date, skip, limit)
        return debts