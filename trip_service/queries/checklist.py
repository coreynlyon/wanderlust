from pydantic import BaseModel

class ChecklistIn(BaseModel):
    checklist_item: str
