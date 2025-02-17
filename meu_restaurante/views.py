from django.shortcuts import render, redirect
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate, login
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from django.contrib import messages
from rest_framework.status import HTTP_200_OK, HTTP_401_UNAUTHORIZED
from django.contrib.auth import logout

# View para a página inicial
def index(request):
    return render(request, 'restaurante/index.html')  # Renderiza o template da página inicial

# View para a página de pedidos
def pedido(request):
    return render(request, 'restaurante/pedido.html')  # Renderiza o template da página de pedidos

# View para a sessão do cardápio
def cardapio_view(request):
    return render(request, 'restaurante/index.html', {'mostrar_cardapio': True})

# View para o login e registro
def login_view(request):
    if request.method == "POST":
        email = request.POST.get("username")
        senha = request.POST.get("senha")

        # Tenta obter o usuário pelo e-mail
        user = User.objects.filter(username=email).first()

        if user is None:
            # Se o usuário não existe, cria um novo usuário
            user = User.objects.create_user(username=email, password=senha)
            user.save()
            messages.success(request, "Usuário criado e logado com sucesso!")
            login(request, user)
            return redirect('food-menu')  # Redireciona para o cardápio após o login e criação do usuário

        # Se o usuário existe, tenta autenticar
        user = authenticate(request, username=user.username, password=senha)

        if user:
            login(request, user)
            messages.success(request, "Login efetuado com sucesso!")
            return redirect('food-menu')  # Redireciona para o cardápio após login
        else:
            messages.error(request, "E-mail ou senha inválidos. Tente novamente.")
            return redirect('login')  # Retorna à página de login em caso de erro

    return render(request, 'restaurante/index.html')

# API para autenticação e geração de token JWT
class LoginView(APIView):
    def post(self, request):
        username = request.data.get("email")  
        senha = request.data.get("senha")

        # Verifica se o usuário existe no banco de dados
        try:
            user = User.objects.get(username=username)  
        except User.DoesNotExist:
            return Response({'success': False, 'message': 'Credenciais inválidas'}, status=HTTP_401_UNAUTHORIZED)

        # Autentica o usuário
        user = authenticate(request, username=username, password=senha)

        if user is not None:
            # Geração do token JWT
            refresh = RefreshToken.for_user(user)
            return Response({
                'success': True,
                'token': str(refresh.access_token),
                'usuario': {
                    'email': user.email,
                    'nome': user.username,
                }
            }, status=HTTP_200_OK)

        return Response({'success': False, 'message': 'Credenciais inválidas'}, status=HTTP_401_UNAUTHORIZED)

# View para logout
def logout_view(request):
    logout(request)  # Desloga o usuário
    messages.success(request, "Você saiu da sua conta com sucesso.")  # Mensagem de sucesso
    return redirect('index')  # Redireciona para a página inicial

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
