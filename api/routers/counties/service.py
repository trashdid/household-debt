from api.routers.counties.models import CountyExtended
from api.routers.counties.repository import CountiesRepository
from api.routers.debts.models import Debt


class CountiesService:
    def __init__(self, repository: CountiesRepository):
        self.repository = repository

    async def get_counties(self, name: str | None, fips_code: str | None) -> list[CountyExtended]:
        counties = await self.repository.get_counties(name, fips_code)
        return counties

    async def get_county_by_fips(self, fips_code: str) -> CountyExtended:
        county = await self.repository.get_county_by_fips(fips_code)
        return county

    async def get_debt_by_county_fips(self, fips_code: str) -> list[Debt]:
        debts = await self.repository.get_debt_by_county_fips(fips_code)
        return debts