from flask import Flask, jsonify, request, make_response
from flask_cors import CORS
import json
import os
from google import genai
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

# Enable CORS for all routes
CORS(app, supports_credentials=True)

# Define paths for JSON databases
JSON_FILE = "./data/data.json"
USERS_FILE = "./data/users.json"

# Ensure the data directory exists
os.makedirs(os.path.dirname(JSON_FILE), exist_ok=True)

# Ensure the JSON files exist
if not os.path.exists(JSON_FILE):
    with open(JSON_FILE, "w") as f:
        json.dump([], f)

if not os.path.exists(USERS_FILE):
    with open(USERS_FILE, "w") as f:
        json.dump({}, f)

# Function to read JSON data
def read_json():
    try:
        with open(JSON_FILE, "r") as f:
            return json.load(f)
    except (json.JSONDecodeError, FileNotFoundError):
        return []

# Function to write JSON data
def write_json(data):
    with open(JSON_FILE, "w") as f:
        json.dump(data, f, indent=4)

# Function to read users
def read_users():
    try:
        with open(USERS_FILE, "r") as f:
            return json.load(f)
    except (json.JSONDecodeError, FileNotFoundError):
        return {}

# Function to write users
def write_users(users):
    with open(USERS_FILE, "w") as f:
        json.dump(users, f, indent=4)

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
    try:
        data = request.get_json()
        email = data.get("email")
        username = data.get("username")
        password = data.get("password")

        users_info = read_users()

        if username in users_info.keys():
            user_info = users_info.get(username)

            if user_info.get("password") != password or user_info.get("email") != email:
                return jsonify({"message": "Wrong information"}), 401

            # Update last login
            user_info["lastLogin"] = datetime.now().isoformat()
            write_users(users_info)

            resp = make_response(jsonify({"message": "Login successful!"}))
            resp.set_cookie('loggedin', 'true', samesite='Lax')
            resp.set_cookie('username', username, samesite='Lax')
            print("Cookies set")
            return resp, 200

        return jsonify({"message": "User not found"}), 404
    
    except Exception as e:
        print(f"Error in validate_account: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/api/authentication/register', methods=['POST'])
def register_account():
    try:
        data = request.get_json()
        email = data.get("email")
        username = data.get("username")
        password = data.get("password")

        users_info = read_users()

        if username in users_info.keys():
            return jsonify({"message": "User exists"}), 400

        # Create new user object with enhanced fields
        curr_values = {}
        for continent in ["North America", "South America", "Europe", "Asia", "Africa", "Oceania"]:
            curr_values[continent] = 0
        
        curr_object = {
            "email": email,
            "username": username,
            "password": password,
            "values": curr_values,
            "totalPuzzles": 0,
            "achievements": [],
            "joinDate": datetime.now().isoformat(),
            "lastLogin": datetime.now().isoformat(),
            "streak": 0,
            "lastPuzzleDate": None
        }
        
        users_info[username] = curr_object
        write_users(users_info)

        resp = make_response(jsonify({"message": "Successful registration!"}))
        resp.set_cookie('loggedin', 'true', samesite='Lax')
        resp.set_cookie('username', username, samesite='Lax')
        print("Cookies set")
        return resp, 200
    
    except Exception as e:
        print(f"Error in register_account: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/api/connections', methods=['POST'])
def get_connections_puzzle():
    try:
        data = request.get_json()
        region = data.get("region", "North America")
        difficulty = data.get("difficulty", "medium")

        print(f"Generating puzzle for region: {region}, difficulty: {difficulty}")

        # Check if API key exists
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            print("ERROR: GEMINI_API_KEY not found in environment variables")
            return jsonify({"error": "API key not configured"}), 500

        difficulty_instructions = {
            "easy": "Make the categories obvious and well-known (e.g., 'Capital Cities', 'Famous Foods')",
            "medium": "Make the categories moderately challenging with some obscure terms",
            "hard": "Make the categories very challenging with obscure connections and tricky words"
        }

        prompt = (f"You are creating answers for a puzzle game. Given a location, "
                 f"users are given categories like foods, events, landmarks, etc. "
                 f"and they must group words that fit these categories. "
                 f"Give exactly 4 categories, each with exactly 4 words, totalling 16 words. "
                 f"The region is {region}. {difficulty_instructions.get(difficulty, difficulty_instructions['medium'])}. "
                 f"Difficulties are distributed from 1-4. Choose answers that don't give away the category. "
                 f"CRITICAL: Return ONLY a valid JSON array with NO markdown, NO backticks, NO explanatory text. "
                 f"Format:\n"
                 """[
    {"category": "Example Category 1", "words": ["word1", "word2", "word3", "word4"], "difficulty": 1},
    {"category": "Example Category 2", "words": ["word5", "word6", "word7", "word8"], "difficulty": 2},
    {"category": "Example Category 3", "words": ["word9", "word10", "word11", "word12"], "difficulty": 3},
    {"category": "Example Category 4", "words": ["word13", "word14", "word15", "word16"], "difficulty": 4}
]""")

        print("Calling Gemini API...")
        
        try:
            client = genai.Client(api_key=api_key)
            response = client.models.generate_content(
                model="gemini-2.0-flash-exp",
                contents=prompt,
            )
            
            print("Gemini API response received")
            
        except Exception as api_error:
            print(f"Gemini API Error: {str(api_error)}")
            return jsonify({"error": f"AI service error: {str(api_error)}"}), 500

        # Clean the response
        raw_text = response.text.strip()
        print(f"Raw response length: {len(raw_text)}")
        print(f"First 200 chars: {raw_text[:200]}")
        
        cleaned_response = raw_text
        
        # Remove markdown code blocks
        if '```' in cleaned_response:
            parts = cleaned_response.split('```')
            for part in parts:
                if part.strip().startswith('json'):
                    cleaned_response = part[4:].strip()
                elif part.strip().startswith('['):
                    cleaned_response = part.strip()
                    break
        
        # Remove any leading/trailing whitespace or newlines
        cleaned_response = cleaned_response.strip()
        
        # If it doesn't start with [, try to find the JSON array
        if not cleaned_response.startswith('['):
            start_idx = cleaned_response.find('[')
            end_idx = cleaned_response.rfind(']')
            if start_idx != -1 and end_idx != -1:
                cleaned_response = cleaned_response[start_idx:end_idx+1]
        
        print(f"Cleaned response: {cleaned_response[:200]}")
        
        # Try to parse as JSON
        try:
            puzzle_data = json.loads(cleaned_response)
            
            # Validate structure
            if not isinstance(puzzle_data, list):
                print(f"ERROR: Response is not a list, it's a {type(puzzle_data)}")
                return jsonify({"error": "Invalid puzzle format - not a list"}), 500
                
            if len(puzzle_data) != 4:
                print(f"ERROR: Expected 4 categories, got {len(puzzle_data)}")
                return jsonify({"error": f"Invalid puzzle format - expected 4 categories, got {len(puzzle_data)}"}), 500
            
            # Validate each category
            for i, category in enumerate(puzzle_data):
                if not isinstance(category, dict):
                    print(f"ERROR: Category {i} is not a dict")
                    return jsonify({"error": f"Invalid category {i} format"}), 500
                    
                if 'category' not in category or 'words' not in category or 'difficulty' not in category:
                    print(f"ERROR: Category {i} missing required fields")
                    return jsonify({"error": f"Category {i} missing required fields"}), 500
                
                if not isinstance(category['words'], list) or len(category['words']) != 4:
                    print(f"ERROR: Category {i} doesn't have exactly 4 words")
                    return jsonify({"error": f"Category {i} must have exactly 4 words"}), 500
            
            print("Puzzle validation successful!")
            
            # Return the puzzle data directly
            return jsonify({
                "success": True,
                "puzzle": puzzle_data,
                "region": region,
                "difficulty": difficulty
            }), 200
            
        except json.JSONDecodeError as e:
            print(f"JSON Parse Error: {str(e)}")
            print(f"Failed to parse: {cleaned_response}")
            return jsonify({
                "error": "Failed to parse AI response as JSON",
                "details": str(e),
                "raw_response": cleaned_response[:500]
            }), 500
    
    except Exception as e:
        print(f"Unexpected error in get_connections_puzzle: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({"error": f"Server error: {str(e)}"}), 500

@app.route('/api/getStats', methods=['POST'])
def get_stats():
    try:
        data = request.get_json()
        user = data.get("user")

        users_info = read_users()

        if user in users_info.keys():
            user_info = users_info.get(user)
            return jsonify({"values": user_info.get("values")}), 200

        return jsonify({"message": "not real user"}), 400
    
    except Exception as e:
        print(f"Error in get_stats: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/api/updateStats', methods=['POST'])
def update_stats():
    try:
        data = request.get_json()
        user = data.get("user")
        continent = data.get("continent")

        users_info = read_users()

        if user in users_info.keys():
            user_info = users_info.get(user)
            
            # Update continent progress
            if user_info.get("values")[continent] < 100:
                user_info["values"][continent] += 1
            
            # Update total puzzles
            user_info["totalPuzzles"] = user_info.get("totalPuzzles", 0) + 1
            
            # Check for achievements
            achievements = check_achievements(user_info)
            user_info["achievements"] = achievements
            
            # Update streak
            today = datetime.now().date().isoformat()
            last_puzzle = user_info.get("lastPuzzleDate")
            
            if last_puzzle:
                last_date = datetime.fromisoformat(last_puzzle).date()
                today_date = datetime.now().date()
                diff = (today_date - last_date).days
                
                if diff == 1:
                    user_info["streak"] = user_info.get("streak", 0) + 1
                elif diff > 1:
                    user_info["streak"] = 1
            else:
                user_info["streak"] = 1
            
            user_info["lastPuzzleDate"] = today
            
            write_users(users_info)
            
            return jsonify({
                "values": "success", 
                "newAchievements": achievements,
                "streak": user_info["streak"]
            }), 200

        return jsonify({"message": "not real user"}), 400
    
    except Exception as e:
        print(f"Error in update_stats: {str(e)}")
        return jsonify({"error": str(e)}), 500

def check_achievements(user_info):
    """Check and return all earned achievements"""
    achievements = []
    total = user_info.get("totalPuzzles", 0)
    values = user_info.get("values", {})
    
    # Puzzle milestone achievements
    milestones = [
        (10, "Explorer", "Complete 10 puzzles"),
        (50, "Adventurer", "Complete 50 puzzles"),
        (100, "Wanderer", "Complete 100 puzzles"),
        (250, "Traveler", "Complete 250 puzzles"),
        (500, "World Explorer", "Complete 500 puzzles")
    ]
    
    for count, name, desc in milestones:
        if total >= count:
            achievements.append({"name": name, "description": desc})
    
    # Continent mastery achievements
    for continent, value in values.items():
        if value == 100:
            achievements.append({
                "name": f"{continent} Master",
                "description": f"100% completion in {continent}"
            })
    
    # Streak achievements
    streak = user_info.get("streak", 0)
    if streak >= 7:
        achievements.append({"name": "Week Warrior", "description": "7 day streak"})
    if streak >= 30:
        achievements.append({"name": "Month Master", "description": "30 day streak"})
    
    return achievements

@app.route('/api/getUserInfo', methods=['POST'])
def get_user_info():
    try:
        data = request.get_json()
        user = data.get("user")

        users_info = read_users()

        if user in users_info.keys():
            user_info = users_info.get(user)
            return jsonify({
                "email": user_info.get("email"),
                "username": user_info.get("username"),
                "joinDate": user_info.get("joinDate"),
                "totalPuzzles": user_info.get("totalPuzzles", 0),
                "streak": user_info.get("streak", 0)
            }), 200

        return jsonify({"message": "User not found"}), 404
    
    except Exception as e:
        print(f"Error in get_user_info: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/api/updatePassword', methods=['POST'])
def update_password():
    try:
        data = request.get_json()
        username = data.get("username")
        new_password = data.get("newPassword")

        users_info = read_users()

        if username in users_info.keys():
            users_info[username]["password"] = new_password
            write_users(users_info)
            return jsonify({"message": "Password updated successfully"}), 200

        return jsonify({"message": "User not found"}), 404
    
    except Exception as e:
        print(f"Error in update_password: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/api/leaderboard', methods=['GET'])
def get_leaderboard():
    try:
        users_info = read_users()
        leaderboard = []

        for username, user_data in users_info.items():
            total_score = user_data.get("totalPuzzles", 0)
            continent_scores = user_data.get("values", {})
            
            leaderboard.append({
                "username": username,
                "totalScore": total_score,
                "continentScores": continent_scores
            })

        return jsonify({"leaderboard": leaderboard}), 200
    
    except Exception as e:
        print(f"Error in get_leaderboard: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/api/globalStats', methods=['GET'])
def get_global_stats():
    try:
        users_info = read_users()
        
        total_users = len(users_info)
        total_puzzles = sum(user.get("totalPuzzles", 0) for user in users_info.values())
        
        continents_explored = 0
        for user in users_info.values():
            values = user.get("values", {})
            continents_explored += sum(1 for v in values.values() if v > 0)

        return jsonify({
            "totalUsers": total_users,
            "totalPuzzles": total_puzzles,
            "continentsExplored": continents_explored
        }), 200
    
    except Exception as e:
        print(f"Error in get_global_stats: {str(e)}")
        return jsonify({"error": str(e)}), 500

# Run the Flask app
if __name__ == "__main__":
    app.run(debug=True, port=5001)