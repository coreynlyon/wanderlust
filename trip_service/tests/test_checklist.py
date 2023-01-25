from fastapi.testclient import TestClient

from main import app
from queries.checklists import ChecklistRepository


client = TestClient(app)


class TestChecklistRepository:
    def get_all(self):
        return [checklist]


checklist = {
  "id": 2,
  "item_name": "string",
  "trip_id": 1
}


def test_get_all():

    app.dependency_overrides[ChecklistRepository] = TestChecklistRepository

    response = client.get("/checklists")

    assert response.status_code == 200
    assert response.json() == [checklist]

    app.dependency_overrides = {}
