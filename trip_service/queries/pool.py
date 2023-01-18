import os  # lets us use an environment variable
from psycopg_pool import ConnectionPool

pool = ConnectionPool(
    conninfo=os.environ["DATABASE_URL"]
)  # provides connection info for our pool which allows us to connect to the DB
