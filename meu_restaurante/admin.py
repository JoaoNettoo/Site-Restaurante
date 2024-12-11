from django.contrib import admin
from .models import Prato, Pedido, Carrinho

# Registrar os modelos para o painel admin
admin.site.register(Prato)
admin.site.register(Pedido)
admin.site.register(Carrinho)
