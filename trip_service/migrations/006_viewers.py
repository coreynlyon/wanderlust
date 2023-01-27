steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE viewers (
            id SERIAL PRIMARY KEY NOT NULL,
            email VARCHAR(50) NOT NULL,
            trip_id INTEGER NOT NULL REFERENCES trips(id) ON DELETE CASCADE ON UPDATE CASCADE
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE viewers;
        """,
    ]
]
