from fastapi import APIRouter, Depends, HTTPException, status
from typing import Union, List, Optional
from queries.trips import TripIn, TripRepository, TripOut, Error
from queries.viewers import ViewersRepository, ViewersIn, ViewersOut
from authenticator import authenticator


router = APIRouter()

not_authorized = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Invalid authentication credentials",
    headers={"WWW-Authenticate": "Bearer"},
)


@router.post("/trips/viewers", response_model=Union[ViewersOut, Error])
def add_viewers(
    viewers: ViewersIn,
    tripRepo: TripRepository = Depends(),
    user: dict = Depends(authenticator.get_current_account_data),
    viewersRepo: ViewersRepository = Depends(),
):
    trip = tripRepo.get_one(viewers.trip_id)
    if user and trip.creator == user["id"]:
        return viewersRepo.add_viewers(viewers)
    else:
        return not_authorized


@router.post("/trips", response_model=Union[TripOut, Error])
def create_trip(
    trip: TripIn,
    repo: TripRepository = Depends(),
    user: dict = Depends(authenticator.get_current_account_data),
):
    return repo.create(trip, user["id"])


@router.get("/trips", response_model=Union[List[TripOut], Error])
def get_all(
    tripRepo: TripRepository = Depends(),
    viewerRepo: ViewersRepository = Depends(),
    user: dict = Depends(authenticator.get_current_account_data),
):
    trips = tripRepo.get_all()
    viewer_access = viewerRepo.can_view(user["email"])
    return [
        trip
        for trip in trips
        if trip.id in viewer_access or trip.creator == user["id"]
    ]


@router.put("/trips/{trip_id}", response_model=Union[TripOut, Error])
def update_trip(
    trip_id: int,
    trip: TripIn,
    tripRepo: TripRepository = Depends(),
    viewerRepo: ViewersRepository = Depends(),
    user: dict = Depends(authenticator.get_current_account_data),
) -> Union[Error, TripOut]:
    get_trip = tripRepo.get_one(trip_id)
    viewer_access = viewerRepo.can_view(user["email"])
    if get_trip.id in viewer_access or get_trip.creator == user["id"]:
        return tripRepo.update(trip_id, trip, user["id"])


@router.delete("/trips/{trip_id}", response_model=bool)
def delete_trip(
    trip_id: int,
    repo: TripRepository = Depends(),
    user: dict = Depends(authenticator.get_current_account_data),
) -> bool:
    get_trip = repo.get_one(trip_id)
    if get_trip.creator == user["id"]:
        return repo.delete(trip_id)
    else:
        return "false"


@router.get("/trips/{trip_id}", response_model=Optional[TripOut])
def get_one_trip(
    trip_id: int,
    tripRepo: TripRepository = Depends(),
    viewerRepo: ViewersRepository = Depends(),
    user: dict = Depends(authenticator.get_current_account_data),
) -> TripOut:
    trip = tripRepo.get_one(trip_id)

    viewer_trips = viewerRepo.can_view(user["email"])

    if trip is None:
        raise HTTPException(status_code=404, detail="Trip not found")

    if trip.creator == user["id"] or trip_id in viewer_trips:
        return trip
    else:
        raise HTTPException(
            status_code=401, detail="You don't have access to that trip"
        )
