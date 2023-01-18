steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE itineraries (
            id SERIAL PRIMARY KEY NOT NULL,
            depart_flight_num TEXT NOT NULL,
            depart_flight_airline TEXT NOT NULL,
            depart_flight_date TIMESTAMPTZ NOT NULL,
            return_flight_num TEXT NOT NULL,
            return_flight_airline TEXT NOT NULL,
            return_flight_date TIMESTAMPTZ NOT NULL,
            trip_id INTEGER NOT NULL UNIQUE REFERENCES trips ON DELETE CASCADE ON UPDATE CASCADE
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE itineraries;
        """,
    ]
]
