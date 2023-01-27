from pydantic import BaseModel
from typing import Optional
from queries.pool import pool


class DuplicateAccountError(ValueError):
    pass


class Error(BaseModel):
    message: str


class UserIn(BaseModel):
    first_name: str
    last_name: str
    email: str
    password: str


class UserOut(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: str


class UserOutWithPassword(UserOut):
    hashed_password: str


class UsersOut(BaseModel):
    users: list[UserOut]


class UserQueries:
    def get(self, email) -> Optional[UserOutWithPassword]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                            SELECT id
                            , first_name
                            , last_name
                            , email
                            , hashed_password

                            FROM users
                            WHERE email = %s
                        """,
                        [email],
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_account_out(record)
        except Exception:
            return {"message": "Could not get that account"}

    def get_user(self, id) -> Optional[UserOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        SELECT id, first_name, last_name,
                            email
                        FROM users
                        WHERE id = %s
                    """,
                        [id],
                    )

                    record = None
                    row = cur.fetchone()
                    if row is not None:
                        record = {}
                        for i, column in enumerate(cur.description):
                            record[column.name] = row[i]
                    if record is None:
                        return None
                    return record
        except Exception:
            return {"message": "Could not get that user"}

    def create_user(
        self, info: UserIn, hashed_password: str
    ) -> UserOutWithPassword:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    params = [
                        info.first_name,
                        info.last_name,
                        info.email,
                        hashed_password,
                    ]
                    result = cur.execute(
                        """
                        INSERT INTO users (first_name, last_name, email,
                        hashed_password)
                        VALUES (%s, %s, %s, %s)
                        RETURNING id;
                        """,
                        params,
                    )

                    id = result.fetchone()[0]
                    old_data = info.dict()

                    return UserOutWithPassword(
                        id=id, hashed_password=hashed_password, **old_data
                    )

        except Exception:
            return {"message": "Create did not work"}

    def account_in_to_out(
        self, id: int, account: UserIn, hashed_password: str
    ):
        old_data = account.dict()
        return UserOutWithPassword(
            id=id, hashed_password=hashed_password, **old_data
        )

    def record_to_account_out(self, record):
        return UserOutWithPassword(
            id=record[0],
            first_name=record[1],
            last_name=record[2],
            email=record[3],
            hashed_password=record[4],
        )

    def get_all_users(self):
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        SELECT id, first_name, last_name,
                            email
                        FROM users
                        ORDER BY last_name, first_name;
                    """
                    )
                    return [
                        UserOut(
                            id=record[0],
                            first_name=record[1],
                            last_name=record[2],
                            email=record[3],
                        )
                        for record in cur
                    ]
        except Exception:
            return {"message": "Could not get all accounts"}
