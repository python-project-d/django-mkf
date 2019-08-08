from django.db import models

# Create your models here.
class User(models.Model):
    id=models.AutoField(primary_key=True)
    username=models.CharField(max_length=30,null=False)
    password_hash=models.CharField(max_length=128)

    def __str__(self):
        return self.username

    class Meta:
        db_table='bbs_user'