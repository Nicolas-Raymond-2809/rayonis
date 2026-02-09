import os
import json
import glob
import time
import subprocess
import base64
from datetime import datetime
from dotenv import load_dotenv
import io
from PIL import Image
import google.generativeai as genai
from openai import OpenAI

# 1. Load Environment Variables
load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

if not GEMINI_API_KEY or not OPENAI_API_KEY:
    print("❌ Error: Missing API Keys in .env file.")
    # In a real scenario, we might exit here, but for development/dry-run without keys,
    # we'll let it fail gracefully later or check logic.
    # exit(1)

# Configure APIs
genai.configure(api_key=GEMINI_API_KEY)
openai_client = OpenAI(api_key=OPENAI_API_KEY)

# Configuration
BLOG_DIR = "src/content/blog"
IMAGE_DIR = "public/images/blog"
os.makedirs(BLOG_DIR, exist_ok=True)
os.makedirs(IMAGE_DIR, exist_ok=True)

def get_existing_posts():
    """Returns a list of the last 10 markdown files to avoid duplicates."""
    files = glob.glob(os.path.join(BLOG_DIR, "*.md"))
    files.sort(key=os.path.getmtime, reverse=True)
    return [os.path.basename(f) for f in files[:10]]

def generate_content(existing_posts):
    """Generates blog post content using Google Gemini."""
    model = genai.GenerativeModel('gemini-2.0-flash')

    meta_prompt = f"""
RÔLE :
Tu es "Jules", une IA experte en Architecture de Solutions Digitales, spécialisée dans le "Vibe Coding" (programmation assistée par IA), la JAMstack (Astro, Next.js) et l'automatisation (n8n, GitHub Actions). Tu rédiges des articles techniques pour un blog de développeurs modernes.
IMPORTANT : TU DOIS RÉDIGER L'INTÉGRALITÉ DU CONTENU (TITRE, DESCRIPTION, CORPS) EN FRANÇAIS. DO NOT WRITE IN ENGLISH.

TES OBJECTIFS :
1. Produire un tutoriel ou une analyse technique de haute qualité par jour, EN FRANÇAIS.
2. Vulgariser l'usage de l'IA dans le développement (Coding assistant, génération de code).
3. Fournir un contenu "prêt à commit" pour un site statique Astro.

CONTEXTE (Articles existants à ne pas dupliquer) :
{json.dumps(existing_posts)}

RÈGLES ÉDITORIALES :
- LANGUE : FRANÇAIS UNIQUEMENT.
- LONGUEUR : Entre 800 et 1500 mots.
- TON : Professionnel, enthousiaste, orienté "Do It Yourself". Pas de jargon académique.
- **PHILOSOPHIE VIBE CODING** : 
    * Ne rentre PAS dans la complexité du code syntaxique. On n'est pas là pour apprendre le C++ mais pour bâtir.
    * Privilégie l'**Architecture**, l'**Orchestration** et le **Prompting**.
    * Montre *comment demander à l'IA* de coder pour nous, plutôt que de donner le code brut.
    * Si tu donnes du code, fais-le court et explique la *logique* (le "Vibe") plutôt que la syntaxe.
- IMPORTANT : DIVERSIFIE LES SUJETS. Ne parle pas systématiquement d'Astro. Alterne entre les 5 axes stratégiques de l'Architecte de Solutions Digitales :
    1. **Orchestration d'Agents (Agentic Workflows)** : LangGraph, CrewAI, AutoGen. Comment faire travailler plusieurs IA ensemble.
    2. **Model Context Protocol (MCP) & Context Engineering** : Structurer la donnée pour l'IA.
    3. **Guardrails & Sécurité** : NeMo Guardrails, validation automatique, sécurité du code généré.
    4. **Interconnexion des Écosystèmes** : Hybride, Multi-Cloud (Vercel, Supabase, Ollama, Antigravity).
    5. **FinOps & Performance IA** : Coûts, Prompt Caching, SLM (Small Language Models).
- SUJETS AUTORISÉS : Vibe Coding, Astro, Tailwind CSS, Python Scripts, Automatisation, IA Générative (API), Agentic Workflows, MCP, Sécurité IA, FinOps.
- SUJETS INTERDITS : Code bas niveau complexe (C++, Assembly), Administration système lourde, Politique.
- FORMATAGE : Utilise le format Markdown standard.

FORMAT DE SORTIE (JSON STRICT) :
Tu dois répondre UNIQUEMENT avec un objet JSON valide suivant cette structure exacte :

{{
  "title": "Titre accrocheur (max 60 caractères)",
  "slug": "titre-optimise-seo-kebab-case",
  "category": "Choisir UNE catégorie parmi : 'Vibe Coding', 'Agentic Workflows', 'MCP & Context', 'Security & Guardrails', 'Interconnection', 'FinOps & Performance'",
  "description": "Une méta-description pour le SEO (max 160 caractères) qui donne envie de cliquer.",
  "tags": ["Tag1", "Tag2", "Tag3"],
  "image_prompt": "Une description visuelle détaillée (en anglais) pour DALL-E 3. Style : Cyberpunk, Synthwave, Minimalist Tech ou Pixel Art. Pas de texte dans l'image.",
  "video_prompt": "A prompt describing a 5-second cinematic teaser video for this article. Style: Abstract Tech, 4k, fluid motion, neural networks, digital architecture. Format: High quality text-to-video prompt.",
  "markdown_content": "Le corps de l'article en Markdown.\\n\\n- IMPORTANT: Échappe bien tous les caractères spéciaux (guillemets, sauts de ligne).\\n- Utilise \\n pour les sauts de ligne DANS cette chaîne JSON.\\n- Utilise ## pour les titres..."
}}
"""

    # Configure generation to output JSON
    generation_config = genai.GenerationConfig(
        response_mime_type="application/json"
    )

    max_retries = 3
    for attempt in range(max_retries):
        try:
            response = model.generate_content(meta_prompt, generation_config=generation_config)
            text_response = response.text
            
            # Attempt to parse JSON
            try:
                # First try raw
                article_data = json.loads(text_response)
            except json.JSONDecodeError:
                # If fail, try to clean common issues
                print("⚠️ JSON Parse Error, attempting repairs...")
                import re
                
                # 1. Remove markdown code blocks if present ( ```json ... ``` )
                cleaned_text = re.sub(r"```json\s*", "", text_response)
                cleaned_text = re.sub(r"```\s*$", "", cleaned_text)
                
                # 2. Simple regex fix for newlines in JSON strings if they are literal newlines
                cleaned_text = re.sub(r'(?<!\\)\n', '\\n', cleaned_text) 
                
                # 3. Fix invalid escape sequences (often \ in paths or text)
                # This regex looks for a backslash that is NOT followed by " / \ b f n r t u
                cleaned_text = re.sub(r'\\(?![/\\bfnrtu"])', r"\\\\", cleaned_text)
                
                # 4. Fix unescaped quotes inside strings (hard to do perfectly with regex, but we can try basic ones)
                # (Skipping risky quote repair for now, usually backslash is the culprit)
                
                try:
                    article_data = json.loads(cleaned_text)
                except json.JSONDecodeError as e:
                    print(f"❌ Critical JSON Error after cleaning: {e}")
                    # Re-raise to be caught by the outer retry loop
                    raise e 
            
            return article_data
        except Exception as e:
            if attempt < max_retries - 1:
                wait_time = 2 ** attempt
                print(f"⚠️ Error generation content (Attempt {attempt+1}/{max_retries}): {e}. Retrying in {wait_time}s...")
                time.sleep(wait_time)
            else:
                print(f"❌ Error generating content with Gemini after {max_retries} attempts: {e}")
                return None
    return None

