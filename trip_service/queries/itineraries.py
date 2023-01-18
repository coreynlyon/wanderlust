from pydantic import BaseModel
from typing import Optional, List, Union
from datetime import datetime, date
from queries.pool import pool


class Error(BaseModel):
    message: str


class ItineraryIn(BaseModel):
    depart_flight_num: str
    depart_flight_airline: str
    depart_flight_date: datetime
    return_flight_num: str
    return_flight_airline: str
    return_flight_date: datetime
    trip_id: int


class ItineraryOut(BaseModel):
    id: int
    depart_flight_num: str
    depart_flight_airline: str
    depart_flight_date: datetime
    return_flight_num: str
    return_flight_airline: str
    return_flight_date: datetime
    trip_id: int
    destination: Optional[str]
    start_date: Optional[date]
    end_date: Optional[date]
    attendees: Optional[str]
    image_url: Optional[str]


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
                        SELECT i.id
                             , i.depart_flight_num
                             , i.depart_flight_airline
                             , i.depart_flight_date
                             , i.return_flight_num
                             , i.return_flight_airline
                             , i.return_flight_date
                             , i.trip_id
                             , t.destination
                             , t.start_date
                             , t.end_date
                             , t.attendees
                             , t.image_url
                        FROM itineraries i
                        LEFT JOIN trips t ON (i.trip_id=t.id)
                        WHERE i.id = %s
                        """,
                        [itinerary_id],
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
                        [itinerary_id],
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def update(
        self, itinerary_id: int, itinerary: ItineraryIn
    ) -> Union[ItineraryOut, Error]:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE itineraries
                        SET depart_flight_num = %s
                             , depart_flight_airline = %s
                             , depart_flight_date = %s
                             , return_flight_num = %s
                             , return_flight_airline = %s
                             , return_flight_date = %s
                             , trip_id = %s
                        WHERE id = %s
                        """,
                        [
                            itinerary.depart_flight_num,
                            itinerary.depart_flight_airline,
                            itinerary.depart_flight_date,
                            itinerary.return_flight_num,
                            itinerary.return_flight_airline,
                            itinerary.return_flight_date,
                            itinerary.trip_id,
                            itinerary_id,
                        ],
                    )
                    return self.itinerary_in_to_out(itinerary_id, itinerary)
        except Exception as e:
            print(e)
            return {"message": "Could not update that itinerary"}

    def get_itin_by_trip_id(self, trip_id: int) -> Optional[ItineraryOut]:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our SELECT statement
                    result = db.execute(
                        """
                            SELECT i.id
                             , i.depart_flight_num
                             , i.depart_flight_airline
                             , i.depart_flight_date
                             , i.return_flight_num
                             , i.return_flight_airline
                             , i.return_flight_date
                             , i.trip_id
                             , t.destination
                             , t.start_date
                             , t.end_date
                             , t.attendees
                             , t.image_url
                            FROM itineraries i
                            LEFT JOIN trips t ON (i.trip_id=t.id)
                            WHERE i.trip_id = %s
                            """,
                        [trip_id],
                    )
                    return [
                        self.record_to_itinerary_out(record)
                        for record in result
                    ]
        except Exception as e:
            print(e)
            return {"message": "Could not get itinerary with that trip id"}

    def get_all(self) -> Union[List[ItineraryOut], Error]:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our SELECT statement
                    result = db.execute(
                        """
                        SELECT i.id
                             , i.depart_flight_num
                             , i.depart_flight_airline
                             , i.depart_flight_date
                             , i.return_flight_num
                             , i.return_flight_airline
                             , i.return_flight_date
                             , i.trip_id
                             , t.destination
                             , t.start_date
                             , t.end_date
                             , t.attendees
                             , t.image_url
                        FROM itineraries i
                        LEFT JOIN trips t ON (i.trip_id=t.id)
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
                            (depart_flight_num
                            , depart_flight_airline
                            , depart_flight_date
                            , return_flight_num
                            , return_flight_airline
                            , return_flight_date
                            , trip_id)
                        VALUES
                            (%s, %s, %s, %s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            itinerary.depart_flight_num,
                            itinerary.depart_flight_airline,
                            itinerary.depart_flight_date,
                            itinerary.return_flight_num,
                            itinerary.return_flight_airline,
                            itinerary.return_flight_date,
                            itinerary.trip_id,
                        ],
                    )
                    id = result.fetchone()[0]
                    return self.itinerary_in_to_out(id, itinerary)
        except Exception as e:
            # return {"message": "Create did not work"}
            return Error(message=str(e))

    def itinerary_in_to_out(self, id: int, itinerary: ItineraryIn):
        old_data = itinerary.dict()
        return ItineraryOut(id=id, **old_data)

    def record_to_itinerary_out(self, record):
        print(record)
        return ItineraryOut(
            id=record[0],
            depart_flight_num=record[1],
            depart_flight_airline=record[2],
            depart_flight_date=record[3],
            return_flight_num=record[4],
            return_flight_airline=record[5],
            return_flight_date=record[6],
            trip_id=record[7],
            destination=record[8],
            start_date=record[9],
            end_date=record[10],
            attendees=record[11],
            image_url=record[12],
        )
