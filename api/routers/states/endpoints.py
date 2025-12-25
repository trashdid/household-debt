from fastapi import APIRouter, Depends
from starlette.exceptions import HTTPException

from api.di import get_states_service
from api.routers.counties.models import County
from api.routers.states.models import State
from api.routers.states.service import StatesService

router = APIRouter(
    prefix="/states",
    tags=["States"],
)

@router.get(
    path="",
    response_model=list[State],
    summary="Get state information",
    description="Get all state information or specific state info by query params",
    status_code=200,
    responses={
        404: {"detail": "No State data found"},
    }
)
async def get_states(service: StatesService = Depends(get_states_service), name: str | None = None, code: str | None = None, fips_code: str | None = None) -> list[State]:
    response = await service.get_states(name, code, fips_code)
    return response

@router.get(
    path="/{state_code}",
    response_model=State,
    summary="Get specific state information",
    description="Get state information by state code",
    status_code=200,
    responses={
        404: {"detail": "No State data found"},
    }
)
async def get_state_by_code(state_code: str, service: StatesService = Depends(get_states_service)) -> State:
    response = await service.get_state_by_code(state_code)
    return response

@router.get(
    path="/{state_code}/counties",
    response_model=list[County],
    summary="Get specific state and its counties",
    description="Get specific state and its counties information by state code",
    status_code=200,
    responses={
        404: {"detail": "No State data found"},
    }
)
async def get_state_and_counties(state_code: str, service: StatesService = Depends(get_states_service)) -> list[County]:
    response = await service.get_state_and_counties(state_code)
    return response