def generate_video_veo(prompt, slug):
    """Generates a video using Google Vertex AI (Veo)."""
    credentials_path = "google_credentials.json"
    if not os.path.exists(credentials_path):
        print("⚠️ No google_credentials.json found. Skipping video generation.")
        return None

    try:
        # Set credentials explicitly for this session
        os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = credentials_path
        
        # Initialize Vertex AI
        import vertexai
        from vertexai.preview.vision_models import ImageGenerationModel # Veo access might differ, using generic for now
        # Note: Actual Veo integration requires specific preview library. 
        # Checking if google-cloud-aiplatform is sufficient.
        
        # For Veo specifically, users often use the Model Garden endpoint.
        # This is a placeholder for the actual Veo call which is restricted preview.
        # We will Simulate it or use Imagen 2 if Veo isn't public public.
        # But wait, Veo is 'veo-2.0-generate-001'.
        
        # Let's try the standard Vertex AI generation flow
        vertexai.init(location="us-central1") # Veo is often in us-central1
        
        # As of late 2024/2025, Veo might be accessed via:
        # model = ImageGenerationModel.from_pretrained("veo-2.0-generate-001") 
        # But ImageGenerationModel is for images. 
        # Video generation usually uses `VideoGenerationModel` or similar.
        
        # Since exact python SDK for Veo isn't guaranteed in this env, we will try a generic approach
        # or skip if library missing.
        
        print(f"🎥 Generating video for {slug} with prompt: {prompt}...")
        
        # Initialize Vertex AI using GAPIC client (v1beta1) for LRO support
        # This is the robust way to handle Veo's Operation polling.
        # We wrap this in a try/except to ensure the blog post is saved even if video fails.
        
        try:
            from google.cloud import aiplatform_v1beta1
            import google.auth
            
            # Get credentials
            credentials, project_id = google.auth.load_credentials_from_file(
                credentials_path,
                scopes=["https://www.googleapis.com/auth/cloud-platform"]
            )

            # Client options for us-central1
            client_options = {"api_endpoint": "us-central1-aiplatform.googleapis.com"}
            client = aiplatform_v1beta1.PredictionServiceClient(
                credentials=credentials,
                client_options=client_options
            )
            
            # Endpoint resource name
            location = "us-central1"
            model_id = "veo-2.0-generate-001"
            endpoint = f"projects/{project_id}/locations/{location}/publishers/google/models/{model_id}"
            
            # Prepare request
            instance = {"prompt": prompt}
            parameters = {
                "sampleCount": 1,
                "durationSeconds": 6,
                "aspectRatio": "16:9"
            }
            
            print(f"📡 Calling Veo API (GAPIC v1beta1) for {slug}...")
            
            # Call predict_long_running
            operation = client.predict_long_running(
                endpoint=endpoint,
                instances=[instance],
                parameters=parameters
            )
            
            print(f"⏳ Video generation started. Operation Name: {operation.operation.name}")
            print("⏳ Waiting for video completion (max 3 mins)...")
            
            # Wait for result (blocks until done)
            # Timeout set to 180s to prevent infinite hanging
            response = operation.result(timeout=180)
            
            # Check for video in response
            if not response.predictions:
                print("❌ No predictions returned.")
                return None
                
            prediction = response.predictions[0]
            
            # Extract video bytes
            video_b64 = None
            if hasattr(prediction, "get"): # Dict-like
                 video_b64 = prediction.get("bytesBase64Encoded")
            else: # Proto-like (Struct)
                 try:
                     video_b64 = prediction['bytesBase64Encoded']
                 except:
                     pass
            
            if not video_b64:
                 print(f"❌ Could not extract video bytes. Response may be empty.")
                 return None
                 
            video_data = base64.b64decode(video_b64)
            
            # Save the video
            video_filename = f"{slug}.mp4"
            video_dir = os.path.join("public", "videos", "blog")
            os.makedirs(video_dir, exist_ok=True)
            video_path = os.path.join(video_dir, video_filename)
            
            with open(video_path, "wb") as f:
                f.write(video_data)
                
            print(f"✅ Video saved to {video_path}")
            return f"/videos/blog/{video_filename}"
            
        except ImportError:
             print("❌ google-cloud-aiplatform library missing or incompatible.")
             return None
        except Exception as e:
            print(f"❌ Video generation failed: {e}")
            print("⚠️ Continuing without video...")
            return None
            
        # Cleanup GAPIC imports from previous attempts if any
        # (This block replaces the keys parts)

    except Exception as e:
        print(f"❌ Video generation failed (Raw API): {e}")
        return None


