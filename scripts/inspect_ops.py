
import google.genai
import os
import sys
from dotenv import load_dotenv

sys.stdout = open("inspect_ops.txt", "w")
load_dotenv()

try:
    client = google.genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
    
    print("=== client.operations ===")
    print(dir(client.operations))
    
    print("\n=== Help on client.operations ===")
    # help(client.operations) # might be too big
    
    # Check for get, wait, list
    if hasattr(client.operations, "get"):
        print("Has .get method")
        print(help(client.operations.get))
        
    if hasattr(client.operations, "wait"):
        print("Has .wait method")
    
except Exception as e:
    print(e)
    
sys.stdout.close()
