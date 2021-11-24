from django.urls import path, include
from .views import bitcoin_message_verify, generate_challenge_message

urlpatterns = [
    path("api/verify/", bitcoin_message_verify, name="bitcoin_message_verify"),
    path("api/random/", generate_challenge_message, name="generate_challenge_message")
]
