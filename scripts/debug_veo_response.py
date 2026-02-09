
import google.genai
from google.genai import types
import os
from dotenv import load_dotenv
import time

load_dotenv()

def debug_veo():
    client = google.genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
    
    print("Calling generate_videos...")
    try:
        # Short prompt for speed
        prompt = "Melting ice cream, 4k"
        
        response = client.models.generate_videos(
            model="veo-2.0-generate-001", 
            prompt=prompt,
            config=types.GenerateVideosConfig(
                number_of_videos=1,
            )
        )
        
        print("\n=== Response Object ===")
        print(f"Type: {type(response)}")
        print(f"Dir: {dir(response)}")
        print(f"Str: {response}")
        
        # Check for wait/result methods

        print("\n=== Polling Operation ===")
        # Basic Polling
        while True:
            # Check if done (assuming 'done' attribute exists as per str output 'done=None')
            # If done is None, it's not done? Or maybe it is True/False.
            # Let's refresh first
            print(f"Refreshing operation: {response.name}")
            response = client.operations.get(response)
            
            print(f"Status: done={response.done}")
            
            if response.done:
                 break
                 
            time.sleep(10)
            
        print("\n=== Operation Complete ===")
        print(response)
        
        # Now try to extract video
        if hasattr(response, "result"):
             print(f"Result: {response.result}")
        
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    debug_veo()
