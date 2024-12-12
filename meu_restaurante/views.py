from django.shortcuts import render
from rest_framework.views import APIView

# View para a página inicial
def index(request):
    return render(request, 'restaurante/index.html')  # Renderiza o template da página inicial

# View para a página de pedidos
def pedido(request):
    return render(request, 'restaurante/pedido.html')  # Renderiza o template da página de pedidos

# API para retornar uma mensagem ou dados do pedido
class PedidoAPIView(APIView):
    def get(self, request):
        # Exemplo de retorno de dados simulados
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