from fastapi import APIRouter, Depends, Response
from typing import List, Union, Optional
from queries.activities import (
    Error,
    ActivityIn,
    ActivityRepository,
    ActivityOut,
)


router = APIRouter()


@router.post("/activities", response_model=Union[ActivityOut, Error])
def create_activity(
    activity: ActivityIn,
    response: Response,
    repo: ActivityRepository = Depends(),
):
    return repo.create(activity)


@router.get("/activities", response_model=Union[List[ActivityOut], Error])
def get_all(
    repo: ActivityRepository = Depends(),
):
    return repo.get_all()


@router.put(
    "/activities/{activity_id}", response_model=Union[ActivityOut, Error]
)
def update_activity(
    activity_id: int,
    activity: ActivityIn,
    repo: ActivityRepository = Depends(),
) -> Union[Error, ActivityOut]:
    return repo.update(activity_id, activity)


@router.delete("/activities/{activity_id}", response_model=bool)
def delete_activity(
    activity_id: int,
    repo: ActivityRepository = Depends(),
) -> bool:
    return repo.delete(activity_id)


@router.get("/activities/{activity_id}", response_model=Optional[ActivityOut])
def get_one_activity(
    activity_id: int,
    response: Response,
    repo: ActivityRepository = Depends(),
) -> ActivityOut:
    activity = repo.get_one(activity_id)
    if activity is None:
        response.status_code = 404
    return activity
