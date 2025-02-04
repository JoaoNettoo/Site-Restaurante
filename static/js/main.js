$(document).ready(function () {
  // Smooth scroll para os links com hash
  $("a").on("click", function (event) {
    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;
      $("html, body").animate(
        {
          scrollTop: $(hash).offset().top,
        },
        800,
        function () {
          window.location.hash = hash;
        }
      );
    }
  });
});

// Controle de autenticação
let isAuthenticated = false;

// Verifica se o usuário está logado no carregamento da página
window.onload = function () {
  verificaAutenticacao();
  // Verifica se existe uma mensagem de sucesso (indicando que o login foi realizado)
  if (document.getElementById("food-menu") && document.querySelector(".alert-success")) {
      // Exibe a seção do cardápio
      document.getElementById("food-menu").style.display = "block";
      // Faz o scroll até a seção do cardápio
      window.scrollTo(0, document.getElementById("food-menu").offsetTop);
  }
};

// Função para validar os formulários e fazer login
function validaForms(event) {
  event.preventDefault();  // Impede o envio padrão do formulário

  // Limpa mensagens de erro
  document.getElementById("emailErro").innerText = "";
  document.getElementById("senhaErro").innerText = "";

  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;
  let valida = true;

  // Validação do e-mail
  if (email === "") {
    document.getElementById("emailErro").innerText = "Por favor, insira seu e-mail.";
    valida = false;
  } else if (!validarEmail(email)) {
    valida = false;
  }

  // Validação da senha
  if (senha === "") {
    document.getElementById("senhaErro").innerText = "Por favor, insira sua senha.";
    valida = false;
  } else if (senha.length < 6 || !/[A-Z]/.test(senha) || !/[0-9]/.test(senha)) {
    document.getElementById("senhaErro").innerText = "A senha deve atender aos critérios.";
    valida = false;
  }

  // Se as validações passarem, envia a requisição de login
  if (valida) {
    const dados = { email: email, senha: senha };

    // Fazendo chamada à API de login
    fetch("/api/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados),
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        localStorage.setItem("token", data.token);  // Armazenando o token no localStorage
        alert("Login realizado com sucesso!");
        window.location.href = "/pedido.html";  // Redireciona para a página de pedido
      } else {
        document.getElementById("emailErro").innerText = data.message || "Erro ao fazer login.";
      }
    })
    .catch((error) => {
      console.error("Erro na API:", error);
    });
  }
}

// Valida o formato do e-mail
function validarEmail(email) {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!regex.test(email)) {
    document.getElementById("emailErro").innerText = "E-mail inválido.";
    return false;
  }
  return true;
}

// Verifica autenticação no localStorage
function verificaAutenticacao() {
  const usuario = localStorage.getItem("usuario");
  isAuthenticated = !!usuario;  // Verifica se o usuário está autenticado
}

// Botão do cardápio
document.querySelector(".btn-primary").addEventListener("click", function (e) {
  if (isAuthenticated) {
    window.location.href = "/pedido.html";  // Redireciona para a página de pedido se autenticado
  } else {
    alert("Faça login para acessar o cardápio.");
    window.location.href = "#login-section";  // Redireciona para a seção de login
  }
});

// Vincula a função de validação ao evento de envio do formulário
document.getElementById("loginForm").addEventListener("submit", validaForms);
