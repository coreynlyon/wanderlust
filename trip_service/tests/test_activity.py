from fastapi import Depends, FastAPI
from fastapi.testclient import TestClient
from datetime import date
from routers.activities import (
    ActivityIn, ActivityOut, ActivityRepository
)

from main import app

# app = FastAPI()
client = TestClient(app)


class FakeActivityRespository:
    def create(self, activity):
        return ActivityOut(
            id=1,
            activity_name=activity.activity_name,
            place=activity.place,
            date=activity.date,
            notes=activity.notes,
            trip_id=activity.trip_id
            )


def test_create_activity():
    # Arrange
    activity_in = ActivityIn(
        activity_name="abc",
        place="seattle",
        date=date(2022, 1, 1),
        notes="rainy",
        trip_id=1
        )
    activity_in.date = activity_in.date.isoformat()

    expected_activity = ActivityOut(
        id=1,
        activity_name="abc",
        place="seattle",
        date=date(2022, 1, 1),
        notes="rainy",
        trip_id=1
        )

    expected_activity.date = expected_activity.date.isoformat()

    app.dependency_overrides[ActivityRepository] = FakeActivityRespository

    # Act
    response = client.post("/activities", json=activity_in.dict())
    # Assert
    assert response.status_code == 200
    assert response.json() == expected_activity.dict()
