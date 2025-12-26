from fastapi import APIRouter, Depends

from api.routers.counties.dependencies import get_counties_service
from api.routers.counties.models import CountyExtended
from api.routers.counties.service import CountiesService
from api.routers.debts.models import Debt

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


@router.get(
    "/{fips_code}",
    response_model=CountyExtended,
    summary="Get county details",
    description="Get specific county details",
    status_code=200,
    responses={
        404: {"detail": "No County data found"}
    }
)
async def get_county_by_fips(fips_code: str, service: CountiesService = Depends(get_counties_service)) -> CountyExtended:
    response = await service.get_county_by_fips(fips_code)
    return response


@router.get(
    "/{fips_code}/debt",
    response_model=list[Debt],
    summary="Get county debt",
    description="Get specific county debt details",
    status_code=200,
    responses={
        404: {"detail": "No County data found"}
    }
)
async def get_debt_by_county_fips(fips_code: str, service: CountiesService = Depends(get_counties_service)) -> list[Debt]:
    response = await service.get_debt_by_county_fips(fips_code)
    return response
