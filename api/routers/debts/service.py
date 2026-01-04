from datetime import datetime

from fastapi import HTTPException
from starlette import status

from api.routers.debts.models import DebtExtended
from api.routers.debts.models.debt import StateDebt
from api.routers.debts.repository import DebtsRepository


class DebtsService:
    def __init__(self, repository: DebtsRepository):
        self.repository = repository

    async def get_debts(self, county: str | None, state: str | None, fips_code: str | None, start_date: datetime, end_date: datetime, skip: int, limit: int) -> list[DebtExtended]:
        debts = await self.repository.get_debts(county, state, fips_code, start_date, end_date, skip, limit)
        return debts

    async def get_state_debt(self, state_code: str, start_date: datetime, end_date: datetime) -> StateDebt:
        debts = await self.repository.get_state_debt(state_code, start_date, end_date)

        if len(debts) > 0:
            return debts[0]

        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Debt not found for {state_code}")

    async def get_states_debt(self, start_date: datetime, end_date: datetime) -> list[StateDebt]:
        debts = await self.repository.get_state_debt(None, start_date, end_date)

        if len(debts) > 0:
            return debts

        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Debt not found for states")