
import os
import sys
from dotenv import load_dotenv
from google import genai

# Force UTF-8 stdout
sys.stdout.reconfigure(encoding='utf-8')

load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    print("❌ API Key not found")
    exit(1)

client = genai.Client(api_key=api_key)

print("List of available models:")
try:
    models = client.models.list(config={"page_size": 100})
    for model in models:
        print(f"- {model.name}")
except Exception as e:
    print(f"❌ Error listing models: {e}")
