from dotenv import load_dotenv
from pymongo import MongoClient
import os

load_dotenv()


def get_db():
    client = MongoClient(os.getenv('MONGO_URI'))
    db = client[os.getenv('DB_NAME')]
    return db
