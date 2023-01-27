from pydantic import BaseModel
from typing import Optional, List, Union
from datetime import date
from queries.pool import pool


class Error(BaseModel):
    message: str


class ActivityIn(BaseModel):
    activity_name: str
    place: str
    date: date
    notes: Optional[str]
    trip_id: int


class ActivityOut(BaseModel):
    id: int
    activity_name: str
    place: str
    date: date
    notes: Optional[str]
    trip_id: int


class ActivityRepository:
    def get_one(self, activity_id: int) -> Optional[ActivityOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id
                             , activity_name
                             , place
                             , date
                             , notes
                             , trip_id
                        FROM activities
                        WHERE id = %s
                        """,
                        [activity_id],
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_activity_out(record)
        except Exception:
            return {"message": "Could not get that activity"}

    def delete(self, activity_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM activities
                        WHERE id = %s
                        """,
                        [activity_id],
                    )
                    return True
        except Exception:
            return False

    def update(
        self, activity_id: int, activity: ActivityIn
    ) -> Union[ActivityOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE activities
                        SET activity_name = %s
                          , place = %s
                          , date = %s
                          , notes = %s
                          , trip_id = %s
                        WHERE id = %s
                        """,
                        [
                            activity.activity_name,
                            activity.place,
                            activity.date,
                            activity.notes,
                            activity.trip_id,
                            activity_id,
                        ],
                    )
                    return self.activity_in_to_out(activity_id, activity)
        except Exception:
            return {"message": "Could not update that activity"}

    def get_act_by_trip_id(
        self, trip_id: int
    ) -> Union[List[ActivityOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id
                             , activity_name
                             , place
                             , date
                             , notes
                             , trip_id
                        FROM activities
                        WHERE trip_id=%s
                        ORDER BY date;
                        """,
                        [trip_id],
                    )
                    return [
                        self.record_to_activity_out(record)
                        for record in result
                    ]
        except Exception:
            return {"message": "Could not get activities with that trip id"}

    def get_all(self) -> Union[List[ActivityOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id
                             , activity_name
                             , place
                             , date
                             , notes
                             , trip_id
                        FROM activities
                        ORDER BY date;
                        """
                    )
                    return [
                        self.record_to_activity_out(record)
                        for record in result
                    ]
        except Exception:
            return {"message": "Could not get all activities"}

    def create(self, activity: ActivityIn) -> Union[ActivityOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO activities
                            (activity_name, place, date, notes, trip_id)
                        VALUES
                            (%s, %s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            activity.activity_name,
                            activity.place,
                            activity.date,
                            activity.notes,
                            activity.trip_id,
                        ],
                    )
                    id = result.fetchone()[0]
                    return self.activity_in_to_out(id, activity)
        except Exception:
            return {"message": "Create did not work"}

    def activity_in_to_out(self, id: int, activity: ActivityIn):
        old_data = activity.dict()
        return ActivityOut(id=id, **old_data)

    def record_to_activity_out(self, record):
        return ActivityOut(
            id=record[0],
            activity_name=record[1],
            place=record[2],
            date=record[3],
            notes=record[4],
            trip_id=record[5],
        )
