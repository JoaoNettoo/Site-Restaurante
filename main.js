$(document).ready(function () {
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



  function validaForms() {
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
        //document.getElementById('emailErro').innerText = 'E-mail inválido.';
        valida = false;
    }

    // Valida o campo de senha
    if (senha === '') {
        document.getElementById('senhaErro').innerText = 'Por favor, insira sua senha.';
        valida = false;
    }else if(senha.length < 6){
        document.getElementById('senhaErro').innerText = 'Por favor, insira uma senha com no mínimo 6 caracteres';
        valida = false;
    } else if (!/[A-Z]/.test(senha) || !/[0-9]/.test(senha)) {
        document.getElementById('senhaErro').innerText = 'A senha deve conter pelo menos uma letra maiúscula e um número';
        valida = false;
    }

    if(valida){
        alert("sucesso, você está logado");
        window.location.href = "#top";
    }
    return valida;
}

// Função para validar o formato do e-mail
function validarEmail(email) {
    try{
        if(!email.match(/[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)){
            throw"E-mail inválido."
        }
        return true;
    }catch(erro){
        document.getElementById('emailErro').innerText = erro;
        return false;
    }
}

// Função para exibir/ocultar a senha
function RevelaSenha() {
    const senhaInput = document.getElementById("senha");
    const tipo = senhaInput.getAttribute("type") === "password" ? "text" : "password";
    senhaInput.setAttribute("type", tipo);
}