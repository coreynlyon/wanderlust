# from fastapi.testclient import TestClient
# from main import app
# from .queries import activities

# client = TestClient(app)

# expected_post_resp = {
#     "title": "",
#     "date": "",
#     "placec": "American",
#     "notes": {
#         "id": 1,
#         "first": "joe",
#         "last": "schmo",
#         "avatar": "joes_profile_pic.png",
#         "email": "joe@quesoamr.com",
#     },
# }

# trucks = [expected_post_resp]


# class MockTruckQueries:
#     def create_truck(self, new_truck):
#         return expected_post_resp

#     def get_trucks(self, category):
#         return [truck for truck in trucks if truck.category == category]

#     def test_create_truckc():
#         # Arrange
#         req_body = {"name": "", "website": "", "category": "American"}

#         app.dependency_overrides[TruckQueries] = MockTruckQueries
#         # Act
#         resp = client.post("/api/trucks", json=req_body)
#         actual = resp.json()

#         # Assert
#         assert resp.status_code == 200
#         assert actual == expected_post_resp

#         # clean up
#         app.dependency_overrides = {}

#     def test_get_trucks_category_param():
#         app.dependency_overrides[TruckQueries] = MockTruckQueries

#         resp1 = client.get("/api/trucks?category=Mexican")
#         actual = resp1.json()

#         assert resp1.status_code == 200
#         assert actual == {"trucks": [trucks[1]]}

#         # resp2 = client.get('/api/trucks?category=American')

#         app.dependency_overrides = {}
