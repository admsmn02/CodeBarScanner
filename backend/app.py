from supabase_py import create_client, Client
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Supabase URL and API key
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_API_KEY = os.getenv("SUPABASE_API_KEY")

# Create a Supabase client
supabase: Client = create_client(SUPABASE_URL, SUPABASE_API_KEY)

def check_barcode(barcode):
    # Query the database to check if the barcode exists in the product table
    response = supabase.table("products").select("*").eq("barcode", barcode).execute()

    # Check if the response contains any rows
    if response.get("data"):
        print(f"Barcode {barcode} is related to a product.")
    else:
        print(f"Barcode {barcode} is not related to any product.")

# Example usage
if __name__ == "__main__":
    barcode_to_check = "349349394374"  # Replace with the barcode you want to check
    check_barcode(barcode_to_check)