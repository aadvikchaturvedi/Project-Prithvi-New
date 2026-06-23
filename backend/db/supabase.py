import os 
from supabase import Client, create_client 

supabase_url: str = os.environ["SUPABASE_URL"]
supabase_key: str = os.environ["SUPABASE_KEY"] 

client: Client = create_client(supabase_url, supabase_key)