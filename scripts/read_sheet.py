import csv
import io
import requests

# Link provided by user (TSV format)
SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRKz4BkYgGWWMeHrvsX5ufRSuQeKP1A9CdsTQz8919kQr2YCQteDeG3-Pes77CDu4Z8DuSVUEd8V0rY/pub?output=tsv"

def read_public_sheet():
    print(f"🌐 Fetching data from: {SHEET_URL}")
    
    try:
        response = requests.get(SHEET_URL)
        response.raise_for_status()
        
        # Decode content
        content = response.content.decode('utf-8')
        
        # Parse TSV
        # Using io.StringIO to treat the string as a file for the csv module
        f = io.StringIO(content)
        reader = csv.DictReader(f, delimiter='\t')
        
        rows = list(reader)
        
        if not rows:
            print("⚠️ Sheet seems empty.")
            return

        print(f"📚 Found {len(rows)} rows.")
        if rows:
            print("-" * 40)
            headers = list(rows[0].keys())
            date_col = 'Date de Publication'
            if date_col in rows[0]:
                print(f"SAMPLE DATE: {rows[0][date_col]}")
            else:
                print(f"Column '{date_col}' not found. Keys: {headers}")
            return



            
        return rows

    except Exception as e:
        print(f"❌ Error fetching sheet: {e}")

if __name__ == "__main__":
    read_public_sheet()
