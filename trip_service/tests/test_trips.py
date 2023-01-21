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
    "image_url": "https://www.state.gov/wp-content/uploads/2019/04/Japan-2107x1406.jpg",
}

trips = [
    expected_post_resp,
    {
        "id": 2,
        "destination": "New York",
        "start_date": "2023-01-18",
        "end_date": "2023-01-20",
        "attendees": "Nate, Caleb",
        "image_url": "https://www.travelandleisure.com/thmb/91pb8LbDAUwUN_11wATYjx5oF8Q=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/new-york-city-evening-NYCTG0221-52492d6ccab44f328a1c89f41ac02aea.jpg",
    },
    {
        "id": 3,
        "destination": "Hawaii",
        "start_date": "2023-01-18",
        "end_date": "2023-01-21",
        "attendees": "Bette, Corey",
        "image_url": "https://media.istockphoto.com/id/938335974/photo/aerial-view-of-kualoa-area-of-oahu-hawaii.jpg?s=612x612&w=0&k=20&c=OqqkjtRGFffwCx5Ac4kyfO9AReN-wnc6hGW8jJp7vok=",
    }
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
        "image_url": "https://www.state.gov/wp-content/uploads/2019/04/Japan-2107x1406.jpg",
    }
    app.dependency_overrides[TripRepository] = MockTripQueries

    # Act
    resp = client.post('/trips', json=req_body)
    actual = resp.json()

    # Assert
    assert resp.status_code == 200
    assert actual == expected_post_resp

    # clean up
    app.dependency_overrides = {}

def test_get_trips():
    app.dependency_overrides[TripRepository] = MockTripQueries

    resp1 = client.get('/trips')
    actual = resp1.json()

    assert resp1.status_code == 200
    assert actual == { "trips": [trips[1]] }

    # resp2 = client.get('/api/trips')
    # actual2 = resp2.json()
    # assert resp2.status_code == 200
    # assert len(actual2['trips']) == 1

    app.dependency_overrides = {}
