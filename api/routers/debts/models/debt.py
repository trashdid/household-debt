from datetime import datetime
from typing import Annotated, Optional

from pydantic import BaseModel, Field


class Debt(BaseModel):
    date: Annotated[datetime, Field(description="Date and time of debt", examples=["2024-10-01"])]
    low: Annotated[float, Field(description="Lower bound of debt", examples=[0.0])]
    high: Annotated[Optional[float], Field(description="Upper bound of debt", examples=[1.0])]

class DebtExtended(Debt):
    county: Annotated[str, Field(description="County of Debt", examples=["Oakland"])]
    state: Annotated[str, Field(description="State of County with Debt", examples=["Michigan"])]
    fips_code: Annotated[str, Field(description="FIPS code for the County", examples=["26125"])]
