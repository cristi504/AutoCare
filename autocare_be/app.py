import traceback
from flask import Flask, jsonify, request
from flask_cors import CORS
from database import get_database
from user_model import UserModel

app=Flask (__name__)
CORS(app)
db = get_database()
user_model = UserModel(db)

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
    
@app.route('/api/auth/signin', methods=['POST'])
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
    
if __name__ == '__main__':
    app.run(debug=True)