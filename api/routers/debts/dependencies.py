from fastapi import Depends

from api.db import pool
from api.routers.debts.repository import DebtsRepository
from api.routers.debts.service import DebtsService


def get_debts_repository() -> DebtsRepository:
    return DebtsRepository(pool)

def get_debts_service(repository: DebtsRepository = Depends(get_debts_repository)) -> DebtsService:
    return DebtsService(repository=repository)