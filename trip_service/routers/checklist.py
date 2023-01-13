from fastapi import APIRouter
from queries.checklist import ChecklistIn

router = APIRouter()

@router.post("/checklist")
def create_checklist(checklist: ChecklistIn):
    pass

@router.get("/checklist")
def view_checklist(checklist: ChecklistIn):
    pass

@router.put("/checklist")
def update_checklist(checklist: ChecklistIn):
    pass

@router.delete("/checklist")
def delete_checklist(checklist: ChecklistIn):
    pass
