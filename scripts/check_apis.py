import os
import json
import gspread
import traceback
from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build

CREDENTIALS_FILE = "google_credentials.json"
SCOPES = ["https://www.googleapis.com/auth/spreadsheets", "https://www.googleapis.com/auth/drive"]

def check_apis():
    print("🔍 Checking APIs...")
    
    if not os.path.exists(CREDENTIALS_FILE):
        print(f"❌ Error: {CREDENTIALS_FILE} not found.")
        return

    creds = Credentials.from_service_account_file(CREDENTIALS_FILE, scopes=SCOPES)
    
    # 1. Check Drive API (List files)
    print("\n[1] Testing Drive API (Listing files)...")
    try:
        service = build('drive', 'v3', credentials=creds)
        results = service.files().list(pageSize=5).execute()
        files = results.get('files', [])
        print(f"✅ Drive API Success! Found {len(files)} files.")
    except Exception as e:
        print(f"❌ Drive API Failed: {e}")
        # print(traceback.format_exc())

    # 2. Check Sheets API (Get specific sheet)
    print("\n[2] Testing Sheets API (Get Sheet Info)...")
    SHEET_ID = "1p63EGH-5d2hcJJTvHUXxo2Rmucr0RHRGkV3ejjW9JhA"
    try:
        service = build('sheets', 'v4', credentials=creds)
        sheet = service.spreadsheets().get(spreadsheetId=SHEET_ID).execute()
        print(f"✅ Sheets API Success! Title: {sheet.get('properties', {}).get('title')}")
    except Exception as e:
        print(f"❌ Sheets API Failed: {e}")
        if hasattr(e, 'content'):
             print(f"Response: {e.content.decode('utf-8')}")

if __name__ == "__main__":
    check_apis()
