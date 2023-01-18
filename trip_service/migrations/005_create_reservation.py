steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE reservations (
            id SERIAL PRIMARY KEY NOT NULL,
            accommodation_name TEXT NOT NULL,
            address TEXT NOT NULL,
            reservation_num TEXT NOT NULL,
            check_in TIMESTAMPTZ NOT NULL,
            check_out TIMESTAMPTZ NOT NULL,
            trip_id INTEGER NOT NULL UNIQUE REFERENCES trips ON DELETE CASCADE ON UPDATE CASCADE
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE reservations
        """,
    ]
]
