from django.contrib import admin
from django.urls import path
from django.contrib.auth import views
from meu_restaurante import views
from meu_restaurante.views import PedidoAPIView, LoginView, login_view
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),          # Painel admin do Django
    path('', views.index, name='index'),      # Página inicial
    path('pedido/', views.pedido, name='pedido'),  # Página de pedidos
    path('cardapio/', views.cardapio_view, name='food-menu'),
    
    # API Endpoints
    path('api/pedido/', PedidoAPIView.as_view(), name='api-pedido'),  # API para pedidos
    path('api/login/', LoginView.as_view(), name='api-login'),  # API para login via JWT
    
    # Autenticação
    path('login/', login_view, name='login'),  
    path('logout/', views.logout_view, name='logout'),
    
    path('accounts/', include('allauth.urls')),  # Adiciona as URLs do allauth


 ]
