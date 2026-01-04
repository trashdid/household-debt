from datetime import datetime

from fastapi import APIRouter, Depends, Query

from api.routers.debts.dependencies import get_debts_service
from api.routers.debts.models import DebtExtended
from api.routers.debts.models.debt import StateDebt
from api.routers.debts.service import DebtsService

router = APIRouter(
    prefix="/debts",
    tags=["Debts"],
)


@router.get(
    path="",
    response_model=list[DebtExtended],
    summary="Get all county debt",
    description="Get all county debt details",
    status_code=200,
    responses={
        404: {"description": "No Debt data found"},
    }
)
async def get_debts(county: str | None = Query(default=None),
                    state: str | None = Query(default=None),
                    fips_code: str | None = Query(default=None),
                    start_date: datetime = Query(default="1999-01-01T00:00:00"),
                    end_date: datetime | None = Query(default=datetime.now()),
                    skip: int = 0,
                    limit: int = 150,
                    service: DebtsService = Depends(get_debts_service)) -> list[DebtExtended]:

    response = await service.get_debts(county, state, fips_code, start_date, end_date, skip, limit)
    return response

@router.get(
    path="/states",
    response_model=list[StateDebt],
    summary="Get all states debt",
    description="Get all states debt details",
    status_code=200,
    responses={
        404: {"description": "No Debt data found"},
    }
)
async def get_states_debt(
        start_date: datetime = Query(default="1999-01-01T00:00:00"),
        end_date: datetime | None = Query(default=datetime.now()),
        service: DebtsService = Depends(get_debts_service),
) -> list[StateDebt]:
    response = await service.get_states_debt(start_date, end_date)
    return response

@router.get(
    path="/states/{state_code}",
    response_model=StateDebt,
    summary="Get state debt",
    description="Get state debt details",
    status_code=200,
    responses={
        404: {"description": "No Debt data found"},
    }
)
async def get_state_debt(
        state_code: str,
        start_date: datetime = Query(default="1999-01-01T00:00:00"),
        end_date: datetime | None = Query(default=datetime.now()),
        service: DebtsService = Depends(get_debts_service),
) -> StateDebt:
    response = await service.get_state_debt(state_code, start_date, end_date)
    return response
