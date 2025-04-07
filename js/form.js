class Contato {
    constructor(nome, sobrenome, email, telefone, tipoContato, mensagem, data) {
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.email = email;
        this.telefone = telefone;
        this.tipoContato = tipoContato;
        this.mensagem = mensagem;
        this.data = data;
    }
}

let mensage_Base = []; // Guarda as mensagens enviadas, para posterior análise
let erro_Mensage = document.getElementById("error_Forms"); // Mensagem de erro

document.querySelector(".form").addEventListener("submit", function(event) {
    event.preventDefault()

    let nome = document.getElementById("nome").value.trim();
    let sobrenome = document.getElementById("sobrenome").value.trim();
    let email = document.getElementById("email").value.trim();
    let telefone = document.getElementById("telefone").value;
    let tipoContato = document.getElementById("tipo_contato").value;
    let mensagem = document.getElementById("mensagem").value.trim();
    let data = new Date().toLocaleString();


   // Validação do Primeiro nome
   if (!checkNome(nome)) {
        erro_Mensage.innerHTML ="Verifique o primeiro nome.";
        document.getElementById("nome").style.borderColor = "rgb(255, 55, 55)";
        return
   } else{clearErro(nome)}

    // Validação do último nome
   if (!checkNome(sobrenome)) {
        erro_Mensage.innerHTML ="Verifique o último nome.";
        document.getElementById("sobrenome").style.borderColor = "rgb(255, 55, 55)";
        return
    } else{document.getElementById("sobrenome").style.borderColor = "black";}
   
    // Validação do email
    if (!checkEmail(email)) {
        erro_Mensage.innerHTML ="Digite um email válido.";
        document.getElementById("email").style.borderColor = "rgb(255, 55, 55)";
        return
    } else{document.getElementById("email").style.borderColor = "black";}

    // Validação do telefone
    if (!checkPhone(telefone)) {
        erro_Mensage.innerHTML ="Digite um telefone válido. Apenas números";
        document.getElementById("telefone").style.borderColor = "rgb(255, 55, 55)";
        return
    } else{document.getElementById("telefone").style.borderColor = "black";}

    // Validação do tipo de contato
    if (tipoContato === "") {
        erro_Mensage.innerHTML ="Selecione o tipo de contato";
        document.getElementById("tipo_contato").style.borderColor = "rgb(255, 55, 55)";
        return
    } else{document.getElementById("tipo_contato").style.borderColor = "black";}

    // Validação da mensagem
   if (checkMensage(mensagem)) {
        erro_Mensage.innerHTML ="A mensagem deve conter pelo menos 10 caracteres.";
        document.getElementById("mensagem").style.borderColor = "rgb(255, 55, 55)";
        return
    } else{document.getElementById("mensagem").style.borderColor = "black";}

    if (!checkLGPD()) {
        erro_Mensage.innerHTML ="Aceitação obrigatória dos Termos e Condições para continuar";
        document.getElementById("input_LGPD1").style.borderColor = "rgb(255, 55, 55)";
        return
    } else{document.getElementById("input_LGPD1").style.borderColor = "black";}


    clearErro()

    let contato = new Contato(nome, sobrenome, email, telefone, tipoContato, mensagem, data);
    
    mensage_Base.push(contato);
    console.log(mensage_Base);
    document.getElementById("form").style.display = "none";
    document.getElementById("confirmacao").style.display = "flex";
    confirmacao(nome, tipoContato);
});


function clearErro(){
    erro_Mensage.innerHTML ="";
    document.querySelector("input").style.borderColor = "black";
}
// Verifica o nome e sobrenome
function checkNome(value){ 
    const nomeRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ]{3,}$/;
    return nomeRegex.test(value);
}
function checkMensage(value){
    return value.length < 10;
}

// Verifica e-mail
function checkEmail(value) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(value);
}

// Verifica telefone
function checkPhone(value) {
    const phoneRegex = /^\(\d{2}\) 9 \d{4}-\d{4}$/;
    return phoneRegex.test(value);
}

// Máscara de telefone
function mascaraTelefone(input) {
    let valor = input.value.replace(/\D/g, ""); // Remove tudo que não for número
    
    // Aplica a máscara: (XX) 9 XXXX-XXXX
    if (valor.length > 2) {
        valor = valor.replace(/^(\d{2})(\d)/, "($1) $2");
    }
    // Adiciona espaço após o 9 (nonono dígito)
    if (valor.length > 7) {
        valor = valor.replace(/(\(\d{2}\) \d)(\d)/, "$1 $2");
    }
    // Adiciona o traço antes dos últimos 4 números
    if (valor.length > 11) {
        valor = valor.replace(/(\(\d{2}\) \d \d{4})(\d)/, "$1-$2");
    }
    
    // Limita o tamanho máximo (XX) 9 XXXX-XXXX = 15 caracteres
    if (valor.length > 16) {
        valor = valor.substring(0, 15);
    }

    input.value = valor;
}

function confirmacao(nome, tipo_contato){
    document.getElementById("strong_Name").innerHTML = `${nome}`;
    if(tipo_contato === "Elogio"){
        document.getElementById("text_Tipo").innerHTML = "o seu elogio";
    } else{
        document.getElementById("text_Tipo").innerHTML = `a sua ${tipo_contato.toLowerCase()}`;
    }
}

function closeConfirmation() {
    event.preventDefault()
    // Oculta a mensagem de confirmação
    document.getElementById("confirmacao").style.display = "none";
    
    // Exibe novamente o formulário de contato
    document.getElementById("form").style.display = "flex";
    
    // Limpa os campos do formulário para o usuário preencher novamente
    document.querySelector(".form").reset(); // Limpa os campos de input
    erro_Mensage.innerHTML = ""; // Limpa a mensagem de erro, caso tenha
    document.querySelector("input").style.borderColor = "black"; // Reseta as bordas dos inputs
}

function checkLGPD() {
    let checkbox = document.getElementById("input_LGPD1");
    if(!checkbox.checked) {
        return false
    }
    return true
}