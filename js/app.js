// Função para abrir o menu
function open_Burguer() {
    document.getElementById("itens").classList.add("aberto");
}

// Função para fechar o menu
function close_Burguer() {
    document.getElementById("itens").classList.remove("aberto");
}

// Fecha o menu quando o usuário clicar fora do menu
document.addEventListener("click", function(event) {
    const menu = document.getElementById("itens");
    const menuBurguer = document.getElementById("menu_Burguer");
    
    // Verifica se o clique foi fora do menu e do botão de menu
    if (!menu.contains(event.target) && !menuBurguer.contains(event.target)) {
        menu.classList.remove("aberto"); // Fecha o menu removendo a classe 'aberto'
    }
});
