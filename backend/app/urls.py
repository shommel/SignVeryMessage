from django.urls import path, include
from .views import bitcoin_message_verify, generate_challenge_message
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('api/token/access/', TokenRefreshView.as_view(), name='token_get_access'),
    path('api/token/both/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path("api/verify/", bitcoin_message_verify, name="bitcoin_message_verify"),
    path("api/random/", generate_challenge_message, name="generate_challenge_message")
]

"""
- For the first view, you send the refresh token to get a new access token.
- For the second view, you send the client credentials (username and password)
  to get BOTH a new access and refresh token.
"""
