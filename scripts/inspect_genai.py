
import google.genai
import inspect

print("Inspect google.genai:")
print(dir(google.genai))

if hasattr(google.genai, "Client"):
    client = google.genai.Client(api_key="TEST")
    print("\nClient methods:")
    print(dir(client))
    print("\nClient.models methods:")
    print(dir(client.models))
    
    # Check for anything video related
    print("\nSearch for 'video' or 'veo':")
    for x in dir(client.models):
        if "video" in x.lower() or "veo" in x.lower():
            print(f"client.models.{x}")
