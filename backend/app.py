from flask import Flask, render_template, jsonify, request
import json
import os

app = Flask(__name__)

JSON_FILE = "data/data.json"

# Ensure JSON file exists
if not os.path.exists(JSON_FILE):
    with open(JSON_FILE, "w") as f:
        json.dump([], f)

# Read JSON data
def read_json():
    with open(JSON_FILE, "r") as f:
        return json.load(f)

# Write JSON data
def write_json(data):
    with open(JSON_FILE, "w") as f:
        json.dump(data, f, indent=4)

# API to fetch JSON data
@app.route("/api/data", methods=["GET"])
def get_data():
    return jsonify(read_json())

# API to add data to JSON
@app.route("/api/data", methods=["POST"])
def add_data():
    data = request.json
    existing_data = read_json()
    existing_data.append(data)
    write_json(existing_data)
    return jsonify({"message": "Data added successfully!"}), 201

# Serve frontend (if using SSR)
@app.route("/")
def home():
    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True)
