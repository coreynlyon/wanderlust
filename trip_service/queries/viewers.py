from pydantic import BaseModel
from typing import List, Union
from queries.pool import pool


class Error(BaseModel):
    message: str


class ViewersIn(BaseModel):
    email: str
    trip_id: int


class ViewersOut(BaseModel):
    id: int
    email: str
    trip_id: int


class ViewersRepository:
    def can_view(self, email: str) -> Union[List[int], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT trip_id
                        FROM viewers
                        WHERE email = %s
                        """,
                        [email],
                    )
                    return [record[0] for record in result]
        except Exception:
            return {"message": "You can't view this trip"}

    def add_viewers(self, viewer: ViewersIn) -> Union[ViewersOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO viewers
                            (email, trip_id)
                        VALUES
                            (%s, %s)
                        RETURNING id;
                        """,
                        [
                            viewer.email,
                            viewer.trip_id,
                        ],
                    )
                    id = result.fetchone()[0]
                    return self.viewers_in_to_out(id, viewer)
        except Exception:
            return {"message": "Could not add viewer to trip"}

    def viewers_in_to_out(self, id: int, viewers: ViewersIn):
        old_data = viewers.dict()
        return ViewersOut(id=id, **old_data)

    def record_to_viewers_out(self, record):
        return ViewersOut(
            id=record[0],
            email=record[1],
            trip_id=record[2],
        )
