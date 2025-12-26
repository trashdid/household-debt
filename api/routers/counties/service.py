from api.routers.counties.models import CountyExtended
from api.routers.counties.repository import CountiesRepository


class CountiesService:
    def __init__(self, repository: CountiesRepository):
        self.repository = repository

    async def get_counties(self, name: str | None, fips_code: str | None) -> list[CountyExtended]:
        counties = await self.repository.get_counties(name, fips_code)
        return counties