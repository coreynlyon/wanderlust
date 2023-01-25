from fastapi import APIRouter, Depends, Response
from typing import Union, List, Optional
from queries.trips import TripIn, TripRepository, TripOut, Error


router = APIRouter()


@router.post("/trips", response_model=Union[TripOut, Error])
def create_trip(
    trip: TripIn,
    repo: TripRepository = Depends(),
):
    return repo.create(trip)


@router.get("/trips", response_model=Union[List[TripOut], Error])
def get_all(
    repo: TripRepository = Depends(),
):
    return repo.get_all()


@router.put(
    "/trips/{trip_id}", response_model=Union[TripOut, Error]
    )
def update_trip(
    trip_id: int,
    trip: TripIn,
    repo: TripRepository = Depends(),
) -> Union[Error, TripOut]:
    return repo.update(trip_id, trip)


@router.delete("/trips/{trip_id}", response_model=bool)
def delete_trip(
    trip_id: int,
    repo: TripRepository = Depends(),
) -> bool:
    return repo.delete(trip_id)


@router.get("/trips/{trip_id}", response_model=Optional[TripOut])
def get_one_trip(
    trip_id: int,
    response: Response,
    repo: TripRepository = Depends(),
) -> TripOut:
    trip = repo.get_one(trip_id)
    if trip is None:
        response.status_code = 404
    return trip
