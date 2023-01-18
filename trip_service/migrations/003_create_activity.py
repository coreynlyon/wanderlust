steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE IF NOT EXISTS activities (
            id SERIAL PRIMARY KEY NOT NULL,
            activity_name VARCHAR(100) NOT NULL,
            date DATE NOT NULL,
            place VARCHAR(100) NOT NULL,
            notes TEXT,
            trip_id INTEGER references trips ON DELETE CASCADE ON UPDATE CASCADE
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE activities;
        """,
    ]
]
