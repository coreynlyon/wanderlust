from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import trips, itineraries, reservations, activities, checklists
import os

app = FastAPI()
app.include_router(trips.router)
app.include_router(itineraries.router)
app.include_router(reservations.router)
app.include_router(activities.router)
app.include_router(checklists.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.environ.get("CORS_HOST", "http://localhost:3000")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
