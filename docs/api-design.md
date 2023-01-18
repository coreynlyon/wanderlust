### Log in
* Endpoint path: /token
* Endpoint method: POST

* Request shape (form):
  * username: string
  * password: string

* Response: Account information and a token
* Response shape (JSON):
    ```json
    {
      "account": {
        «key»: type»,
      },
      "token": string
    }
    ```

### Log out
* Endpoint path: /token
* Endpoint method: DELETE

* Headers:
  * Authorization: Bearer token

* Response: Always true
* Response shape (JSON):
    ```json
    true
    ```

### Create New Trip
* Endpoint path: /trip/new
* Endpoint method: POST

* Headers:
  * Authorization: Bearer token

* Request shape (JSON):
    ```json
    {
        "destination": string,
        "start_date": date,
        "end_date": date,
        "travel_buddy": string,
        "itinerary_id": number
    }
    ```

* Response: Indication of success or failure
* Response shape (JSON):
    ```json
    {
        "success": boolean,
        "message": string
    }
    ```

### Get List of Trips
* Endpoint path: /trip/list
* Endpoint method: GET

* Headers:
  * Authorization: Bearer token

* Response: A list of trips
* Response shape (JSON):
    ```json
    {
        "trips": [
            {
                "trip_id": number,
                "destination": string,
                "start_date": date,
                "end_date": date,
                "travel_buddy": string,
                "itinerary_id": number
            }
        ]
    }
    ```

### Update a Trip
* Endpoint path: /trip/{id}
* Endpoint method: PUT

* Headers:
  * Authorization: Bearer token

* Request shape (JSON):
    ```json
    {
        "destination": string,
        "start_date": date,
        "end_date": date,
        "view_option": string,
        "travel_buddy": string,
        "itinerary_id": number
    }
    ```

* Response: Returns updated trip
* Response shape (JSON):
    ```json
    {
        "destination": string,
        "start_date": date,
        "end_date": date,
        "view_option": string,
        "travel_buddy": string,
        "itinerary_id": number
    }
    ```

### Create New Itinerary
* Endpoint path: /itinerary/new
* Endpoint method: POST

* Headers:
  * Authorization: Bearer token

* Request shape (JSON):
    ```json
    {
        "destination": string,
        "description": string,
        "attendees": string,
        "notes": string,
        "activity": string
    }
    ```

* Response: Indication of success or failure
* Response shape (JSON):
    ```json
    {
        "success": boolean,
        "message": string
    }
    ```

### Get List of Itineraries
* Endpoint path: /itinerary/list
* Endpoint method: GET

* Headers:
  * Authorization: Bearer token

* Response: A list of itineraries
* Response shape (JSON):
    ```json
    {
        "itineraries": [
            {
                "itinerary_id": number,
                "destination": string,
                "description": string,
                "attendees": string,
                "notes": string,
                "activity": string
            }
        ]
    }
    ```

### Update an Itinerary
* Endpoint path: /itinerary/{id}
* Endpoint method: PUT

* Headers:
  * Authorization: Bearer token

* Request shape (JSON):
    ```json
    {
        "destination": string,
        "description": string,
        "attendees": string,
        "notes": string,
        "activity": string
    }
    ```

* Response: Returns updated itinerary
* Response shape (JSON):
    ```json
    {
        "itinerary_id": number,
        "destination": string,
        "description": string,
        "attendees": string,
        "notes": string,
        "activity": string
    }
    ```

### Create New Activity
* Endpoint path: /activity/new
* Endpoint method: POST

* Headers:
  * Authorization: Bearer token

* Request shape (JSON):
    ```json
    {
        "activity_name": string,
        "place": string,
        "notes": string,
    }
    ```

* Response: Indication of success or failure
* Response shape (JSON):
    ```json
    {
        "success": boolean,
        "message": string
    }
    ```

### Get List of Activities
* Endpoint path: /activity/list
* Endpoint method: GET

* Headers:
  * Authorization: Bearer token

* Response: A list of activities
* Response shape (JSON):
    ```json
    {
        "activities": [
            {
                "activity_id": number,
                "activity_name": string,
                "place": string,
                "notes": string,
            }
        ]
    }
    ```

### Update an Activity
* Endpoint path: /activity/{id}
* Endpoint method: PUT

* Headers:
  * Authorization: Bearer token

* Request shape (JSON):
    ```json
    {
        "activity_name": string,
        "place": string,
        "notes": string,
    }
    ```

* Response: Returns updated activity
* Response shape (JSON):
    ```json
    {
        "activity_id": number,
        "activity_name": string,
        "place": string,
        "notes": string,
    }
    ```

### Delete an Activity
* Endpoint path: /activity/{id}
* Endpoint method: DELETE

* Headers:
  * Authorization: Bearer token

* Response: Indication of success or failure
* Response shape (JSON):
    ```json
    {
        "success": boolean,
        "message": string
    }
    ```

### Create Checklist
* Endpoint path: /checklist/new
* Endpoint method: POST

* Headers:
  * Authorization: Bearer token

* Request shape (JSON):
    ```json
    {
        "checklist_items": string
    }
    ```

* Response: Indication of success or failure
* Response shape (JSON):
    ```json
    {
        "success": boolean,
        "message": string
    }
    ```

### Get List of Items In Checklist
* Endpoint path: /checklist/list
* Endpoint method: GET

* Headers:
  * Authorization: Bearer token

* Response: A list of items in checklist
* Response shape (JSON):
    ```json
    {
        "checklists": [
            {
                "checklist_id": number,
                "checklist_items": string,
            }
        ]
    }
    ```

### Update a Checklist
* Endpoint path: /checklist/{id}
* Endpoint method: PUT

* Headers:
  * Authorization: Bearer token

* Request shape (JSON):
    ```json
    {
        "checklist_items": string,
    }
    ```

* Response: Returns updated checklist
* Response shape (JSON):
    ```json
    {
        "checklist_id": number,
        "checklist_items": string,
    }
    ```

### Delete an Checklist
* Endpoint path: /checklist/{id}
* Endpoint method: DELETE

* Headers:
  * Authorization: Bearer token

* Response: Indication of success or failure
* Response shape (JSON):
    ```json
    {
        "success": boolean,
        "message": string
    }
    ```
