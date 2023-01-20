from fastapi import APIRouter, Depends, Response
from typing import Union, List, Optional
from queries.checklists import (
    ChecklistIn,
    ChecklistOut,
    ChecklistRepository,
    Error,
)

router = APIRouter()


@router.post("/checklists", response_model=Union[ChecklistOut, Error])
def create_checklist(
    checklist: ChecklistIn,
    repo: ChecklistRepository = Depends(),
):
    return repo.create(checklist)


@router.get("/checklists", response_model=Union[List[ChecklistOut], Error])
def get_all(
    repo: ChecklistRepository = Depends(),
):
    return repo.get_all()


@router.put(
    "/checklists/{checklist_id}", response_model=Union[ChecklistOut, Error]
)
def update_checklist(
    checklist_id: int,
    checklist: ChecklistIn,
    repo: ChecklistRepository = Depends(),
) -> Union[Error, ChecklistOut]:
    return repo.update(checklist_id, checklist)


@router.delete("/checklists/{checklist_id}", response_model=bool)
def delete_checklist(
    checklist_id: int,
    repo: ChecklistRepository = Depends(),
) -> bool:
    return repo.delete(checklist_id)


@router.get(
    "/checklists/{checklist_id}", response_model=Optional[ChecklistOut]
)
def get_one_checklist(
    checklist_id: int,
    response: Response,
    repo: ChecklistRepository = Depends(),
) -> ChecklistOut:
    checklist = repo.get_one(checklist_id)
    if checklist is None:
        response.status_code = 404
    return checklist


@router.get(
    "/checklists/trip/{trip_id}",
    response_model=Union[List[ChecklistOut], Error],
)
def get_checklist_by_trip_id(
    trip_id: int,
    repo: ChecklistRepository = Depends(),
):
    return repo.get_checklist_by_trip_id(trip_id)
