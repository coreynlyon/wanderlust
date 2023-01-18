steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE users (
            id SERIAL PRIMARY KEY NOT NULL,
            first_name VARCHAR(30) NOT NULL,
            last_name VARCHAR(30) NOT NULL,
            email VARCHAR(50) NOT NULL UNIQUE,
            hashed_password VARCHAR(100) NOT NULL

        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE users;
        """,
    ]
]
print(__name__)
