from django.db import models

class UserAccount(models.Model):
    """Model for user account"""
    username = models.CharField(max_length=50)

class GeneratedURL(models.Model):
    user = models.ForeignKey(UserAccount, null=True, on_delete=models.CASCADE)
    path = models.CharField(max_length=200)
    minutes_valid_for = models.IntegerField(default=5)
    challenge_message = models.CharField(max_length=200)

    @property
    def is_valid(self):
        return True
    
