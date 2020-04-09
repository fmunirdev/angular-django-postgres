from django.contrib import admin

from api.models import Planet


class PlanetAdmin(admin.ModelAdmin):
    list_display = ('planet_id', 'planet_name', 'home_star', 'mass', 'radius', 'distance')

admin.site.register(Planet, PlanetAdmin)
