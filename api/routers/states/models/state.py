from typing import Annotated

from pydantic import BaseModel, Field

class State(BaseModel):
    name: Annotated[str, Field(description="State Name", examples=["Michigan", "Maryland", "California"])]
    code: Annotated[str, Field(description="State Code", examples=["MI", "MD", "CA"])]
    fips_code: Annotated[str, Field(description="State Fips Code", examples=["26", "24", "06"])]
