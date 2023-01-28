import os
from jwtdown_fastapi.authentication import Authenticator


class UserAuthenticator(Authenticator):
    async def get_account_data():
        pass

    def get_account_getter():
        pass

    def get_hashed_password():
        pass

    def get_account_data_for_cookie():
        pass


authenticator = UserAuthenticator(os.environ["SIGNING_KEY"])
