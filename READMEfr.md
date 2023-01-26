# Wanderlust
Say goodbye to the stress of planning your next adventure and hello to Wanderlust, the ultimate travel companion that takes care of all your itinerary needs!

## Group
Nate Seon
Tracey Chung
Corey Lyon
Caleb Lee
Bette La

## Design

## API design

## Data model

## GHI

## Integrations

## Intended market
We are primarily focused on catering towards consumers who are finding ways to optimize itinerary planning and distribution. Consumers who love to travel, but have a hard time empirically planning trips out.

## Functionality

Visitors to the site are able to create a user and create an itinerary for any given trip that can be subsequently shared via email to individuals partaking in the trip.

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
