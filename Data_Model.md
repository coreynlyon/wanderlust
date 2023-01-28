# Data models

## trip_service

---

### Trip

| name             | type   | unique | optional |
| ---------------- | ------ | ------ | -------- |
| id               | int    | yes    | no       |
| destination      | string | no     | no       |
| start_date       | date   | no     | no       |
| end_date         | date   | no     | no       |
| image_url        | string | no     | no       |

### Itinerary

| name                         | type   | unique | optional |
| ---------------------------- | ------ | ------ | -------- |
| id                           | int    | yes    | no       |
| depart_flight_num            | string | no     | no       |
| depart_flight_airline        | string | no     | no       |
| depart_flight_date           | date   | no     | no       |
| return_flight_num            | string | no     | no       |
| return_flight_airline        | string | no     | no       |
| return_flight_date           | date   | no     | no       |
| trip_id                      | int    | yes    | no       |

### Activity

| name             | type   | unique | optional |
| ---------------- | ------ | ------ | -------- |
| id               | int    | yes    | no       |
| activity_name    | string | no     | no       |
| date             | date   | no     | no       |
| place            | string | no     | no       |
| notes            | string | no     | no       |
| trip_id          | int    | yes    | no       |

### Checklist

| name             | type   | unique | optional |
| ---------------- | ------ | ------ | -------- |
| id               | int    | yes    | no       |
| item_name        | string | no     | no       |
| trip_id          | int    | yes    | no       |

### Viewers

| name             | type   | unique | optional |
| ---------------- | ------ | ------ | -------- |
| id               | int    | yes    | no       |
| email            | string | no     | no       |
| trip_id          | int    | no     | no       |

### Reservation

| name                         | type   | unique | optional |
| ---------------------------- | ------ | ------ | -------- |
| id                           | int    | yes    | no       |
| accommodation_name           | string | no     | no       |
| address                      | string | no     | no       |
| reservation_num              | string | no     | no       |
| check_in                     | date   | no     | no       |
| check_out                    | date   | no     | no       |
| trip_id                      | int    | yes    | no       |

### User

| name                         | type   | unique | optional |
| ---------------------------- | ------ | ------ | -------- |
| id                           | int    | yes    | no       |
| first_name                   | string | no     | no       |
| last_name                    | string | no     | no       |
| email                        | string | no     | no       |
| hashed_password              | string | no     | no       |