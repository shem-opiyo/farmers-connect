from rest_framework import generics
from .models import Farm
from .serializers import FarmSerializer

class FarmDetailAPIView(generics.RetrieveAPIView):
    queryset = Farm.objects.all()
    serializer_class = FarmSerializer

class FarmerFarmsAPIView(generics.ListAPIView):
    serializer_class = FarmSerializer

    def get_queryset(self):
        farmer_id = self.kwargs.get('farmer_id')
        return Farm.objects.filter(farmer_id=farmer_id)

class FarmUpdateAPIView(generics.UpdateAPIView):
    queryset = Farm.objects.all()
    serializer_class = FarmSerializer

class FarmDeleteAPIView(generics.DestroyAPIView):
    queryset = Farm.objects.all()
    serializer_class = FarmSerializer

class FarmListAPIView(generics.ListAPIView):
    queryset = Farm.objects.all()
    serializer_class = FarmSerializer
