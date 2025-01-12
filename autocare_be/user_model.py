from bson.objectid import ObjectId
from werkzeug.security import generate_password_hash, check_password_hash

class UserModel:
    def __init__(self, db):
        self.collection = db['users'] #create the users collections in mongo 

    def add_car(self, user_id, brand, model, year,vin,enginecapacity,power,carID):
        #this function add a car to the user logged
        car = {"carID":carID, "brand": brand, "model": model, "year": year,"vin": vin , "enginecapacity":enginecapacity,"power":power, "services": []}
        result = self.collection.update_one(
            {"_id": ObjectId(user_id)},  #on the user_id do the push command to add the car in cars array
            {"$push": {"cars": car}}
        )
        if result.matched_count == 0:  
            raise ValueError("User not found")
        return "Car added successfully"
   
    def add_service(self, user_id, car_ID, date, km, service, description):
   
         print("User ID:", user_id) #for debbuging
         print("Car ID:", car_ID)   #for debbuging
         service_entry = {"date": date, "km": km, "service": service, "description": description}
         query = {
             "_id": ObjectId(user_id),
             "cars.carID": car_ID  # match car by unique identifier
                }
         print("Query:", query) 
         update = {"$push": {"cars.$.services": service_entry}}  
         result = self.collection.update_one(query, update)

         if result.matched_count == 0:
              raise ValueError("User or car not found")
         return "Service added successfully"

    def get_user_with_cars(self, user_id):
        #ge the user with it s details ( cars, services, documents)
        user = self.collection.find_one({"_id": ObjectId(user_id)})
        if not user:
            raise ValueError("User not found")
        return user

    def create_user(self, email, password):
        #create the user with a hashed password
        if self.collection.find_one({"email": email}):
            raise ValueError("Email is already in use")
        hashed_password = generate_password_hash(password) #generate the password
        user_id = self.collection.insert_one({"email": email, "password": hashed_password}).inserted_id
        return str(user_id)

    def find_user_by_email(self, email):
        #find a user by it s email
        return self.collection.find_one({"email": email})

    def verify_user(self, email, password):
        #verify the user by email and password for signin
        user = self.find_user_by_email(email)
        if not user or not check_password_hash(user['password'], password):
            raise ValueError("Invalid email or password")
        return str(user['_id'])
    def get_user_documents(self,user_id):
        #find the user with documents by id
         user = self.collection.find_one({"_id": ObjectId(user_id)})
         if not user:
            raise Exception("User not found")
         return user.get("documents", [])

    def add_user_document(self,user_id, document):
         #add a document to the user object
        result = self.collection.update_one(
            {"_id": ObjectId(user_id)},
            {"$push": {"documents": document}}
        )
        if result.matched_count == 0:
             raise Exception("User not found")
    def delete_user_document(self,user_id, doc_id):
        #delete a selected document from database
        try:
            result = self.collection.update_one(
                 {"_id": ObjectId(user_id)},
                 {"$pull": {"documents": {"doc_id": doc_id}}}  #remove document from the documents array
             )
            return result.modified_count > 0
        except Exception as e:
             print(f"Error deleting document: {e}")
             return False
    
        