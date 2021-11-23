from django.db import models
from django.contrib.auth.models import User

class GeneratedURL(models.Model):
    """Model for user account"""
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    path = models.CharField(max_length=200)
    valid_until = models.DateField()
