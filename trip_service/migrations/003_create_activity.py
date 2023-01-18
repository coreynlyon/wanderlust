steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE IF NOT EXISTS activities (
            id SERIAL PRIMARY KEY NOT NULL,
            title VARCHAR(100) NOT NULL,
            date DATE NOT NULL,
            place VARCHAR(100) NOT NULL,
            notes TEXT NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE activities;
        """,
    ]
    # [
    #     # "Up" SQL statement
    #     """
    #     CREATE TABLE big_dummy (
    #         id SERIAL PRIMARY KEY NOT NULL,
    #         required_limited_text VARCHAR(1000) NOT NULL,
    #         required_unlimited_text TEXT NOT NULL,
    #         required_date_time TIMESTAMP NOT NULL,
    #         automatically_set_date_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    #         required_integer INTEGER NOT NULL,
    #         required_money MONEY NOT NULL
    #     );
    #     """,
    #     # "Down" SQL statement
    #     """
    #     DROP TABLE activity;
    #     """
    # ]
]
