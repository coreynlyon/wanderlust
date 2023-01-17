from fastapi import APIRouter, Depends, Response
from typing import Union, List, Optional
from queries.itineraries import ItineraryIn, ItineraryRepository, ItineraryOut, Error

router = APIRouter()


@router.post("/itineraries", response_model=Union[ItineraryOut, Error])
def create_itinerary(
    itinerary: ItineraryIn,
    response: Response,
    repo: ItineraryRepository = Depends(),
):
    return repo.create(itinerary)


@router.get("/itineraries", response_model=Union[List[ItineraryOut], Error])
def get_all(
    repo: ItineraryRepository = Depends(),
):
    return repo.get_all()


@router.put("/itineraries/{itinerary_id}", response_model=Union[ItineraryOut, Error])
def update_itinerary(
    itinerary_id: int,
    itinerary: ItineraryIn,
    repo: ItineraryRepository = Depends(),
) -> Union[Error, ItineraryOut]:
    return repo.update(itinerary_id, itinerary)


@router.delete("/itineraries/{itinerary_id}", response_model=bool)
def delete_itinerary(
    itinerary_id: int,
    repo: ItineraryRepository = Depends(),
) -> bool:
    return repo.delete(itinerary_id)


@router.get("/itineraries/{itinerary_id}", response_model=Optional[ItineraryOut])
def get_one_itinerary(
    itinerary_id: int,
    response: Response,
    repo: ItineraryRepository = Depends(),
) -> ItineraryOut:
    itinerary = repo.get_one(itinerary_id)
    if itinerary is None:
        response.status_code = 404
    return itinerary
