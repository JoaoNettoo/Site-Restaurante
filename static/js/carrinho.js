let carrinho = [];

// Adiciona produto ao carrinho e verifica autenticação
function adicionarAoCarrinho(id, nome, preco, imagem) {
  const usuario = localStorage.getItem("usuario");
  if (!usuario) {
    alert("Você precisa estar logado para adicionar itens ao carrinho.");
    window.location.href = "{% url 'contact' %}";
    return;
  }

  const produtoExistente = carrinho.find(produto => produto.id === id);

  if (produtoExistente) {
    produtoExistente.quantidade += 1;
  } else {
    carrinho.push({ id, nome, preco, imagem, quantidade: 1 });
  }

  salvarCarrinho();
  atualizarCarrinho();
}

// Adiciona produto e redireciona para a página de pedidos
function adicionarPedidoERedirecionar(id, nome, preco, imagem) {
  adicionarAoCarrinho(id, nome, preco, imagem);
  window.location.href = "{% url 'pedido' %}";
}

// Reduz a quantidade de um produto no carrinho
function reduzirDoCarrinho(id) {
  const produto = carrinho.find(produto => produto.id === id);

  if (produto) {
    produto.quantidade -= 1;
    if (produto.quantidade <= 0) {
      carrinho = carrinho.filter(produto => produto.id !== id);
    }
  }

  salvarCarrinho();
  atualizarCarrinho();
}

// Remove um produto do carrinho
function removerDoCarrinho(id) {
  carrinho = carrinho.filter(produto => produto.id !== id);

  salvarCarrinho();
  atualizarCarrinho();
}

// Cancela o pedido
function cancelarPedido() {
  carrinho.forEach(produto => removerDoCarrinho(produto.id));
  salvarCarrinho();
  atualizarCarrinho();
  location.reload(true);
}

// Salva o carrinho no localStorage
function salvarCarrinho() {
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

// Atualiza a interface do carrinho
function atualizarCarrinho() {
  const carrinhoDiv = document.getElementById("carrinho");
  const totalDiv = document.getElementById("total");

  carrinhoDiv.innerHTML = "";
  let total = 0;

  carrinho.forEach(produto => {
    total += produto.preco * produto.quantidade;

    carrinhoDiv.innerHTML += `
      <div style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="${produto.imagem}" alt="${produto.nome}" style="width: 50px; height: 50px; margin-right: 10px;">
        <div>
          <p>${produto.nome} - R$${produto.preco.toFixed(2)} x ${produto.quantidade}</p>
          <button onclick="adicionarAoCarrinho(${produto.id}, '${produto.nome}', ${produto.preco}, '${produto.imagem}')">+</button>
          <button onclick="reduzirDoCarrinho(${produto.id})">-</button>
          <button onclick="removerDoCarrinho(${produto.id})">Remover</button>
        </div>
      </div>
    `;
  });

  totalDiv.textContent = `Total: R$ ${total.toFixed(2)}`;
}

// Finaliza o pedido
async function finalizarPedido() {
  try {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (!usuario) {
      alert("Você precisa estar logado para finalizar o pedido.");
      return;
    }

    // Exemplo de chamada à API para salvar o pedido
    const response = await fetch("https://suaapi.com/pedidos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        usuario: usuario.email,
        carrinho: carrinho,
        total: carrinho.reduce((total, produto) => total + produto.preco * produto.quantidade, 0),
      }),
    });

    if (response.ok) {
      alert("Pedido finalizado com sucesso!");
      cancelarPedido(); // Limpa o carrinho após finalizar o pedido
    } else {
      alert("Erro ao finalizar o pedido. Tente novamente.");
    }
  } catch (error) {
    console.error("Erro ao finalizar o pedido:", error);
    alert("Ocorreu um erro. Por favor, tente novamente.");
  }
}
