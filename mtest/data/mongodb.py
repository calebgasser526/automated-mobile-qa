from pymongo import MongoClient
import pymongo


MONGODB_USER = "mtest"
MONGODB_PASS = "mtest"
MONGODB_PORT = "27017"
MONGODB_HOST = "mongo"
MONGODB_URL = f"mongodb://{MONGODB_HOST}:{MONGODB_PORT}/"


def insert_to_database(database_name, collection_name, data):
    client = MongoClient(MONGODB_URL,
                         username=MONGODB_USER,
                         password=MONGODB_PASS)
    database = client[database_name]
    collection = database[collection_name]
    collection.insert_one(data)
