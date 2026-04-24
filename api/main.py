import mysql.connector
import os
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient


@asynccontextmanager
async def lifespan(app: FastAPI):
    app.state.mongo = AsyncIOMotorClient(os.getenv("MONGO_URL")).blog_db
    yield
    app.state.mongo.client.close()


app = FastAPI(lifespan=lifespan)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def _mysql():
    return mysql.connector.connect(
        host=os.getenv("MYSQL_HOST"),
        database=os.getenv("MYSQL_DATABASE"),
        user=os.getenv("MYSQL_USER"),
        password=os.getenv("MYSQL_PASSWORD"),
        port=3306,
    )


@app.get("/posts")
async def get_posts():
    cursor = app.state.mongo.posts.find({}, {"_id": 0})
    return {"posts": await cursor.to_list(length=100)}


@app.get("/users")
async def get_users():
    conn = _mysql()
    try:
        cur = conn.cursor()
        cur.execute("SELECT id, nom, email, created_at FROM utilisateurs")
        rows = cur.fetchall()
        return {
            "utilisateurs": [
                {"id": r[0], "nom": r[1], "email": r[2], "created_at": str(r[3])}
                for r in rows
            ]
        }
    finally:
        conn.close()
