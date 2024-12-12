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
let isAuthenticated = false;

// Verifica se o usuário está logado (simulação)
let usuarioLogado = false;

ion validaForms() {
  // Limpa mensagens de erro
  document.getElementById('emailErro').innerText = '';
  document.getElementById('senhaErro').innerText = '';

  // Obtém os valores dos campos
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;
  let valida = true;

  // Valida o campo de e-mail
  if (email === '') {
      document.getElementById('emailErro').innerText = 'Por favor, insira seu e-mail.';
      valida = false;
  } else if (!validarEmail(email)) {
      valida = false;
  }

  // Valida o campo de senha
  if (senha === '') {
      document.getElementById('senhaErro').innerText = 'Por favor, insira sua senha.';
      valida = false;
  } else if (senha.length < 6) {
      document.getElementById('senhaErro').innerText = 'A senha deve ter no mínimo 6 caracteres.';
      valida = false;
  } else if (!/[A-Z]/.test(senha) || !/[0-9]/.test(senha)) {
      document.getElementById('senhaErro').innerText = 'A senha deve conter pelo menos uma letra maiúscula e um número.';
      valida = false;
  }

  // Se tudo for válido, salva os dados e redireciona
  if (valida) {
      const dados = {
          nome: email.split('@')[0],
          email: email,
          senha: senha
      };

      salvaLogin(dados);
      isAuthenticated = true;
      alert("Sucesso, você está logado. ");
      window.location.href = "#food"; 
  }
  return valida;
}

// Função para validar o formato do e-mail
function validarEmail(email) {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!regex.test(email)) {
      document.getElementById('emailErro').innerText = "E-mail inválido. Exemplo: nome@email.com";
      return false;
  }
  return true;
}

// Função para exibir/ocultar a senha
function RevelaSenha() {
  const senhaInput = document.getElementById("senha");
  const tipo = senhaInput.getAttribute("type") === "password" ? "text" : "password";
  senhaInput.setAttribute("type", tipo);
}

// Função para salvar os dados de login no localStorage
function salvaLogin(dados) {
  localStorage.setItem("usuario", JSON.stringify(dados));
}


function funcaoProtegida() {
  if (!isAuthenticated) {
      alert("Acesso negado. Faça login primeiro.");
      return;
  }
  console.log("Função protegida executada!");
}

function verificaAutenticacao() {
  const usuario = localStorage.getItem("usuario");
  if (usuario) {
      isAuthenticated = true;
  } else {
      isAuthenticated = false;
  }
}

window.onload = verificaAutenticacao;