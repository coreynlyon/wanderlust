from fastapi.testclient import TestClient
from main import app
from queries.trips import TripRepository

client = TestClient(app)

expected_post_resp = {
    "id": 1,
    "destination": "Japan",
    "start_date": "2023-01-20",
    "end_date": "2023-01-20",
    "attendees": "Frank",
    "image_url": "https://www.state.gov/Japan-2107x1406.jpg",
}

trips = [
    expected_post_resp,
    {
        "id": 2,
        "destination": "New York",
        "start_date": "2023-01-18",
        "end_date": "2023-01-20",
        "attendees": "Nate, Caleb",
        "image_url": "https://www.travelandleisure.com/",
    },
    {
        "id": 3,
        "destination": "Hawaii",
        "start_date": "2023-01-18",
        "end_date": "2023-01-21",
        "attendees": "Bette, Corey",
        "image_url": "https://media.istockphoto.com/id/938335974/",
    },
]


class MockTripQueries:
    def create(self, new_trip):
        return expected_post_resp

    def get_all(self):
        return [trip for trip in trips]


def test_create_trip():
    # Arrange
    req_body = {
        "id": 1,
        "destination": "Japan",
        "start_date": "2023-01-20",
        "end_date": "2023-01-20",
        "attendees": "Frank",
        "image_url": "https://www.state.gov/Japan-2107x1406.jpg",
    }
    app.dependency_overrides[TripRepository] = MockTripQueries

    # Act
    resp = client.post("/trips", json=req_body)
    actual = resp.json()

    # Assert
    assert resp.status_code == 200
    assert actual == expected_post_resp

    # Clean up
    app.dependency_overrides = {}


def test_get_trips():
    # Arrange
    app.dependency_overrides[TripRepository] = MockTripQueries

    # Act
    resp1 = client.get("/trips")
    actual = resp1.json()

    # Assert
    assert resp1.status_code == 200
    assert actual == trips

    # Clean up
    app.dependency_overrides = {}
