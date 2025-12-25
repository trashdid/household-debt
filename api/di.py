from fastapi import Depends

from api.db import pool
from api.routers.states.repository import StatesRepository
from api.routers.states.service import StatesService

def get_states_repository() -> StatesRepository:
    return StatesRepository(pool)

def get_states_service(repository: StatesRepository = Depends(get_states_repository)) -> StatesService:
    return StatesService(repository=repository)