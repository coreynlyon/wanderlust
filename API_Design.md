# APIs

## Trips

- **Method**: `POST`, `GET`, `PUT`, `DELETE`
- **Path**: `/wanderlust/trips`, `/trips`, `/trips/{trip_id}`

Input:

```json
{
  "destination": "string",
  "start_date": "date",
  "end_date": "date",
  "attendees": "string",
  "image_url": "string"
}
```

Output:

```json
{
  "id": 0,
  "destination": "string",
  "start_date": "date",
  "end_date": "date",
  "attendees": "string",
  "image_url": "string"
}
```

Creating a new trip saves the id, destination, start_date, end_date, attendees, and image.


## Itineraries

- **Method**: `POST`, `GET`, `PUT`, `DELETE`,
- **Path**: `/itineraries`, `/itineraries/{itinerary_id}`, `/itineraries/trip/{trip_id}`

Input:

```json
{
  "depart_flight_num": "string",
  "depart_flight_airline": "string",
  "depart_flight_date": "date",
  "return_flight_num": "string",
  "return_flight_airline": "string",
  "return_flight_date": "date",
  "trip_id": "int"
}
```

Output:

```json
{
  "id": "int",
  "depart_flight_num": "string",
  "depart_flight_airline": "string",
  "depart_flight_date": "date",
  "return_flight_num": "string",
  "return_flight_airline": "string",
  "return_flight_date": "date",
  "trip_id": "int",
  "destination": "string",
  "start_date": "date",
  "end_date": "date",
  "attendees": "string",
  "image_url": "string"
}
```

Creating a new itinerary saves the id, depart_flight_num, depart_flight_airline, depart_flight_date, return_flight_num, return_flight_airline, return_flight_date, trip_id, destination, start_date, end_date, attendees, image. This adds a new existing itineraries to the database which can be added or editied by a user.

## Reservations

- Method: `GET`, `POST`, `PUT`, `DELETE`
- Path: `/reservations`, `/reservations/{reservation_id}`, `/reservations/trip/{trip_id}`

Input:

```json
{
  "accommodation_name": "string",
  "address": "string",
  "reservation_num": "string",
  "check_in": "date",
  "check_out": "date",
  "trip_id": "int"
}
```

Output:

```json
{
  "id": "int",
  "accommodation_name": "string",
  "address": "string",
  "reservation_num": "string",
  "check_in": "date",
  "check_out": "date",
  "trip_id": "int"
}
```

Creating a new reservation saves the id, accommodation_name, address, reservation_num, check_in, check_out, trip_id.

## Activities

- Method: `GET`, `POST`, `PUT`, `DELETE`
- Path: `/activities`, `/activities/{activitiy_id}`, `/activities/trip/{trip_id}`

Input:

```json
{
  "activity_name": "string",
  "place": "string",
  "date": "date",
  "notes": "string",
  "trip_id": "int"
}
```

Output:

```json
{
  "id": "int",
  "activity_name": "string",
  "place": "string",
  "date": "date",
  "notes": "string",
  "trip_id": "int"
}
```

Creating a new activity saves the id, activity_name, place, notes, date, trip_id. 
This adds a new activity to related trip to the database which can be added or editied by a user.

## Checklists

- Method: `GET`, `POST`, `PUT`, `DELETE`
- Path: `/checklists`, `/checklists/{checklist_id}`, `/checklists/trip/{trip_id}`

Input:

```json
{
  "item_name": "string",
  "trip_id": 0
}
```

Output:

```json
{
  "id": 0,
  "item_name": "string",
  "trip_id": 0
}
```

Creating a new checklist saves the id, item_name, trip_id. 
This adds a new checklist to related activity to the database which can be added or editied by a user.


## Token

- Method: `GET`, `POST`, `DELETE`
- Path: `/token`

Input:

```
grant_type: "string"
pattern: password
username: "string"
password: "string"
scope: "string"
client_id: "string"
client_secret: "string"
```

Output:

```json
{
  "access_token": "string",
  "token_type": "Bearer"
}
```

Creating a new token for the authorization.


## Users

- Method: `GET`, `POST`, `PUT`, `DELETE`
- Path: `/users`, `/users/{user_id}`

Input:

```json
{
  "first_name": "string",
  "last_name": "string",
  "email": "string",
  "password": "string"
}
```

Output:

```json
{
  "access_token": "string",
  "token_type": "Bearer",
  "user": {
    "id": "int",
    "first_name": "string",
    "last_name": "string",
    "email": "string"
  }
}
```

Creating a new user saves access_token, user(id, first_name, last_name, and email) and it will give users authorization for restriced behaviors on our application
