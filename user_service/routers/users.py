from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)

from jwtdown_fastapi.authentication import Token
from authenticator import authenticator
from pydantic import BaseModel
from typing import Optional
from queries.users import (
    UserIn,
    UserOut,
    UsersOut,
    UserQueries,
    DuplicateAccountError,
)


class UserForm(BaseModel):
    username: str
    password: str


class UserToken(Token):
    user: UserOut


class HttpError(BaseModel):
    detail: str


router = APIRouter()


# for people who has to be logged in
# @router.get("/api/protected", response_model=bool)
# async def get_protected(
#     #include queries
#     user_data: dict = Depends(authenticator.get_current_account_data),
# ):
#     return True
# will eventually need to implement for users to access


not_authorized = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Invalid authentication credentials",
    headers={"WWW-Authenticate": "Bearer"},
)


@router.get("/token", response_model=UserToken | None)
async def get_token(
    request: Request,
    user: UserOut = Depends(authenticator.try_get_current_account_data),
) -> UserToken | None:
    if user and authenticator.cookie_name in request.cookies:
        return {
            "access_token": request.cookies[authenticator.cookie_name],
            "type": "Bearer",
            "user": user,
        }


@router.get("/users", response_model=UsersOut)
def users_list(
    queries: UserQueries = Depends(),
    user_data: dict = Depends(authenticator.get_current_account_data),
):
    if user_data:
        return {
            "users": queries.get_all_users(),
        }


@router.get("/users/{user_id}", response_model=Optional[UserOut])
def get_user(
    user_id: int,
    response: Response,
    queries: UserQueries = Depends(),
    user_data: dict = Depends(authenticator.get_current_account_data),
):
    record = queries.get_user(user_id)
    if record is not None and user_data:
        return record
    else:
        response.status_code = 404


@router.post("/users", response_model=UserToken | HttpError)
async def create_user(
    info: UserIn,
    request: Request,
    response: Response,
    users: UserQueries = Depends(),
):
    hashed_password = authenticator.hash_password(info.password)
    try:
        user = users.create_user(info, hashed_password)
    except DuplicateAccountError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials",
        )
    form = UserForm(username=info.email, password=info.password)
    token = await authenticator.login(response, request, form, users)
    return UserToken(user=user, **token.dict())


@router.put("/users/{user_id}")
async def update_user(
    user_id: int,
    user_in: UserIn,
    response: Response,
    queries: UserQueries = Depends(),
    user_data: dict = Depends(authenticator.get_current_account_data),
):
    hashed_password = authenticator.hash_password(user_in.password)
    if user_data:
        return queries.update_user(user_id, user_in, hashed_password)
    else:
        response.status_code = 404


@router.delete("/users/{user_id}", response_model=bool)
def delete_user(
    user_id: int,
    queries: UserQueries = Depends(),
    user_data: dict = Depends(authenticator.get_current_account_data),
) -> bool:
    if user_data:
        return queries.delete_user(user_id)
