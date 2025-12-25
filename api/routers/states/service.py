from api.routers.states.models import State
from api.routers.states.repository import StatesRepository


class StatesService:
    def __init__(self, repository: StatesRepository):
        self.repository = repository

    async def get_states(self) -> list[State]:
        states = await self.repository.get_states()
        return states
