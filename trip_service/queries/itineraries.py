from pydantic import BaseModel
from typing import Optional, List, Union
from queries.pool import pool


class Error(BaseModel):
    message: str


class ItineraryIn(BaseModel):
    notes: str
    trip_id: int


class ItineraryOut(BaseModel):
    id: int
    notes: str
    trip_id: int


class ItineraryRepository:
    def get_one(self, itinerary_id: int) -> Optional[ItineraryOut]:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our SELECT statement
                    result = db.execute(
                        """
                        SELECT id
                             , notes
                             , trip_id
                        FROM itineraries
                        WHERE id = %s
                        """,
                        [itinerary_id]
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_itinerary_out(record)
        except Exception as e:
            print(e)
            return {"message": "Could not get that itinerary"}

    def delete(self, itinerary_id: int) -> bool:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM itineraries
                        WHERE id = %s
                        """,
                        [itinerary_id]
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def update(self, itinerary_id: int, itinerary: ItineraryIn) -> Union[ItineraryOut, Error]:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE itineraries
                        SET notes = %s
                          , trip_id = %s
                        WHERE id = %s
                        """,
                        [
                            itinerary.notes,
                            itinerary.trip_id,
                            itinerary_id
                        ]
                    )
                    return self.itinerary_in_to_out(itinerary_id, itinerary)
        except Exception as e:
            print(e)
            return {"message": "Could not update that itinerary"}

    def get_all(self) -> Union[List[ItineraryOut], Error]:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our SELECT statement
                    result = db.execute(
                        """
                        SELECT id, notes, trip_id
                        FROM itineraries
                        """
                    )
                    return [
                        self.record_to_itinerary_out(record)
                        for record in result
                    ]
        except Exception as e:
            print(e)
            return {"message": "Could not get all itineraries"}

    def create(self, itinerary: ItineraryIn) -> Union[ItineraryOut, Error]:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our INSERT statement
                    result = db.execute(
                        """
                        INSERT INTO itineraries
                            (notes, trip_id)
                        VALUES
                            (%s, %s)
                        RETURNING id;
                        """,
                        [
                            itinerary.notes,
                            itinerary.trip_id,
                        ]
                    )
                    id = result.fetchone()[0]
                    return self.itinerary_in_to_out(id, itinerary)
        except Exception:
            return {"message": "Create did not work"}

    def itinerary_in_to_out(self, id: int, itinerary: ItineraryIn):
        old_data = itinerary.dict()
        return ItineraryOut(id=id, **old_data)

    def record_to_itinerary_out(self, record):
        return ItineraryOut(
            id=record[0],
            notes=record[1],
            trip_id=record[2],
        )
