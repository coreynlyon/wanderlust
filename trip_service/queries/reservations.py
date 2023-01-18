from pydantic import BaseModel
from typing import Optional, List, Union
from datetime import datetime
from queries.pool import pool


class Error(BaseModel):
    message: str


class ReservationIn(BaseModel):
    accommodation_name: str
    address: str
    reservation_num: str
    check_in: datetime
    check_out: datetime
    trip_id: int


class ReservationOut(BaseModel):
    id: int
    accommodation_name: str
    address: str
    reservation_num: str
    check_in: datetime
    check_out: datetime
    trip_id: int


class ReservationRepository:
    def get_one(self, reservation_id: int) -> Optional[ReservationOut]:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our SELECT statement
                    result = db.execute(
                        """
                        SELECT id
                             , accommodation_name
                             , address
                             , reservation_num
                             , check_in
                             , check_out
                             , trip_id
                        FROM reservations
                        WHERE id = %s
                        """,
                        [reservation_id],
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_reservation_out(record)
        except Exception as e:
            print(e)
            return {"message": "Could not get that reservation"}

    def delete(self, reservation_id: int) -> bool:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM reservations
                        WHERE id = %s
                        """,
                        [reservation_id],
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def update(
        self, reservation_id: int, reservation: ReservationIn
    ) -> Union[ReservationOut, Error]:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE reservations
                        SET accommodation_name = %s
                             , address = %s
                             , reservation_num = %s
                             , check_in = %s
                             , check_out = %s
                             , trip_id = %s
                        WHERE id = %s
                        """,
                        [
                            reservation.accommodation_name,
                            reservation.address,
                            reservation.reservation_num,
                            reservation.check_in,
                            reservation.check_out,
                            reservation.trip_id,
                            reservation_id,
                        ],
                    )
                    return self.reservation_in_to_out(
                        reservation_id, reservation
                    )
        except Exception as e:
            print(e)
            return {"message": "Could not update that reservation"}

    def get_res_by_trip_id(
        self, trip_id: int
    ) -> Union[List[ReservationOut], Error]:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our SELECT statement
                    result = db.execute(
                        """
                            SELECT id
                                , accommodation_name
                                , address
                                , reservation_num
                                , check_in
                                , check_out
                                , trip_id
                            FROM reservations
                            WHERE trip_id = %s
                            """,
                        [trip_id],
                    )
                    return [
                        self.record_to_reservation_out(record)
                        for record in result
                    ]
        except Exception as e:
            print(e)
            return {"message": "Could not get reservation with that trip id"}

    def get_all(self) -> Union[List[ReservationOut], Error]:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our SELECT statement
                    result = db.execute(
                        """
                        SELECT id
                             , accommodation_name
                             , address
                             , reservation_num
                             , check_in
                             , check_out
                             , trip_id
                        FROM reservations
                        ORDER BY check_in;
                        """
                    )
                    return [
                        self.record_to_reservation_out(record)
                        for record in result
                    ]
        except Exception as e:
            print(e)
            return {"message": "Could not get all reservations"}

    def create(
        self, reservation: ReservationIn
    ) -> Union[ReservationOut, Error]:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our INSERT statement
                    result = db.execute(
                        """
                        INSERT INTO reservations
                            (accommodation_name
                            , address
                            , reservation_num
                            , check_in
                            , check_out
                            , trip_id)
                        VALUES
                            (%s, %s, %s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            reservation.accommodation_name,
                            reservation.address,
                            reservation.reservation_num,
                            reservation.check_in,
                            reservation.check_out,
                            reservation.trip_id,
                        ],
                    )
                    id = result.fetchone()[0]
                    return self.reservation_in_to_out(id, reservation)
        except Exception:
            return {"message": "Create did not work"}

    def reservation_in_to_out(self, id: int, reservation: ReservationIn):
        old_data = reservation.dict()
        return ReservationOut(id=id, **old_data)

    def record_to_reservation_out(self, record):
        print(record)
        return ReservationOut(
            id=record[0],
            accommodation_name=record[1],
            address=record[2],
            reservation_num=record[3],
            check_in=record[4],
            check_out=record[5],
            trip_id=record[6],
        )
