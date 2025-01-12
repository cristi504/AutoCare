import traceback
from flask import Flask, jsonify, request
from flask_cors import CORS
from database import get_database
from user_model import UserModel
import random
import string

app=Flask (__name__)
CORS(app)
db = get_database()  #in db we call get_database from database.py to have access to mongo
user_model = UserModel(db)

def generate_random_string(length):  #function to generate random strings used for car_id and doc_id
    characters = string.ascii_letters + string.digits  # includes a-z, A-Z, and 0-9
    return ''.join(random.choices(characters, k=length)) 

@app.route('/signup', methods=['POST'])
def signup():
    try:
        data = request.json
        email = data['email']
        password = data['password']
       
        user_id = user_model.create_user(email, password)  #calls create_user from user_model to create the user
        return jsonify({"success": True, "user_id": user_id}), 201 # 201 /created

    except ValueError as e:
        return jsonify({"error": str(e)}), 400 # 400 is for wrong request
    except Exception as e:
        return jsonify({"error": str(e)}), 500 #500 is for internal server error
    
@app.route('/login', methods=['POST'])
def signin():
    try:
        data = request.json
        email = data['email']
        password = data['password']

        user_id = user_model.verify_user(email, password)   # calls verify_user from user_model to verify the user
        return jsonify({"success": True, "user_id": user_id}), 200 # 200 /ok

    except ValueError as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 401  #401 is for unauthorized request (if user isn t in the database)
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

@app.route('/users/<user_id>/cars', methods=['POST'])
def add_car(user_id):
    try:
        data = request.json
        brand = data['brand']
        model = data['model']
        year = data['year']
        vin = data['vin']
        enginecapacity = data['enginecapacity']
        power = data['power']
        carID =generate_random_string(10) # each car id is a random string

        # add car using add_car function from user_model
        message = user_model.add_car(user_id, brand, model, year,vin,enginecapacity,power, carID)
        return jsonify({"success": True, "message": message}), 201

    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

@app.route('/users/<user_id>/cars/<string:car_ID>/services', methods=['POST'])
def add_service(user_id, car_ID):
    try:
        data = request.json
        date = data['date']
        km = data['km']
        service = data['service']
        description = data['description']

        # add service entry using add_service function from user_model
        message = user_model.add_service(user_id, car_ID, date,km,service, description)
        return jsonify({"success": True, "message": message}), 201 

    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

@app.route('/users/<user_id>', methods=['GET'])
def get_user(user_id):
    try:
        # fetch user details using UserModel
        user = user_model.get_user_with_cars(user_id)
        # convert ObjectId to string for JSON serialization
        user['_id'] = str(user['_id'])
        return jsonify(user), 200

    except ValueError as e:
        return jsonify({"error": str(e)}), 404 # 404 not found
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500
    
@app.route('/users/<user_id>/cars', methods=['GET'])
def get_cars(user_id):
    try:
        #call get_user_with_cars from user_model to get the user details 
        user = user_model.get_user_with_cars(user_id)
        
        user['_id'] = str(user['_id'])
        return jsonify(user), 200

    except ValueError as e:
        return jsonify({"error": str(e)}), 404
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500
    
@app.route('/users/<user_id>/documents', methods=['GET'])
def fetch_user_documents(user_id):
    try:
        #get from get_user_documents from user_model
        documents = user_model.get_user_documents(user_id)
        return jsonify(documents), 200  #convert in json 
    except Exception as e: 
        return jsonify({'error': str(e)}), 500

@app.route('/users/<user_id>/documents', methods=['POST'])
def add_document(user_id):
    try:
        data = request.json
        doc_id =generate_random_string(10)  #every doc id is a random string
        document = {
            "doc_id":doc_id,
            "type": data.get("type"),
            "issue_date": data.get("issue_date"),
            "expiry_date": data.get("expiry_date"),
        }
        #add a document using add_user_document from user_model 
        user_model.add_user_document(user_id, document)
        return jsonify({'message': 'Document added successfully'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@app.route('/users/<user_id>/documents/<doc_id>', methods=['DELETE']) #delete method
def delete_document(user_id, doc_id):
    result = user_model.delete_user_document(user_id, doc_id)  # call the user_model function delete_user_document
    if result:
        return jsonify({"message": "Document deleted successfully."}), 200
    else:
        return jsonify({"error": "Failed to delete the document or document not found."}), 404

    
   
if __name__ == '__main__':
    app.run(debug=True)