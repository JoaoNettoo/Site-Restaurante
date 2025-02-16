from django.contrib import admin
from django.urls import path
from django.contrib.auth import views as auth_views
from meu_restaurante import views
from meu_restaurante.views import PedidoAPIView, LoginView, login_view

urlpatterns = [
    path('admin/', admin.site.urls),          # Painel admin do Django
    path('', views.index, name='index'),      # Página inicial
    path('pedido/', views.pedido, name='pedido'),  # Página de pedidos (corrigido)
    path('cardapio/', views.cardapio_view, name='#food-menu'),
    
    # API Endpoints
    path('api/pedido/', PedidoAPIView.as_view(), name='api-pedido'),  # API para pedidos
    path('api/login/', LoginView.as_view(), name='api-login'),  # API para login via JWT
    
    # Autenticação
    path('login/', login_view, name='login'),  # Página de login personalizada
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),  # Logout padrão do Django
]
