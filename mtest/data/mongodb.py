import os
from pymongo import MongoClient
import pymongo
import urllib.parse


def insert_to_database(database_name, collection_name, data):
    client = MongoClient(os.environ["MONGODB_URL"])
    database = client[database_name]
    collection = database[collection_name]
    collection.insert_one(data)

def query_database(database_name, collection_name, query):
    client = MongoClient(os.environ["MONGODB_URL"])
    database = client[database_name]
    collection = database[collection_name]
    return collection.find(query)
