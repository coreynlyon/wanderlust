from fastapi import APIRouter, Depends, Response
from typing import Union, List, Optional
from queries.reservations import (
    ReservationIn,
    ReservationOut,
    ReservationRepository,
    Error,
)

router = APIRouter()


@router.post("/reservations", response_model=Union[ReservationOut, Error])
def create_reservation(
    reservation: ReservationIn,
    repo: ReservationRepository = Depends(),
):
    return repo.create(reservation)


@router.get("/reservations", response_model=Union[List[ReservationOut], Error])
def get_all(
    repo: ReservationRepository = Depends(),
):
    return repo.get_all()


@router.put(
    "/reservations/{reservation_id}",
    response_model=Union[ReservationOut, Error],
)
def update_reservation(
    reservation_id: int,
    reservation: ReservationIn,
    repo: ReservationRepository = Depends(),
) -> Union[Error, ReservationOut]:
    return repo.update(reservation_id, reservation)


@router.delete("/reservations/{reservation_id}", response_model=bool)
def delete_reservation(
    reservation_id: int,
    repo: ReservationRepository = Depends(),
) -> bool:
    return repo.delete(reservation_id)


@router.get(
    "/reservations/{reservation_id}", response_model=Optional[ReservationOut]
)
def get_one_reservation(
    reservation_id: int,
    response: Response,
    repo: ReservationRepository = Depends(),
) -> ReservationOut:
    reservation = repo.get_one(reservation_id)
    if reservation is None:
        response.status_code = 404
    return reservation


@router.get(
    "/reservations/trip/{trip_id}",
    response_model=Union[List[ReservationOut], Error],
)
def get_res_by_trip_id(
    trip_id: int,
    repo: ReservationRepository = Depends(),
):
    return repo.get_res_by_trip_id(trip_id)
