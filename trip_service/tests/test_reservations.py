from fastapi.testclient import TestClient
from main import app
from queries.reservations import ReservationRepository

client = TestClient(app)

expected_post_resp = {
    "id": 1,
    "accommodation_name": "Hilton",
    "address": "123 Main St",
    "reservation_num": "EU2789",
    "check_in": "2023-01-25T16:43:00+00:00",
    "check_out": "2023-01-25T16:43:00+00:00",
    "trip_id": 1,
}


class MockReservationQueries:
    def create(self, reservation):
        return expected_post_resp


def test_create_trip():
    req_body = {
        "id": 1,
        "accommodation_name": "Hilton",
        "address": "123 Main St",
        "reservation_num": "EU2789",
        "check_in": "2023-01-25T16:43:00+00:00",
        "check_out": "2023-01-25T16:43:00+00:00",
        "trip_id": 1,
    }
    app.dependency_overrides[ReservationRepository] = MockReservationQueries

    resp = client.post("/reservations", json=req_body)
    actual = resp.json()

    assert resp.status_code == 200
    assert actual == expected_post_resp

    app.dependency_overrides = {}
