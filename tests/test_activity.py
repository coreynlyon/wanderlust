from fastapi import Depends, FastAPI
from fastapi.testclient import TestClient
from datetime import date
from trip_service.routers.activities import (
    ActivityIn, ActivityOut, ActivityRepository
)

app = FastAPI()
client = TestClient(app)


class FakeActivityRespository:
    def create(self, activity):
        return ActivityOut(
            id=1,
            title=activity.title,
            date=activity.date,
            place=activity.place,
            notes=activity.notes
            )


def test_create_activity():
    # Arrange
    activity_in = ActivityIn(title="abc", date=date(2022, 1, 1), place="seattle", notes="rainy")
    expected_activity = ActivityOut(
        id=1,
        title="abc",
        date=date(2022, 1, 1),
        place="seattle",
        notes="rainy"
        )
    app.dependency_overrides[ActivityRepository] = FakeActivityRespository
    # Act

    # Assert
    response = client.post("/activities", json=activity_in.dict())
    assert response.status_code == 200
    assert response.json() == expected_activity
