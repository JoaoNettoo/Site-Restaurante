from django.contrib import admin
from django.urls import path
from meu_restaurante import views  # Importe as views do seu aplicativo

urlpatterns = [
    path('admin/', admin.site.urls),         # Rota para o admin
    path('', views.index, name='index'),    # Rota para a página inicial
    path('pedido/', views.pedido, name='pedido'),  # Rota para a página de pedido
]
