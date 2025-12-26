from datetime import datetime
from typing import Annotated

from pydantic import BaseModel, Field


class Debt(BaseModel):
    date: Annotated[datetime, Field(description="Date and time of debt", examples=["2024-10-01"])]
    low: Annotated[float, Field(description="Lower bound of debt", examples=[0.0])]
    high: Annotated[float, Field(description="Upper bound of debt", examples=[1.0])]