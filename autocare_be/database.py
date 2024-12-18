import os 
from pymongo import MongoClient
from dotenv import load_dotenv 
import json 

with open("config.json", "r") as f:
    config = json.load(f)

load_dotenv() 

def get_database():
    # Replace this with your MongoDB URI
    MONGO_URI = f"mongodb+srv://{os.environ['MONGO_USER']}:{os.environ['MONGO_PASS']}@{config['database_url']}"
    print(MONGO_URI)
    client = MongoClient(MONGO_URI)
    db = client['test-db']  # Replace with your database name
    return db
