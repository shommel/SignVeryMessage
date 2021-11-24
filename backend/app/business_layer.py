from app.models import UserAccount, GeneratedURL
from random import choice
import string
from datetime import datetime

def random_path(length=50):
    """Generating a random string of fixed length to be appended to URL"""
    return ''.join(choice(
            string.ascii_lowercase + string.digits
        ) for _ in range(length))

def generate_url(_hash, link_lifetime=5):
    """Generating a url upon user request"""
    user = UserAccount.objects.get(username="test")

    url = GeneratedURL.objects.create(
        user=user, 
        create_timestamp=datetime.now(), 
        path=random_path(), 
        minutes_valid_for=link_lifetime, 
        challenge_message=_hash
    )

    return url