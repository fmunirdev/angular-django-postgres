from rest_framework.decorators import api_view
from rest_framework.generics import CreateAPIView
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
import os

from api.serializers import PlanetSerializer
from api.models import Planet


class PlanetCreateView(CreateAPIView):
    queryset = Planet.objects.all()
    serializer_class = PlanetSerializer


class PlanetPagination(PageNumberPagination):
    page_size = 10


class PlanetViewSet(viewsets.ModelViewSet):
    queryset = Planet.objects.all()
    serializer_class = PlanetSerializer
    pagination_class = PlanetPagination
