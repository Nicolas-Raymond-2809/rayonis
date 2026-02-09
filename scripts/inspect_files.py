
import google.genai
import os
import sys
from dotenv import load_dotenv

sys.stdout = open("inspect_files.txt", "w")
load_dotenv()

try:
    client = google.genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
    
    print("=== client.files ===")
    if hasattr(client, "files"):
        print(dir(client.files))
        
        if hasattr(client.files, "download"):
             print("\nHas separate download method")
             print(help(client.files.download))
        elif hasattr(client.files, "get"):
             print("\nHas get method")
             print(help(client.files.get))
        
        # Check content method
        if hasattr(client.files, "content"):
             print(help(client.files.content))

except Exception as e:
    print(e)
    
sys.stdout.close()
