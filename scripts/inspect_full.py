
import google.genai
from google.genai import types
import os
from dotenv import load_dotenv
import time

load_dotenv()

def test_veo():
    client = google.genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
    
    print("Testing Veo via google-genai...")
    
    try:
        # Prompt
        prompt = "A cinematic drone shot of a futuristic city at sunset, 4k, realistic."
        
        # Call generate_videos
        # Guessing signature based on list_models output and standard patterns
        response = client.models.generate_videos(
            model="veo-2.0-generate-001", 
            prompt=prompt,
            config=types.GenerateVideosConfig(
                number_of_videos=1,
                # aspect_ratio="16:9", # Might be needed or optional
            )
        )
        
        print("\nResponse:")
        print(response)
        
        # Check if we have video bytes or URI
        if hasattr(response, "video"):
             print("Has video attribute")
        if hasattr(response, "generated_videos"):
             print("Has generated_videos attribute")
             
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    test_veo()
