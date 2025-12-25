from api.routers.counties.models import County
from api.routers.states.models import State
from api.routers.states.repository import StatesRepository


class StatesService:
    def __init__(self, repository: StatesRepository):
        self.repository = repository

    async def get_states(self, name: str | None, code: str | None, fips_code: str | None) -> list[State]:
        states = await self.repository.get_states(name, code, fips_code)
        return states

    async def get_state_by_code(self, state_code: str) -> State:
        state = await self.repository.get_state_by_code(state_code)
        return state

    async def get_state_and_counties(self, state_code: str) -> list[County]:
        counties = await self.repository.get_counties_by_state_code(state_code)
        return counties