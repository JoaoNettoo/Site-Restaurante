from django.shortcuts import render, redirect
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate, login
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from django.contrib import messages

# View para a página inicial
def index(request):
    return render(request, 'restaurante/index.html')  # Renderiza o template da página inicial

# View para a página de pedidos
def pedido(request):
    return render(request, 'restaurante/pedido.html')  # Renderiza o template da página de pedidos

def cardapio_view(request):
    return render(request, 'restaurante/index.html')


# View para o login do formulário HTML
def login_view(request):
    if request.method == "POST":
        email = request.POST.get("email")
        senha = request.POST.get("senha")
        
        # Tenta obter o usuário pelo email
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            messages.error(request, "E-mail ou senha inválidos. Tente novamente.")
            return redirect('loginForm')  # Retorna à página inicial em caso de erro

        # Autentica usando o username do usuário encontrado
        user = authenticate(request, username=user.username, password=senha)
        
        if user:
            login(request, user)  # Faz o login do usuário
            messages.success(request, "Login efetuado com sucesso!")
            return redirect('food-menu')  # Redireciona para o cardápio
        else:
            messages.error(request, "E-mail ou senha inválidos. Tente novamente.")
            return redirect('index')  # Redireciona corretamente para a página inicial

    return render(request, 'restaurante/index.html')

# API para autenticação e geração de token JWT
class LoginView(APIView):
    def post(self, request):
        email = request.data.get("email")
        senha = request.data.get("senha")
        
        # Tenta obter o usuário pelo email
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({'success': False, 'message': 'Credenciais inválidas'}, status=400)

        # Autentica usando o username do usuário encontrado
        user = authenticate(request, username=user.username, password=senha)

        if user:
            # Geração do token JWT
            refresh = RefreshToken.for_user(user)
            return Response({
                'success': True,
                'token': str(refresh.access_token),
                'usuario': {
                    'email': user.email,
                    'nome': user.username,
                }
            }, status=200)

        return Response({'success': False, 'message': 'Credenciais inválidas'}, status=400)

# View protegida para usuários autenticados
class ProtectedView(APIView):
    permission_classes = [IsAuthenticated]  # Requer autenticação

    def get(self, request):
        return Response({'message': 'Você está autenticado!'})

# API para pedidos
class PedidoAPIView(APIView):
    def get(self, request):
        # Exemplo de resposta simulada
        data = {
            "message": "Bem-vindo à API de pedidos!",
            "status": "success",
        }
        return Response(data, status=status.HTTP_200_OK)
    
    def post(self, request):
        # Simulando a criação de um pedido
        pedido_data = request.data
        return Response(
            {"message": "Pedido recebido com sucesso!", "pedido": pedido_data},
            status=status.HTTP_201_CREATED
        )
