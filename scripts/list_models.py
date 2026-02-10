import os
from dotenv import load_dotenv
from google import genai

load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    print("❌ API Key not found")
    exit(1)

client = genai.Client(api_key=api_key)

print("List of available models:")
try:
    for model in client.models.list(config={"page_size": 100}):
        print(f"- {model.name}")
except Exception as e:
    print(f"❌ Error listing models: {e}")
