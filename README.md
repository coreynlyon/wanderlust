# Wanderlust
Say goodbye to the stress of planning your next adventure and hello to Wanderlust, the ultimate travel companion that takes care of all your itinerary needs!

## Group
- Nate Seon
- Tracey Chung
- Corey Lyon
- Caleb Lee
- Bette La

## Design
[Link to Wireframes](docs/wireframes/wireframe.png)


## API design
[Link to API Design](API_Design.md)<br>


## Data model
[Link to Data Model](Data_Model.md)<br>


## GHI
[Link to GHI](docs/ghi-design.md)<br>


## Intended market
We are primarily focused on catering towards consumers who are finding ways to optimize itinerary planning and distribution. Consumers who love to travel, but have a hard time empirically planning trips out.

## Functionality

1. As a user, I can login/sign up so I can access the app.
2. As a user, I am able to create/edit itinerary form for trip and share with other users to view so that a group can plan the trip.
3. As a user, I can be invited to view a trip made by a different user.
4. A trip owner can add/edit activities via the activity form to add/remove activities to an itinerary.
5. A trip owner can add/edit items in the packing list form to add/remove list of needed items for a given activity.
6. All members of a group have access to the itineraries list page, where once trip owner submits the forms, everyone in the group can access.
7. A trip owner can edit/delete itineraries and their relevant activities and packing lists in the itineraries list page.


## Project Initialization
To fully enjoy this application on your local machine, please make sure to follow these steps:

- Clone the repository down to your local machine
- CD into the new project directory

```
docker volume create postgres-data
docker volume create pg-admin
docker volume create jwtdown-db-data
docker compose build
docker compose up
```

## Backend Endpoints

- Trips: [http://localhost:8100](http://localhost:8100/)
- Users: [http://localhost:8090](http://localhost:8090)

### Trips
| HTTP Request | URL                                                                | Method               |
| ------------ | ------------------------------------------------------------------ | -------------------- |
| GET          | [http://localhost:8100/trips](http://localhost:8100/trips)         | Get all trips        |
| POST         | [http://localhost:8100/trips](http://localhost:8100/trips)         | Create new trip      |
| PUT          | [http://localhost:8100/trips/:id](http://localhost:8100/trips/:id) | Delete specific trip |
| DELETE       | [http://localhost:8100/trips/:id](http://localhost:8100/trips/:id) | Update specific trip |
| GET          | [http://localhost:8100/trips/:id](http://localhost:8100/trips/:id) | Get specific trip    |

### Viewers
| HTTP Request | URL                                              | Method             |
| ------------ | ------------------------------------------------ | ------------------ |
| POST         | [http://localhost:8100/](http://localhost:8100/) | Add viewer to trip |

### Itineraries
| HTTP Request | URL                                                                            | Method                    |
| ------------ | ------------------------------------------------------------------------------ | ------------------------- |
| GET          | [http://localhost:8100/itineraries](http://localhost:8100/itineraries)         | Get all itineraries       |
| POST         | [http://localhost:8100/itineraries](http://localhost:8100/itineraries)         | Create new itinerary      |
| PUT          | [http://localhost:8100/itineraries/:id](http://localhost:8100/itineraries/:id) | Delete specific itinerary |
| DELETE       | [http://localhost:8100/itineraries/:id](http://localhost:8100/itineraries/:id) | Update specific itinerary |
| GET          | [http://localhost:8100/itineraries/:id](http://localhost:8100/itineraries/:id) | Get specific itinerary    |

### Activities
| HTTP Request | URL                                                                          | Method                   |
| ------------ | ---------------------------------------------------------------------------- | ------------------------ |
| GET          | [http://localhost:8100/activities](http://localhost:8100/activities)         | Get all activities       |
| POST         | [http://localhost:8100/activities](http://localhost:8100/activities)         | Create new activity      |
| PUT          | [http://localhost:8100/activities/:id](http://localhost:8100/activities/:id) | Delete specific activity |
| DELETE       | [http://localhost:8100/activities/:id](http://localhost:8100/activities/:id) | Update specific activity |
| GET          | [http://localhost:8100/activities/:id](http://localhost:8100/activities/:id) | Get specific activity    |

### Checklists
| HTTP Request | URL                                                                          | Method                    |
| ------------ | ---------------------------------------------------------------------------- | ------------------------- |
| GET          | [http://localhost:8100/checklists](http://localhost:8100/checklists)         | Get all checklists        |
| POST         | [http://localhost:8100/checklists](http://localhost:8100/checklists)         | Create new checklist      |
| PUT          | [http://localhost:8100/checklists/:id](http://localhost:8100/checklists/:id) | Delete specific checklist |
| DELETE       | [http://localhost:8100/checklists/:id](http://localhost:8100/checklists/:id) | Update specific checklist |
| GET          | [http://localhost:8100/checklists/:id](http://localhost:8100/checklists/:id) | Get specific checklist    |

### Reservations
| HTTP Request | URL                                                                              | Method                      |
| ------------ | -------------------------------------------------------------------------------- | --------------------------- |
| GET          | [http://localhost:8100/reservations](http://localhost:8100/reservations)         | Get all reservations        |
| POST         | [http://localhost:8100/reservations](http://localhost:8100/reservations)         | Create new reservation      |
| PUT          | [http://localhost:8100/reservations/:id](http://localhost:8100/reservations/:id) | Delete specific reservation |
| DELETE       | [http://localhost:8100/reservations/:id](http://localhost:8100/reservations/:id) | Update specific reservation |
| GET          | [http://localhost:8100/reservations/:id](http://localhost:8100/reservations/:id) | Get specific reservation    |

### Users
| HTTP Request | URL                                                                | Method               |
| ------------ | ------------------------------------------------------------------ | -------------------- |
| GET          | [http://localhost:8090/users](http://localhost:8090/users)         | Get all users        |
| POST         | [http://localhost:8090/users](http://localhost:8090/users)         | Create new user      |
| PUT          | [http://localhost:8090/users/:id](http://localhost:8090/users/:id) | Delete specific user |
| DELETE       | [http://localhost:8090/users/:id](http://localhost:8090/users/:id) | Update specific user |
| GET          | [http://localhost:8090/users/:id](http://localhost:8090/users/:id) | Get specific user    |
| GET          | [http://localhost:8090/token](http://localhost:8090/token)         | Get user token       |

---

### Front End Endpoint:

- React: [http://localhost:3000](http://localhost:3000/)
