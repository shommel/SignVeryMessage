from django.db import models
from datetime import datetime, timedelta

class UserAccount(models.Model):
    """Model for user account"""
    username = models.CharField(max_length=50)

class GeneratedURL(models.Model):
    """Model for generated time-sensitive URL"""
    user = models.ForeignKey("app.UserAccount", null=True, on_delete=models.CASCADE)
    path = models.CharField(max_length=200)
    minutes_valid_for = models.IntegerField(default=5)
    create_timestamp = models.DateField()
    challenge_message = models.CharField(max_length=200)

    @property
    def is_valid(self):
        # Returns true if current timestamp is within the link's "valid" lifetime
        return (
            self.create_timestamp + timedelta(self.minutes_valid_for)
        ) <= datetime.now()
    
