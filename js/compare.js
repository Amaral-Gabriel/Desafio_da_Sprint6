
// Tabela de carros
const cars = [
    {
        nome: "RANGER XL",
        preco: "227.990,00",
        alturaVeiculo: "1821",
        alturaSolo: "232",
        capacidadeCarga: "1.234",
        motor: "2.2 Duratorq",
        potencia: "160 cv @3.200 rpm",
        volumeCacamba: "1.180",
        roda: "16” aço",
        image: "assets/imagens/XL Cabine.jpg"
    },
    {
        nome: "RANGER XLS",
        preco: "262.590,00",
        alturaVeiculo: "1821",
        alturaSolo: "232",
        capacidadeCarga: "1.076",
        motor: "2.2 Duratorq",
        potencia: "160 cv @ 3200 rpm",
        volumeCacamba: "1.180",
        roda: "17” liga leve",
        image: "assets/imagens/xls 2.2 diesel.jpg"
    },
    {
        nome: "RANGER STORM",
        preco: "272.690,00",
        alturaVeiculo: "1821",
        alturaSolo: "232",
        capacidadeCarga: "1.040",
        motor: "2.2 Duratorq",
        potencia: "200 cv @3.000 rpm",
        volumeCacamba: "1.180",
        roda: "17” liga leve",
        image: "assets/imagens/storm.jpg"
    }
];

class Car { // Classe para instanciar carros
    constructor(index, nome, preco, alturaVeiculo, alturaSolo, capacidadeCarga, motor, potencia, volumeCacamba, roda, image) {
        this.index = index;
        this.nome = nome;
        this.preco = preco;
        this.alturaVeiculo = alturaVeiculo;
        this.alturaSolo = alturaSolo;
        this.capacidadeCarga = capacidadeCarga;
        this.motor = motor;
        this.potencia = potencia;
        this.volumeCacamba = volumeCacamba;
        this.roda = roda;
        this.image = image;
    }
}


const carInstances = cars.map((car, index) => { // Cria uma lista com cada elemento de carro e instância na classe
    return new Car(
        index,
        car.nome,
        car.preco,
        car.alturaVeiculo,
        car.alturaSolo,
        car.capacidadeCarga,
        car.motor,
        car.potencia,
        car.volumeCacamba,
        car.roda,
        car.image
    );
});

// Função para criar as células da tabela
function createCarTableCells() {
    const tabela = document.querySelector('.tabela tr');
    tabela.classList.add('table_Cars');
    tabela.innerHTML = '';
    
    carInstances.forEach((car) => {
        const td = document.createElement('td');
        td.innerHTML = `
            <img src="${car.image}" alt="${car.nome}">
            <div class="info_Carro">
                <div class="titulo_Carro">
                    <a href="#"><p>${car.nome}</p></a>
                </div>
                <div class="titulo_Preco">
                    <input type="checkbox" name="compare" class="input_Box" 
                           data-car-index="${car.index}">
                    <p class="preco">A partir de R$ ${car.preco} <a href=""><img id="simbolo_Info" src="assets/imagens/info.png" alt="Simbolo de informação"></a></p>
                </div>
            </div>
        `;
        tabela.appendChild(td);
    });
}

let carsToCompare = []; // Array para armazenar os carros selecionados

// Função principal de comparação
function handleCompareSelection() {

    document.querySelectorAll('.input_Box').forEach(checkbox => {

        checkbox.addEventListener('change', function() { // Adiciona um listener pra cada checkbox

            const carIndex = Number(this.dataset.carIndex); // Pega o índice do carro selecionado
            const selectedCar = carInstances[carIndex];

            div_Erro = document.getElementById("erro_Div");

            if (this.checked) {
                if (carsToCompare.length >= 2) { // Trata erro
                    this.checked = false;

                    
                    div_Erro.style.display = "flex";
                    document.getElementById("erro_Span").innerHTML="Máximo de 2 veículos para comparação."
                    return;
                }
                // Adiciona se o carro não estiver na lista
                if (!carsToCompare.some(car => car.index === carIndex)) {
                    carsToCompare.push(selectedCar);
                }
            } else {
                // Remove usando findIndex para garantir que remove o certo
                const indexToRemove = carsToCompare.findIndex(car => car.index === carIndex);
                carsToCompare.splice(indexToRemove, 1); // Remove o index do selcionado
            }
            div_Erro.style.display = "none";
            console.log("Carros selecionados:", carsToCompare); // Para debug
        });
    });
}

