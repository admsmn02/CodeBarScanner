from flask import Flask, request, jsonify
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

app = Flask(__name__)

@app.route('/check-barcode', methods=['POST'])
def check_barcode():
    # Extract the barcode from the request
    barcode = request.json.get('barcode')
    
    # Query the database to check if the barcode exists in the product table
    response = supabase.table("products").select("*").eq("barcode", barcode).execute()

    # Check if the response contains any rows
    if response.get("data"):
        message = f"Barcode {barcode} is related to a product."
    else:
        message = f"Barcode {barcode} is not related to any product."
    
    # Return a JSON response
    return jsonify({'message': message})

if __name__ == "__main__":
    # Run the Flask app
    app.run(debug=True)