from django.db import models


class Planet(models.Model):
    planet_id = models.AutoField(primary_key=True)
    planet_name = models.CharField(max_length=255, null=False, blank=False)
    home_star = models.CharField(max_length=100, null=False, blank=False)
    mass = models.FloatField()
    radius = models.FloatField()
    distance = models.FloatField()

    def __str__(self):
        return self.planet_name

    class Meta:
        db_table = 'planet'
        ordering = ['planet_id']