def generate_image(prompt, slug):
    """Generates an image using DALL-E 3 and saves it locally."""
    try:
        response = openai_client.images.generate(
            model="dall-e-3",
            prompt=prompt,
            size="1792x1024",
            quality="standard",
            n=1,
            response_format="b64_json" # Use b64_json to save directly
        )

        image_data = base64.b64decode(response.data[0].b64_json)
        
        # Load image into Pillow
        image = Image.open(io.BytesIO(image_data))
        
        # Resize to max 1200px width
        max_width = 1200
        if image.width > max_width:
            ratio = max_width / image.width
            new_height = int(image.height * ratio)
            image = image.resize((max_width, new_height), Image.Resampling.LANCZOS)
            
        # Save as WebP
        image_filename = f"{slug}.webp"
        image_path = os.path.join(IMAGE_DIR, image_filename)
        
        image.save(image_path, "WEBP", quality=80, optimize=True)

        print(f"✅ Image saved to {image_path}")
        return f"/images/blog/{image_filename}"
    except Exception as e:
        print(f"❌ Error generating image with DALL-E: {e}")
        return None

def save_markdown(content_json, image_url):
    """Saves the blog post as a Markdown file with Frontmatter."""
    today = datetime.now().strftime("%Y-%m-%d")
    filename = f"{content_json['slug']}.md"
    filepath = os.path.join(BLOG_DIR, filename)

    markdown = f"""---
title: "{content_json['title']}"
description: "{content_json['description']}"
date: {today}
tags: {json.dumps(content_json['tags'])}
category: "{content_json.get('category', 'Vibe Coding')}"
image: "{image_url}"
---

{content_json['markdown_content']}
"""

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(markdown)

    print(f"✅ Blog post saved to {filepath}")
    return filepath

