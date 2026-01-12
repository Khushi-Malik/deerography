import os
from dotenv import load_dotenv
from google import genai

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    print("ERROR: No API key found!")
else:
    print(f"API Key found: {api_key[:10]}...")
    
    try:
        client = genai.Client(api_key=api_key)
        response = client.models.generate_content(
            model="gemini-2.0-flash-exp",
            contents="Say hello!",
        )
        print(f"Success! Response: {response.text}")
    except Exception as e:
        print(f"Error calling Gemini: {str(e)}")