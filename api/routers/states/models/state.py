from typing import Annotated

from pydantic import BaseModel, Field

class State(BaseModel):
    name: Annotated[str, Field(description="The name of the state", examples=["Michigan", "Maryland", "California"])]
    code: Annotated[str, Field(description="The code of the state", examples=["MI", "MD", "CA"])]
    fips_code: Annotated[str, Field(description="The fips code of the state", examples=["26", "24", "06"])]
