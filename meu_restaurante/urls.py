from django.contrib import admin
from django.urls import path
from django.contrib.auth import views as auth_views  # Importando as views de autenticação do Django
from meu_restaurante import views  
from meu_restaurante.views import PedidoAPIView
from meu_restaurante.views import LoginView
from .views import login_view

urlpatterns = [
    path('admin/', admin.site.urls),         # Rota para o admin
    path('', views.index, name='index'),     # Rota para a página inicial
    path('pedido.html', views.pedido, name='pedido'),  # Rota para a página de pedido
    path('api/pedido/', PedidoAPIView.as_view(), name='api-pedido'),  # Endpoint da API
    path('api/login/', LoginView.as_view(), name='api-login'),
    path('login/', auth_views.LoginView.as_view(), name='login'), # Rota de login
    path('logout/', auth_views.LogoutView.as_view(), name='logout'), # Rota de logout
    path('login/', login_view, name='login'),  # URL para a função de login
]


