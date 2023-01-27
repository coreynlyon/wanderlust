from pydantic import BaseModel
from typing import Optional, List, Union
from datetime import date
from queries.pool import pool


class Error(BaseModel):
    message: str


class TripIn(BaseModel):
    destination: str
    start_date: date
    end_date: date
    image_url: Optional[str]


class TripOut(BaseModel):
    id: int
    destination: str
    start_date: date
    end_date: date
    image_url: Optional[str]
    creator: int


class TripRepository:
    def get_one(self, trip_id: int) -> Optional[TripOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id
                             , destination
                             , start_date
                             , end_date
                             , image_url
                             , creator
                        FROM trips
                        WHERE id = %s
                        """,
                        [trip_id],
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_trip_out(record)
        except Exception:
            return {"message": "Could not get that trip"}

    def delete(self, trip_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM trips
                        WHERE id = %s
                        """,
                        [trip_id],
                    )
                    return True
        except Exception:
            return False

    def update(
        self, trip_id: int, trip: TripIn, user_id: int
    ) -> Union[TripOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE trips
                        SET destination = %s
                          , start_date = %s
                          , end_date = %s
                          , image_url = %s
                        WHERE id = %s
                        """,
                        [
                            trip.destination,
                            trip.start_date,
                            trip.end_date,
                            trip.image_url,
                            trip_id,
                        ],
                    )
                    return self.trip_in_to_out(trip_id, user_id, trip)
        except Exception:
            return {"message": "Could not update that trip"}

    def get_all(self) -> Union[List[TripOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id
                             , destination
                             , start_date
                             , end_date
                             , image_url
                             , creator
                        FROM trips
                        ORDER BY start_date;
                        """
                    )
                    return [
                        self.record_to_trip_out(record) for record in result
                    ]
        except Exception:
            return {"message": "Could not get all trips"}

    def create(self, trip: TripIn, user_id: int) -> Union[TripOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO trips
                            (destination
                            , start_date
                            , end_date
                            , image_url
                            , creator)
                        VALUES
                            (%s, %s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            trip.destination,
                            trip.start_date,
                            trip.end_date,
                            trip.image_url,
                            user_id,
                        ],
                    )
                    id = result.fetchone()[0]
                    return self.trip_in_to_out(id, user_id, trip)
        except Exception:
            return {"message": "Create did not work"}

    def trip_in_to_out(self, id: int, user_id: int, trip: TripIn):
        old_data = trip.dict()
        return TripOut(id=id, creator=user_id, **old_data)

    def record_to_trip_out(self, record):
        return TripOut(
            id=record[0],
            destination=record[1],
            start_date=record[2],
            end_date=record[3],
            image_url=record[4],
            creator=record[5],
        )
