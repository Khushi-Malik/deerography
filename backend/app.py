from flask import Flask, jsonify, request, make_response
from flask_cors import CORS
import json
import os
from google import genai

app = Flask(__name__)

# Enable CORS for all routes
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)


# Define path for the JSON database
JSON_FILE = "backend/data/data.json"

# Ensure the data directory exists
os.makedirs(os.path.dirname(JSON_FILE), exist_ok=True)

# Ensure the JSON file exists
if not os.path.exists(JSON_FILE):
    with open(JSON_FILE, "w") as f:
        json.dump([], f)

# Function to read JSON data
def read_json():
    try:
        with open(JSON_FILE, "r") as f:
            return json.load(f)
    except (json.JSONDecodeError, FileNotFoundError):
        return []  # Return an empty list if JSON is corrupted or missing

# Function to write JSON data
def write_json(data):
    with open(JSON_FILE, "w") as f:
        json.dump(data, f, indent=4)

@app.route("/")
def home():
    return "Flask backend is running!"

# API route to fetch data
@app.route("/api/data", methods=["GET"])
def get_data():
    return jsonify(read_json())

# API route to add data
@app.route("/api/data", methods=["POST"])
def add_data():
    try:
        data = request.json
        existing_data = read_json()
        existing_data.append(data)
        write_json(existing_data)
        return jsonify({"message": "Data added successfully!", "data": data}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/authentication/validateAccount', methods=['POST'])
def validate_account():
    data = request.get_json()
    email = data.get("email")
    username = data.get("username")
    password = data.get("password")

    with open('data/users.json', 'r') as users:
        users_info = json.load(users)

    if username in users_info.keys():
        user_info = users_info.get(username)

        if user_info.get("password") != password or user_info.get("email") != email:
            return jsonify({"message": "Wrong information"}), 401

        else:
            resp = make_response(jsonify({"message": "Login successful!"}))

            resp.set_cookie('loggedin', 'true', samesite='Lax')
            resp.set_cookie('username', username, samesite='Lax')

            print("Cookies set")
            return resp, 200

    return jsonify({"message": "User not found"}), 404

# New endpoint for user registration
@app.route('/api/authentication/register', methods=['POST'])
def register_account():
    data = request.get_json()
    email = data.get("email")
    username = data.get("username")
    password = data.get("password")

    with open('data/users.json', 'r') as users:
        users_info = json.load(users)

    if username in users_info.keys():
        return jsonify({"message": "User exists"}), 400

    #username, email, password, country
    curr_object = {"email": email, "username": username, "password":password}
    print(curr_object.keys())
    users_info.update({username: curr_object})

    with open('data/users.json', 'w') as users_file:
        json.dump(users_info, users_file, indent=4)

    # Return a success response after adding the new user
    resp = make_response(jsonify({"message": "Successful registration!"}))

    resp.set_cookie('loggedin', 'true', samesite='Lax')
    resp.set_cookie('username', username, samesite='Lax')

    print("Cookies set")
    return resp, 200

# New endpoint for getting connections answers
@app.route('/api/connections', methods=['POST'])
def get_connections_puzzle():
    print("a")
    data = request.get_json()
    print("b")
    region = data.get("region")
    print("c")

    prompt = "You are creating answers for a puzzle game. Given a location, " + \
             "users are given categories like foods, events, landmarks, etc. "  + \
             "and they must group words that fit these categories based" + \
             "on the category they fit. Give a total of cummulative total of " + \
             "5 terms (i.e. foods, events, landmarks, etc.) , each with 2-4" + \
             "associated answers that fit given the region, totalling 16. " + \
             "The associated region is " + str(region) + ". Choose somewhat " + \
             "obscure answers that don't give away the answer (i.e. Toronto Hot" + \
             " Dogs when the region is Toronto, or Sugarloaf Mountain when the" + \
             "category is landmarks), Give the output as " + \
             "a JSON object, where the categories are the keys while the " + \
             "values associated with those keys are a List of Strings."

    client = genai.Client(api_key="AIzaSyDOHewNpknqFyupi7tUywC4mCDyG4OaZT0")
    #pip install google-genai
    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=prompt,
    )
    print(str(type(response)))

    # If the content part is wrapped in triple-backticks (i.e., Markdown/JSON format), you can clean it up:
    # Remove backticks and extract the content

    cleaned_response = response.text.replace("json\n", "").replace("\n", "").replace("```", "").strip()
    print(str(cleaned_response))

    return jsonify({"message" : str(response.text)}), 200

# Run the Flask app
if __name__ == "__main__":
    app.run(debug=True, port=5000)  # Flask will run on port 5000
