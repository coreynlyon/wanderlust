from fastapi import FastAPI
from authenticator import authenticator
from fastapi.middleware.cors import CORSMiddleware
import os


app = FastAPI()

origins = [
    "http://localhost:8000",
    "http://localhost:3000",
    os.environ.get("CORS_HOST", "REACT_APP_USERS_SERVICE_API_HOST"),
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(authenticator.router)
