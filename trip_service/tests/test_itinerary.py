from fastapi.testclient import TestClient
from main import app
from queries.itineraries import ItineraryRepository

client = TestClient(app)

expected_post_resp = {
    "id": 1,
    "depart_flight_num": "UA231",
    "depart_flight_airline": "United",
    "depart_flight_date": "2023-01-20T16:43:00+00:00",
    "return_flight_num": "SW213",
    "return_flight_airline": "Southwest",
    "return_flight_date": "2023-01-25T16:43:00+00:00",
    "trip_id": 1,
    "destination": "Japan",
    "start_date": "2023-01-21",
    "end_date": "2023-01-24",
    "attendees": "Frank",
    "image_url": "https://www.state.gov/Japan-2107x1406.jpg",
}

itineraries = [
    expected_post_resp,
    {
        "id": 0,
        "depart_flight_num": "string",
        "depart_flight_airline": "string",
        "depart_flight_date": "2023-01-24T02:15:13.559000+00:00",
        "return_flight_num": "string",
        "return_flight_airline": "string",
        "return_flight_date": "2023-01-24T02:15:13.559000+00:00",
        "trip_id": 0,
        "destination": "string",
        "start_date": "2023-01-24",
        "end_date": "2023-01-24",
        "attendees": "string",
        "image_url": "string",
    },
]


class MockItineraryQueries:
    def create(self, itinerary):
        return expected_post_resp

    def get_all(self):
        return [itinerary for itinerary in itineraries]


def test_create_itinerary():
    # Arrange
    req_body = {
        "id": 1,
        "depart_flight_num": "UA231",
        "depart_flight_airline": "United",
        "depart_flight_date": "2023-01-20T16:43:00+00:00",
        "return_flight_num": "SW213",
        "return_flight_airline": "Southwest",
        "return_flight_date": "2023-01-25T16:43:00+00:00",
        "trip_id": 1,
    }
    app.dependency_overrides[ItineraryRepository] = MockItineraryQueries

    # Act
    resp = client.post("/itineraries", json=req_body)
    actual = resp.json()

    # Assert
    assert resp.status_code == 200
    assert actual == expected_post_resp

    # Clean up
    app.dependency_overrides = {}


def test_get_itineraries():
    # Arrange
    app.dependency_overrides[ItineraryRepository] = MockItineraryQueries

    # Act
    resp1 = client.get("/itineraries")
    actual = resp1.json()

    # Assert
    assert resp1.status_code == 200
    assert actual == itineraries

    # Clean up
    app.dependency_overrides = {}
