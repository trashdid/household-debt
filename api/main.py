from contextlib import asynccontextmanager

import uvicorn
import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from scalar_fastapi import get_scalar_api_reference

from api.db import open_db, close_db
from api.routers import states_router, counties_router, debts_router


@asynccontextmanager
async def lifespan(_: FastAPI):
    await open_db()
    yield
    await close_db()

app = FastAPI(
    title="Household Debt API",
    description="API to provide data for household debt information from data.gov",
    version=os.getenv("API_VERSION", "Not Found"),
    root_path="/api",
    lifespan=lifespan,
)

# TODO: Remove before pushing and make sure it works in Docker
origins = [
    "http://localhost:5173",  # Your Vite/React frontend
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,            # Allows specific origins
    allow_credentials=True,
    allow_methods=["*"],              # Allows all methods (GET, POST, etc.)
    allow_headers=["*"],              # Allows all headers
)

app.include_router(states_router)
app.include_router(counties_router)
app.include_router(debts_router)

@app.get("/health")
async def health_check():
    return "Hello World"

@app.get("/scalar", include_in_schema=False)
async def scalar_html():
    return get_scalar_api_reference(
        openapi_url=app.openapi_schema
    )

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)