steps = [
    [
        ## Create the table
        """
        CREATE TABLE checklist_items (
            id SERIAL PRIMARY KEY NOT NULL,
            checklist_item VARCHAR(1000) NOT NULL,
        );
        """,
            ## Drop the table
        """
        DROP TABLE checklist_items;
        """
    ]
]
