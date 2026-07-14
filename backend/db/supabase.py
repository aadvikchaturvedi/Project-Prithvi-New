import os
from pathlib import Path
from dotenv import load_dotenv
from supabase import Client, create_client

load_dotenv(Path(__file__).resolve().parent.parent / '.env')

supabase_url: str = os.environ["SUPABASE_URL"]
supabase_key: str = os.environ["SUPABASE_KEY"] 

client: Client = create_client(supabase_url, supabase_key)