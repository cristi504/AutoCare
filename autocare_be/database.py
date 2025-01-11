import os 
from pymongo import MongoClient
from dotenv import load_dotenv 
import json 

with open("config.json", "r") as f:
    config = json.load(f)

load_dotenv() 

def get_database():
    
    MONGO_URI = f"mongodb+srv://{os.environ['MONGO_USER']}:{os.environ['MONGO_PASS']}@{config['database_url']}"
    print(MONGO_URI)
    client = MongoClient(MONGO_URI)
    db = client['test-db']  
    return db
