from rest_framework import serializers
from .models import ItemCardapio, Pedido

class ItemCardapioSerializer(serializers.ModelSerializer):
    class Meta:
        model = ItemCardapio
        fields = '__all__'  # Inclui todos os campos do modelo

class PedidoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pedido
        fields = '__all__'
