document.addEventListener("DOMContentLoaded", function () {
  // Verifica autenticação ao carregar a página
  verificaAutenticacao();

  // Adiciona evento ao formulário de login
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", validaForms);
  }

  // Smooth scroll para os links com hash
  document.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", function (event) {
      if (this.hash !== "") {
        event.preventDefault();
        const hash = this.hash;
        const target = document.querySelector(hash);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
          history.pushState(null, null, hash);
        }
      }
    });
  });

  // Verifica se a seção do cardápio deve ser exibida ao carregar a página
  const foodMenu = document.getElementById("food-menu");
  const alertSuccess = document.querySelector(".alert-success");
  if (foodMenu && alertSuccess) {
    foodMenu.style.display = "block";
    window.scrollTo(0, foodMenu.offsetTop);
  }

  // Evento para o botão do cardápio
  const btnCardapio = document.querySelector(".btn-primary");
  if (btnCardapio) {
    btnCardapio.addEventListener("click", function () {
      if (isAuthenticated) {
        window.location.href = "/pedido.html"; // Redireciona para pedidos se autenticado
      } else {
        alert("Faça login para acessar o cardápio.");
        window.location.href = "#login-section"; // Redireciona para a seção de login
      }
    });
  }
});

// Variável de controle de autenticação
let isAuthenticated = false;

// Verifica se o usuário está autenticado
function verificaAutenticacao() {
  const usuario = localStorage.getItem("usuario");
  isAuthenticated = !!usuario; // Se houver usuário, autenticação é verdadeira
}

// Função para validar os formulários e fazer login
function validaForms(event) {
  event.preventDefault(); // Impede o envio padrão do formulário

  // Obtendo os elementos dos campos
  const emailInput = document.getElementById("email");
  const senhaInput = document.getElementById("senha");
  const emailErro = document.getElementById("emailErro");
  const senhaErro = document.getElementById("senhaErro");

  // Limpa mensagens de erro
  emailErro.innerText = "";
  senhaErro.innerText = "";

  const email = emailInput.value.trim();
  const senha = senhaInput.value.trim();
  let valida = true;

  // Validação do e-mail
  if (email === "") {
    emailErro.innerText = "Por favor, insira seu e-mail.";
    valida = false;
  } else if (!validarEmail(email)) {
    emailErro.innerText = "E-mail inválido.";
    valida = false;
  }

  // Validação da senha
  if (senha === "") {
    senhaErro.innerText = "Por favor, insira sua senha.";
    valida = false;
  } else if (senha.length < 6 || !/[A-Z]/.test(senha) || !/[0-9]/.test(senha)) {
    senhaErro.innerText = "A senha deve conter pelo menos 6 caracteres, 1 letra maiúscula e 1 número.";
    valida = false;
  }

  // Se as validações falharem, interrompe o envio
  if (!valida) return;

  // Dados para autenticação
  const dados = { email, senha };

  // Fazendo chamada à API de login
  fetch("/api/login/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  })
    .then(response => response.json())
    .then(data => {
      console.log("Resposta da API:", data); // Debugando a resposta
      if (data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("usuario", JSON.stringify(data.usuario));
        alert("Login realizado com sucesso!");
        window.location.href = "/pedido.html";
      } else {
        senhaErro.innerText = "E-mail ou senha incorretos."; // Mensagem clara para credenciais erradas
      }          
    })
    .catch(error => {
      console.error("Erro na API:", error);
      emailErro.innerText = "Erro de conexão com o servidor.";
    });
}

// Função para validar e-mail
function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}