def git_commit_push(slug):
    """Commits and pushes changes to GitHub."""
    try:
        subprocess.run(["git", "add", "."], check=True)
        subprocess.run(["git", "commit", "-m", f"🤖 Jules: Nouvel article [{slug}]"], check=True)
        subprocess.run(["git", "push"], check=True)
        print("✅ Git commit and push successful!")
    except subprocess.CalledProcessError as e:
        print(f"❌ Git error: {e}")

def main():
    print("🚀 Starting Agent Jules...")

    # 1. Get Context
    existing_posts = get_existing_posts()
    print(f"📚 Context: {len(existing_posts)} existing posts found.")

    # 2. Generate Content
    print("🧠 Generating content with Gemini...")
    content_json = generate_content(existing_posts)
    if not content_json:
        return

    print(f"✨ Title: {content_json['title']}")

    # 3. Generate Image
    print("🎨 Generating image with DALL-E 3...")
    image_url = generate_image(content_json['image_prompt'], content_json['slug'])
    
    # 3.1 Generate Video (Optional)
    if "video_prompt" in content_json:
        generate_video_veo(content_json['video_prompt'], content_json['slug'])

    if not image_url:
        print("⚠️ Failed to generate image, using placeholder or skipping.")
        # Create a placeholder if needed, or just fail.
        # For now, let's assume we need an image.
        # return

    # 4. Save Files
    save_markdown(content_json, image_url)

    # 5. Git Operations
    git_commit_push(content_json['slug'])

    print("🎉 Mission Accomplished!")

if __name__ == "__main__":
    main()
