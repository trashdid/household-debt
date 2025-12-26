from typing import Annotated

from pydantic import BaseModel, Field

class County(BaseModel):
    name: Annotated[str, Field(description="County Name", examples=["Oakland", "Howard"])]
    fips_code: Annotated[str, Field(description="County Fips Code", examples=["125", "027"])]


class CountyExtended(County):
    state_code: Annotated[str, Field(description="State Code for County", examples=["MI", "MD"])]