steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE checklists (
            id SERIAL PRIMARY KEY NOT NULL,
            item_name TEXT NOT NULL,
            trip_id INTEGER references trips ON DELETE CASCADE ON UPDATE CASCADE
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE checklists;
        """,
    ]
]
