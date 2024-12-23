from bson.objectid import ObjectId
from werkzeug.security import generate_password_hash, check_password_hash

class UserModel:
    def __init__(self, db):
        self.collection = db['users']  # Replace with your users collection name

    def add_car(self, user_id, brand, model, year, carID):
        """Add a car to a user's account."""
        car = {"carID":carID, "brand": brand, "model": model, "year": year, "services": []}
        result = self.collection.update_one(
            {"_id": ObjectId(user_id)},
            {"$push": {"cars": car}}
        )
        if result.matched_count == 0:
            raise ValueError("User not found")
        return "Car added successfully"
    
    def add_service(self, user_id, car_index, date,km,service, description):
        """Add a service entry to a car."""
        service = {"date": date,"km":km, "service":service, "description": description}
        query = {
            "_id": ObjectId(user_id),
            f"cars.{car_index}": {"$exists": True}
        }
        update = {"$push": {f"cars.{car_index}.services": service}}
        result = self.collection.update_one(query, update)
        if result.matched_count == 0:
            raise ValueError("User or car not found")
        return "Service added successfully"
    
    def get_user_with_cars(self, user_id):
        """Retrieve a user with their cars and services."""
        user = self.collection.find_one({"_id": ObjectId(user_id)})
        if not user:
            raise ValueError("User not found")
        return user

    def create_user(self, email, password):
        """Create a new user with a hashed password."""
        if self.collection.find_one({"email": email}):
            raise ValueError("Email is already in use")
        hashed_password = generate_password_hash(password)
        user_id = self.collection.insert_one({"email": email, "password": hashed_password}).inserted_id
        return str(user_id)

    def find_user_by_email(self, email):
        """Find a user by email."""
        return self.collection.find_one({"email": email})

    def verify_user(self, email, password):
        """Verify user credentials."""
        user = self.find_user_by_email(email)
        if not user or not check_password_hash(user['password'], password):
            raise ValueError("Invalid email or password")
        return str(user['_id'])
