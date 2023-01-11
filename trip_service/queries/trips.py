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
    attendees: str
    itinerary_id: Optional[int]

class TripOut(BaseModel):
    id: int
    destination: str
    start_date: date
    end_date: date
    attendees: str
    itinerary_id: Optional[int]

class TripRepository:
    def get_one(self, trip_id: int) -> Optional[TripOut]:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our SELECT statement
                    result = db.execute(
                        """
                        SELECT id
                             , destination
                             , start_date
                             , end_date
                             , attendees
                             , itinerary_id
                        FROM trips
                        WHERE id = %s
                        """,
                        [trip_id]
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_trip_out(record)
        except Exception as e:
            print(e)
            return {"message": "Could not get that trip"}

    def delete(self, trip_id: int) -> bool:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM trips
                        WHERE id = %s
                        """,
                        [trip_id]
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def update(self, trip_id: int, trip: TripIn) -> Union[TripOut, Error]:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE trips
                        SET destination = %s
                          , start_date = %s
                          , end_date = %s
                          , attendees = %s
                          , itinerary_id = %s
                        WHERE id = %s
                        """,
                        [
                            trip.destination,
                            trip.start_date,
                            trip.end_date,
                            trip.attendees,
                            trip.itinerary_id,
                            trip_id
                        ]
                    )
                    # old_data = trip.dict()
                    # return TripOut(id=trip_id, **old_data)
                    return self.trip_in_to_out(trip_id, trip)
        except Exception as e:
            print(e)
            return {"message": "Could not update that trip"}

    def get_all(self) -> Union[List[TripOut], Error]:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our SELECT statement
                    result = db.execute(
                        """
                        SELECT id, destination, start_date, end_date, attendees, itinerary_id
                        FROM trips
                        ORDER BY start_date;
                        """
                    )
                    # result = []
                    # for record in db:
                    #     trip = TripOut(
                    #         id=record[0],
                    #         destination=record[1],
                    #         start_date=record[2],
                    #         end_date=record[3],
                    #         attendees=record[4],
                    #         itinerary_id=record[5],
                    #     )
                    #     result.append(trip)
                    # return result

                    return [
                        self.record_to_trip_out(record)
                        for record in result
                    ]
        except Exception as e:
            print(e)
            return {"message": "Could not get all trips"}

    def create(self, trip: TripIn) -> Union[TripOut, Error]:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our INSERT statement
                    result = db.execute(
                        """
                        INSERT INTO trips
                            (destination, start_date, end_date, attendees, itinerary_id)
                        VALUES
                            (%s, %s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            trip.destination,
                            trip.start_date,
                            trip.end_date,
                            trip.attendees,
                            trip.itinerary_id
                        ]
                    )
                    id = result.fetchone()[0]
                    # Return new data
                    # old_data = trip.dict()
                    # return TripOut(id=id, **old_data)
                    return self.trip_in_to_out(id, trip)
        except Exception:
            return {"message": "Create did not work"}

    def trip_in_to_out(self, id: int, trip: TripIn):
        old_data = trip.dict()
        return TripOut(id=id, **old_data)

    def record_to_trip_out(self, record):
        return TripOut(
            id=record[0],
            destination=record[1],
            start_date=record[2],
            end_date=record[3],
            attendees=record[4],
            itinerary_id=record[5],
        )
