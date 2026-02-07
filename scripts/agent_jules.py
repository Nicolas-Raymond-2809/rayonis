import os
import json
import glob
import time
import subprocess
import base64
from datetime import datetime
from dotenv import load_dotenv
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
    model = genai.GenerativeModel('models/gemini-2.0-flash')

    meta_prompt = f"""
RÔLE :
Tu es "Jules", une IA experte en Architecture de Solutions Digitales, spécialisée dans le "Vibe Coding" (programmation assistée par IA), la JAMstack (Astro, Next.js) et l'automatisation (n8n, GitHub Actions). Tu rédiges des articles techniques pour un blog de développeurs modernes.

TES OBJECTIFS :
1. Produire un tutoriel ou une analyse technique de haute qualité par jour.
2. Vulgariser l'usage de l'IA dans le développement (Coding assistant, génération de code).
3. Fournir un contenu "prêt à commit" pour un site statique Astro.

CONTEXTE (Articles existants à ne pas dupliquer) :
{json.dumps(existing_posts)}

RÈGLES ÉDITORIALES :
- LONGUEUR : Entre 800 et 1500 mots.
- TON : Professionnel, enthousiaste, orienté "Do It Yourself". Pas de jargon académique.
- SUJETS AUTORISÉS : Vibe Coding, Astro, Tailwind CSS, Python Scripts, Automatisation, IA Générative (API).
- SUJETS INTERDITS : Code bas niveau complexe (C++, Assembly), Administration système lourde, Politique.
- FORMATAGE : Utilise le format Markdown standard.

FORMAT DE SORTIE (JSON STRICT) :
Tu dois répondre UNIQUEMENT avec un objet JSON valide suivant cette structure exacte :

{{
  "title": "Titre accrocheur (max 60 caractères)",
  "slug": "titre-optimise-seo-kebab-case",
  "description": "Une méta-description pour le SEO (max 160 caractères) qui donne envie de cliquer.",
  "tags": ["Tag1", "Tag2", "Tag3"],
  "image_prompt": "Une description visuelle détaillée (en anglais) pour DALL-E 3. Style : Cyberpunk, Synthwave, Minimalist Tech ou Pixel Art. Pas de texte dans l'image.",
  "markdown_content": "Le corps de l'article en Markdown.\\n\\n- Utilise ## pour les titres de section (H2).\\n- Utilise ### pour les sous-sections (H3).\\n- Utilise des listes à puces pour la lisibilité.\\n- Inclus des blocs de code avec la syntaxe ```language.\\n- NE METS PAS le titre H1 au début (le template s'en charge).\\n- NE METS PAS le Frontmatter (les tirets ---).\\n- Cite au moins 2 sources ou documentations officielles en bas d'article."
}}
"""

    try:
        response = model.generate_content(meta_prompt)
        # Clean up response if it contains markdown code blocks
        text_response = response.text.replace("```json", "").replace("```", "").strip()
        return json.loads(text_response)
    except Exception as e:
        print(f"❌ Error generating content with Gemini: {e}")
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
        image_filename = f"{slug}.png"
        image_path = os.path.join(IMAGE_DIR, image_filename)

        with open(image_path, "wb") as f:
            f.write(image_data)

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
        # subprocess.run(["git", "push"], check=True) # Commented out for safety as per checklist
        print("✅ Git commit successful (Push commented out for safety)")
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
