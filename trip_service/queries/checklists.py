from pydantic import BaseModel
from typing import Optional, List, Union
from queries.pool import pool


class Error(BaseModel):
    message: str


class ChecklistIn(BaseModel):
    item_name: str
    trip_id: int


class ChecklistOut(BaseModel):
    id: int
    item_name: str
    trip_id: int


class ChecklistRepository:
    def get_one(self, checklist_id: int) -> Optional[ChecklistOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id
                             , item_name
                             , trip_id
                        FROM checklists
                        WHERE id = %s
                        """,
                        [checklist_id],
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_checklist_out(record)
        except Exception:
            return {"message": "Could not get that checklist"}

    def delete(self, checklist_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM checklists
                        WHERE id = %s
                        """,
                        [checklist_id],
                    )
                    return True
        except Exception:
            return False

    def update(
        self, checklist_id: int, checklist: ChecklistIn
    ) -> Union[ChecklistOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE checklists
                        SET item_name = %s
                          , trip_id = %s
                        WHERE id = %s
                        """,
                        [checklist.item_name, checklist.trip_id, checklist_id],
                    )
                    return self.checklist_in_to_out(checklist_id, checklist)
        except Exception:
            return {"message": "Could not update that checklist"}

    def get_checklist_by_trip_id(
        self, trip_id: int
    ) -> Union[List[ChecklistOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id
                             , item_name
                             , trip_id
                        FROM checklists
                        WHERE trip_id=%s
                        """,
                        [trip_id],
                    )
                    return [
                        self.record_to_checklist_out(record)
                        for record in result
                    ]
        except Exception:
            return {
                "message": "Could not get checklist item with that trip id"
            }

    def get_all(self) -> Union[List[ChecklistOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id
                             , item_name
                             , trip_id
                        FROM checklists
                        """
                    )
                    return [
                        self.record_to_checklist_out(record)
                        for record in result
                    ]
        except Exception:
            return {"message": "Could not get all checklists"}

    def create(self, checklist: ChecklistIn) -> Union[ChecklistOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO checklists
                            (item_name, trip_id)
                        VALUES
                            (%s, %s)
                        RETURNING id;
                        """,
                        [
                            checklist.item_name,
                            checklist.trip_id,
                        ],
                    )
                    id = result.fetchone()[0]
                    return self.checklist_in_to_out(id, checklist)
        except Exception:
            return {"message": "Create did not work"}

    def checklist_in_to_out(self, id: int, checklist: ChecklistIn):
        old_data = checklist.dict()
        return ChecklistOut(id=id, **old_data)

    def record_to_checklist_out(self, record):
        return ChecklistOut(
            id=record[0],
            item_name=record[1],
            trip_id=record[2],
        )
