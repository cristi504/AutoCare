import traceback
from flask import Flask, jsonify, request
from flask_cors import CORS
from database import get_database
from user_model import UserModel
import random
import string

app=Flask (__name__)
CORS(app)
db = get_database()
user_model = UserModel(db)

def generate_random_string(length):
    characters = string.ascii_letters + string.digits  # Includes a-z, A-Z, and 0-9
    return ''.join(random.choices(characters, k=length))

@app.route('/signup', methods=['POST'])
def signup():
    try:
        data = request.json
        email = data['email']
        password = data['password']

        # Use the UserModel to create a new user
        user_id = user_model.create_user(email, password)
        return jsonify({"success": True, "user_id": user_id}), 201

    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/login', methods=['POST'])
def signin():
    try:
        data = request.json
        email = data['email']
        password = data['password']

        # Use the UserModel to verify credentials
        user_id = user_model.verify_user(email, password)
        return jsonify({"success": True, "user_id": user_id}), 200

    except ValueError as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 401
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
        carID =generate_random_string(10)

        # Add car using UserModel
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

        # Add service entry using UserModel
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
        # Fetch user details using UserModel
        user = user_model.get_user_with_cars(user_id)
        # Convert ObjectId to string for JSON serialization
        user['_id'] = str(user['_id'])
        return jsonify(user), 200

    except ValueError as e:
        return jsonify({"error": str(e)}), 404
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500
    
@app.route('/users/<user_id>/cars', methods=['GET'])
def get_cars(user_id):
    try:
        
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
        documents = user_model.get_user_documents(user_id)
        return jsonify(documents), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/users/<user_id>/documents', methods=['POST'])
def add_document(user_id):
    try:
        data = request.json
        doc_id =generate_random_string(10)
        document = {
            "doc_id":doc_id,
            "type": data.get("type"),
            "issue_date": data.get("issue_date"),
            "expiry_date": data.get("expiry_date"),
        }
        user_model.add_user_document(user_id, document)
        return jsonify({'message': 'Document added successfully'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@app.route('/users/<user_id>/documents/<doc_id>', methods=['DELETE'])
def delete_document(user_id, doc_id):
    result = user_model.delete_user_document(user_id, doc_id)  # Call the user_model function
    if result:
        return jsonify({"message": "Document deleted successfully."}), 200
    else:
        return jsonify({"error": "Failed to delete the document or document not found."}), 404

    
   
if __name__ == '__main__':
    app.run(debug=True)