from fastapi import APIRouter, Depends
from starlette.exceptions import HTTPException

from api.di import get_states_service
from api.routers.states.models import State
from api.routers.states.service import StatesService

router = APIRouter(
    prefix="/states",
    tags=["States"],
)

@router.get(
    path="/",
    response_model=list[State],
    summary="Get state information",
    description="Get all state information or specific state info by query params",
    status_code=200,
    responses={
        404: {"detail": "No State data found"},
    }
)
async def states(service: StatesService = Depends(get_states_service), name: str | None = None, code: str | None = None, fips_code: str | None = None) -> list[State]:
    response = await service.get_states(name, code, fips_code)

    if len(response) == 0:
        raise HTTPException(status_code=404, detail="No State data found")
    return response