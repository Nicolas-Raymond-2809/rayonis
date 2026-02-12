import os
import csv
import io
import requests
import json
import time
import subprocess
from datetime import datetime
from email.utils import parsedate_to_datetime
import re
from dotenv import load_dotenv
from google import genai
from google.genai import types

# Load Env
load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    print("❌ Error: GEMINI_API_KEY not found.")
    exit(1)

# Configuration
SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRKz4BkYgGWWMeHrvsX5ufRSuQeKP1A9CdsTQz8919kQr2YCQteDeG3-Pes77CDu4Z8DuSVUEd8V0rY/pub?output=tsv"
RADIO_DIR = "src/content/radio"

def get_slug(text):
    """Simple slugify function with truncation."""
    text = text.lower()
    text = re.sub(r'[^\w\s-]', '', text)
    text = re.sub(r'[\s_-]+', '-', text)
    slug = text.strip("-")
    return slug[:50]  # Truncate to 50 chars for authorized filenames

def fetch_rss_items():
    """Fetches and parses the TSV from Google Sheets."""
    print(f"🌐 Fetching data from Google Sheet...")
    try:
        response = requests.get(SHEET_URL)
        response.raise_for_status()
        f = io.StringIO(response.content.decode('utf-8'))
        reader = csv.DictReader(f, delimiter='\t')
        return list(reader)
    except Exception as e:
        print(f"❌ Error fetching sheet: {e}")
        return []

def parse_date(date_str):
    """Parses RFC 2822 date string e.g., 'Thu, 05 Feb 2026 16:00:00 +0000'."""
    try:
        dt = parsedate_to_datetime(date_str)
        return dt
    except Exception as e:
        # print(f"⚠️ Date parse error '{date_str}': {e}") # Reduce noise
        return None

def analyze_article(article):
    """Generates analysis using Gemini."""
    client = genai.Client(api_key=GEMINI_API_KEY)
    
    prompt = f"""
RÔLE: Tu es "Radio Rayonis", un analyste IA expert et incisif.
TACHE: fetch et analyse cet article pour une audience de développeurs/architectes techniques.
ARTICLE:
- Titre: {article.get("Titre de l'Article")}
- Résumé/Contenu: {article.get("Résumé de l'Article")}
- Lien: {article.get("Lien")}

FORMAT DE SORTIE (JSON STRICT):
{{
  "summary": "Résumé ultra-concis en 2 phrases max (Français).",
  "key_points": ["Point clé 1", "Point clé 2", "Point clé 3"],
  "impact": "Pourquoi c'est important pour le Vibe Coding / l'IA ?",
  "score": 85, (Score de pertinence 'Vibe' sur 100)
  "tags": ["Tag1", "Tag2"],
  "emoji": "🤖"
}}
"""
    try:
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=prompt,
            config=types.GenerateContentConfig(
                response_mime_type="application/json"
            )
        )
        return json.loads(response.text)
    except Exception as e:
        print(f"❌ Analysis failed: {e}")
        return None

def save_radio_edition(article, analysis, date_obj):
    """Saves the analysis to markdown."""
    date_str = date_obj.strftime("%Y-%m-%d")
    folder_path = os.path.join(RADIO_DIR, date_str)
    os.makedirs(folder_path, exist_ok=True)
    
    slug = get_slug(article.get("Titre de l'Article", "no-title"))
    filename = f"{slug}.md"
    filepath = os.path.join(folder_path, filename)
    
    if os.path.exists(filepath):
        print(f"⏭️ Skipping (Already exists): {filename}")
        return

    # Helper to safe string for YAML
    def safe_str(val):
        return json.dumps(str(val) if val else "")

    # Parse category if it looks like a list
    raw_cat = article.get("Catégorie", "")
    final_cat = raw_cat
    
    try:
        # Check if it looks like a JSON array
        if raw_cat and isinstance(raw_cat, str) and raw_cat.strip().startswith("["):
             cat_list = json.loads(raw_cat)
             if isinstance(cat_list, list) and cat_list:
                 final_cat = cat_list[0] # Take first item
             else:
                 final_cat = str(cat_list)
    except Exception as e:
        # print(f"⚠️ Category parse warning: {e}")
        pass

    markdown = f"""---
title: {safe_str(article.get("Titre de l'Article"))}
date: {date_str}
link: {safe_str(article.get("Lien"))}
source: {safe_str(article.get("Nom du Flux RSS"))}
category: {safe_str(final_cat)}
score: {analysis.get('score', 50)}
emoji: {safe_str(analysis.get('emoji', '📻'))}
tags: {json.dumps(analysis.get('tags', []))}
---

### 🎙️ Le Vibe
{analysis.get('summary')}

### 🔑 Points Clés
{chr(10).join([f'- {p}' for p in analysis.get('key_points', [])])}

### 💥 Impact
{analysis.get('impact')}
"""
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(markdown)
    print(f"✅ Saved analysis: {filepath}")

def git_auto_push(date_str):
    """Commits and pushes generated content."""
    try:
        print("💾 Git Auto-Push initiated...")
        
        # Add specifically the radio content
        subprocess.run(["git", "add", "src/content/radio"], check=True)
        
        # Check if there are staged changes to commit
        # git diff --cached --quiet returns 1 if there are changes, 0 if none
        result = subprocess.run(["git", "diff", "--cached", "--quiet"], capture_output=True)
        
        if result.returncode == 0:
            print("⏭️ No changes to commit.")
            return

        commit_msg = f"📻 Radio Rayonis {date_str}"
        subprocess.run(["git", "commit", "-m", commit_msg], check=True)
        subprocess.run(["git", "push"], check=True)
        print("✅ Git Push successful.")
    except subprocess.CalledProcessError as e:
        print(f"⚠️ Git operation failed: {e}")

def main():
    print("📻 Starting Radio Rayonis Agent...")
    
    items = fetch_rss_items()
    if not items:
        return

    today = datetime.now().date()
    
    # Logic:
    # Filter ONLY items where date == Today

    candidates = []
    
    print(f"📅 Date: {today} | Mode: DAILY (Filtering for today's articles)")

    for item in items:
        pub_date = parse_date(item.get('Date de Publication'))
        if not pub_date:
            continue
            
        pub_date_date = pub_date.date()
        
        # Strict mode: Only valid if date IS today
        if pub_date_date == today:
                candidates.append((pub_date, item))

    # Sort by date descending
    candidates.sort(key=lambda x: x[0], reverse=True)
    
    print(f"🗞️ Daily Edition: Found {len(candidates)} articles for today.")

    for pub_date, item in candidates:
        title = item.get("Titre de l'Article", "Unknown Title")
        print(f"🧠 Analyzing: {title}...")
        analysis = analyze_article(item)
        if analysis:
            save_radio_edition(item, analysis, pub_date)
            time.sleep(2) # Rate limit politeness

    print("🎉 Radio Rayonis emission complete.")
    
    # Auto-push
    git_auto_push(today.strftime("%Y-%m-%d"))

if __name__ == "__main__":
    main()
