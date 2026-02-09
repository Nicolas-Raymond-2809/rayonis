
import google.genai
import os
from dotenv import load_dotenv

load_dotenv()

client = google.genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

print("Help on generate_videos:")
# In some versions it might be client.models.generate_video or generate_videos
if hasattr(client.models, "generate_videos"):
    print(help(client.models.generate_videos))
elif hasattr(client.models, "generate_video"):
    print(help(client.models.generate_video))
else:
    print("No generate_video method found directly.")

print("\nList Models:")
try:
    for m in client.models.list(config={"page_size": 100}):
        if "video" in m.name or "veo" in m.name:
            print(m.name)
except Exception as e:
    print(f"Error listing models: {e}")
