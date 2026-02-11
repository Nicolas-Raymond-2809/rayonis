import os
import sys
import time
from datetime import datetime

# Ensure we can import from the current directory (project root)
# or the directory where this script is if run directly.
# We assume this script is in /scripts, and we want to import agent_jules from /scripts
# But we run from root usually.
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

try:
    from agent_jules import generate_image
except ImportError:
    # If we are running from root, scripts/ is not in path unless we add it
    sys.path.append("scripts")
    from agent_jules import generate_image

# Configuration
SLUG = "ia-guardrails-securite-llm-vibe-coding"
# Prompt based on the article "Sécuriser vos Projets IA : Les Garde-Fous Essentiels pour LLM"
PROMPT = "Digital art representing AI security guardrails. A glowing digital path with neon blue and purple protective barriers protecting a neural network or AI core. Cyberpunk, Synthwave aesthetic. High quality, detailed, 8k, no text. Conceptual representation of 'LLM Security Guardrails'."

def fix_image():
    print(f"🔧 Starting image fix for: {SLUG}")
    print(f"📝 Prompt: {PROMPT}")
    
    # Retry logic
    max_retries = 3
    image_url = None
    
    for attempt in range(max_retries):
        try:
            image_url = generate_image(PROMPT, SLUG)
            if image_url:
                break
            
            print(f"⚠️ Attempt {attempt + 1} failed. Quota might be exhausted.")
            if attempt < max_retries - 1:
                wait_time = 10  # Wait 10 seconds before retry
                print(f"⏳ Waiting {wait_time}s before retrying...")
                time.sleep(wait_time)
        except Exception as e:
            print(f"❌ Error: {e}")
    
    if not image_url:
        print("❌ Failed to generate image after retries.")
        return

    # 2. Update Markdown File
    # Check if we are in root or scripts dir
    if os.path.exists("src/content/blog"):
        blog_dir = "src/content/blog"
    elif os.path.exists("../src/content/blog"):
         blog_dir = "../src/content/blog"
    else:
        print("❌ Could not find src/content/blog directory.")
        return

    blog_file = os.path.join(blog_dir, f"{SLUG}.md")
    
    if not os.path.exists(blog_file):
        print(f"❌ File not found: {blog_file}")
        return
        
    with open(blog_file, "r", encoding="utf-8") as f:
        content = f.read()
        
    # Replace the image placeholder
    # Check for both "None" and ensure we don't double replace if it was already set (unlikely here)
    if 'image: "None"' in content:
        new_content = content.replace('image: "None"', f'image: "{image_url}"')
        
        with open(blog_file, "w", encoding="utf-8") as f:
            f.write(new_content)
            
        print(f"✅ Updated {blog_file} with new image: {image_url}")
        
        # Git commit (optional, but good)
        try:
            import subprocess
            subprocess.run(["git", "add", blog_file], check=False)
            subprocess.run(["git", "commit", "-m", f"🎨 Fix image for {SLUG}"], check=False)
            subprocess.run(["git", "push"], check=False)
            print("✅ Changes pushed to Git.")
        except Exception as e:
            print(f"⚠️ Git operations failed: {e}")
            
    else:
        print(f"⚠️ Could not find 'image: \"None\"' in {blog_file}. It might have explicitly failed or already be set.")
        print("Check the file content manually if needed.")

if __name__ == "__main__":
    fix_image()