// Função para exibir comparação
function showCompare() {
    div_Erro = document.getElementById("erro_Div");
    if (carsToCompare.length !== 2) {
        // Mensagem de erro
        document.getElementById("erro_Span").innerHTML="Selecione 2 veículos para comparação."
        div_Erro.style.display = "flex";

        return;
    }
    div_Erro.style.display = "none";
    UpdateCompareTable(); // Chama função para atualizar tabela
    document.getElementById("div_Comparacao").style.display = "flex"; // Exibe tabela após a atualização
}

// Atualiza tabela
function UpdateCompareTable() {
    //Pega os 2 carros selecionados
    let item1 = carsToCompare[0];
    let item2 = carsToCompare[1];

    // Muda todos os dados dos carros na tabela

    document.getElementById("compare_image_0").innerHTML = `<img class="image_Table" src="${item1.image}">`;
    document.getElementById("compare_image_1").innerHTML = `<img class="image_Table" src="${item2.image}">`;
    
    document.getElementById("compare_modelo_0").innerHTML = `${item1.nome}`;
    document.getElementById("compare_modelo_1").innerHTML = `${item2.nome}`;
    
    document.getElementById("compare_alturaveiculo_0").innerHTML = `${item1.alturaVeiculo}`;
    document.getElementById("compare_alturaveiculo_1").innerHTML = `${item2.alturaVeiculo}`;

    document.getElementById("compare_alturasolo_0").innerHTML = `${item1.alturaSolo}`;
    document.getElementById("compare_alturasolo_1").innerHTML = `${item2.alturaSolo}`;

    document.getElementById("compare_capacidadecarga_0").innerHTML = `${item1.capacidadeCarga}`;
    document.getElementById("compare_capacidadecarga_1").innerHTML = `${item2.capacidadeCarga}`;

    document.getElementById("compare_motor_0").innerHTML = `${item1.motor}`;
    document.getElementById("compare_motor_1").innerHTML = `${item2.motor}`;

    document.getElementById("compare_potencia_0").innerHTML = `${item1.potencia}`;
    document.getElementById("compare_potencia_1").innerHTML = `${item2.potencia}`;

    document.getElementById("compare_volumecacamba_0").innerHTML = `${item1.volumeCacamba}`;
    document.getElementById("compare_volumecacamba_1").innerHTML = `${item2.volumeCacamba}`;

    document.getElementById("compare_roda_0").innerHTML = `${item1.roda}`;
    document.getElementById("compare_roda_1").innerHTML = `${item2.roda}`;

    document.getElementById("compare_preco_0").innerHTML = `${item1.preco}`;
    document.getElementById("compare_preco_1").innerHTML = `${item2.preco}`;
}

// Esconde a tabela
function HideCompare() {
    document.getElementById("div_Comparacao").style.display = "none";
    document.getElementById("section_Btn").style.display = "flex";
}

// Iniciliza documento
document.addEventListener("DOMContentLoaded", () => {
    createCarTableCells();
    handleCompareSelection();

    document.querySelector('.botao_Comparar').addEventListener('click', () => {
        
        showCompare();
        event.preventDefault()
    });

    document.addEventListener("click", function (event) { // Verfica se o usuário clica fora da tabela
        const tabela = document.getElementById("div_Comparacao");
        if (tabela && tabela.style.display === "flex" && !tabela.contains(event.target) && !event.target.closest('.botao_Comparar')) {
            HideCompare();
        }
    });
});
