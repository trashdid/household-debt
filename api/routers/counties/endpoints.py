from fastapi import APIRouter, Depends

from api.routers.counties.dependencies import get_counties_service
from api.routers.counties.models import CountyExtended
from api.routers.counties.service import CountiesService

router = APIRouter(
    prefix="/counties",
    tags=["Counties"]
)


@router.get(
    "",
    response_model=list[CountyExtended],
    summary="Get all counties",
    description="Get all counties information",
    status_code=200,
    responses={
        404: {"detail": "No County data found"}
    }
)
async def get_counties(service: CountiesService = Depends(get_counties_service), name: str | None = None,
                       fips_code: str | None = None) -> list[CountyExtended]:
    response = await service.get_counties(name, fips_code)
    return response
