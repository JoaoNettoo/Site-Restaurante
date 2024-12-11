from django.shortcuts import render

# View para a página inicial
def index(request):
    return render(request, 'restaurante/index.html')  # Renderiza o template da página inicial

# View para a página de pedidos
def pedido(request):
    return render(request, 'restaurante/pedido.html')  # Renderiza o template da página de pedidos
