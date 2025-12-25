from fastapi import APIRouter, Depends

from api.di import get_states_service
from api.routers.states.models import State
from api.routers.states.service import StatesService

router = APIRouter(
    prefix="/states",
    tags=["States"],
)

@router.get("/")
async def states(service: StatesService = Depends(get_states_service)) -> list[State]:
    return await service.get_states()