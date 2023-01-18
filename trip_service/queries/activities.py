from pydantic import BaseModel
from queries.pool import pool
from typing import List, Union, Optional
from datetime import date


class Error(BaseModel):
    message: str


class ActivityIn(BaseModel):
    title: str
    date: date
    place: str
    notes: str


class ActivityOut(BaseModel):
    id: int
    title: str
    date: date
    place: str
    notes: str


class ActivityRepository:
    def get_one(self, activity_id: int) -> Optional[ActivityOut]:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id
                                , title
                                , date
                                , place
                                , notes
                        FROM activities
                        WHERE id = %s
                        ORDER BY date
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
            # connect the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
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
            # connect the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE activities
                        SET title = %s
                            , date = %s
                            , place = %s
                            , notes = %s
                        WHERE id = %s
                        """,
                        [
                            activity.title,
                            activity.date,
                            activity.place,
                            activity.notes,
                            activity_id,
                        ],
                    )

                return self.activity_in_to_out(activity_id, activity)
        except Exception:
            return {"message": "Could not update the activity"}

    def get_all(self) -> Union[Error, List[ActivityOut]]:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # run our SELECT statement
                    result = db.execute(
                        """
                        SELECT id, title, date, place, notes
                        FROM activities
                        ORDER BY date
                        """
                    )
                    # result = []
                    # for record in db:
                    #     activity = ActivityOut(
                    #             id=record[0],
                    #             title=record[1],
                    #             place=record[2],
                    #             notes=record[3],
                    #     )
                    #     result.append(activity)
                    # return result

                    return [
                        self.record_to_activity_out(record)
                        for record in result
                    ]

        except Exception:
            return {"message": "Could not get all activities"}

    def create(self, activity: ActivityIn) -> Union[ActivityOut, Error]:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # run our INSERT statement
                    result = db.execute(
                        """
                        INSERT INTO activities
                            (title, date, place, notes)
                        VALUES
                            (%s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            activity.title,
                            activity.date,
                            activity.place,
                            activity.notes,
                        ],
                    )
                    id = result.fetchone()[0]
                    # return new data
                    # old_data = activity.dict()
                    # return ActivityOut(id=id, **old_data)
                    return self.activity_in_to_out(id, activity)
        except Exception:
            return {"message": "Create did not work"}

    def activity_in_to_out(self, id: int, activity: ActivityIn):
        old_data = activity.dict()
        return ActivityOut(id=id, **old_data)

    def record_to_activity_out(self, record):
        return ActivityOut(
            id=record[0],
            title=record[1],
            date=record[2],
            place=record[3],
            notes=record[4],
        )
