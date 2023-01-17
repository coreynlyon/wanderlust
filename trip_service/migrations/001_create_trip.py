steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE trips (

            id SERIAL PRIMARY KEY NOT NULL,
            destination VARCHAR(1000) NOT NULL,
            start_date DATE NOT NULL,
            end_date DATE NOT NULL,
            attendees TEXT NOT NULL,
            image_url TEXT,
            itinerary_id INTEGER
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE trips;
        """
    ]
]
