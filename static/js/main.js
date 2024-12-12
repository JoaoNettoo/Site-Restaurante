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
};

// Função para validar os formulários e fazer login
function validaForms() {
  document.getElementById("emailErro").innerText = "";
  document.getElementById("senhaErro").innerText = "";

  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;
  let valida = true;

  // Validação
  if (email === "") {
    document.getElementById("emailErro").innerText = "Por favor, insira seu e-mail.";
    valida = false;
  } else if (!validarEmail(email)) {
    valida = false;
  }

  if (senha === "") {
    document.getElementById("senhaErro").innerText = "Por favor, insira sua senha.";
    valida = false;
  } else if (senha.length < 6 || !/[A-Z]/.test(senha) || !/[0-9]/.test(senha)) {
    document.getElementById("senhaErro").innerText = "A senha deve atender aos critérios.";
    valida = false;
  }

  if (valida) {
    const dados = { email: email, senha: senha };

    // Fazendo chamada à API
    fetch("/api/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          salvaLogin(data.usuario);
          isAuthenticated = true;
          alert("Login realizado com sucesso!");
          window.location.href = "/pedido.html";
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

// Salva login no localStorage
function salvaLogin(dados) {
  localStorage.setItem("usuario", JSON.stringify(dados));
}

// Verifica autenticação
function verificaAutenticacao() {
  const usuario = localStorage.getItem("usuario");
  isAuthenticated = !!usuario;
}

// Botão do cardápio
document.querySelector(".btn-primary").addEventListener("click", function (e) {
  if (isAuthenticated) {
    window.location.href = "/pedido.html";
  } else {
    alert("Faça login para acessar o cardápio.");
    window.location.href = "#login-section";
  }
});
