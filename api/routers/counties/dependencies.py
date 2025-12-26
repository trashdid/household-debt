from fastapi import Depends

from api.db import pool
from api.routers.counties.repository import CountiesRepository
from api.routers.counties.service import CountiesService

def get_counties_repository() -> CountiesRepository:
    return CountiesRepository(pool)

def get_counties_service(repository: CountiesRepository = Depends(get_counties_repository)) -> CountiesService:
    return CountiesService(repository=repository)