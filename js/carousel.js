class Carousel {
    constructor(images, interval = 2000) {
        this.images = images;
        this.intervalTime = interval;
        this.index = 0;
        this.timer = null;
        this.radios = [];

        // Elementos do DOM
        this.imageElement = document.getElementById("carouselImage");
        this.titleElement = document.getElementById("carouselTitle");
        this.linkElement = document.getElementById("carouselLink");
        this.prevButton = document.getElementById("prevButton");
        this.nextButton = document.getElementById("nextButton");
        this.radioButtonsContainer = document.getElementById("radioButtonsContainer");

        this.createRadioButtons();
        this.setupEventListeners();
        this.updateCarousel();
        this.startAutoSlide();
    }

    createRadioButtons() {
        this.radioButtonsContainer.innerHTML = '';
        
        this.images.forEach((_, index) => {
            const radioId = `slide-${index}`;
            
            const radioWrapper = document.createElement('div');
            radioWrapper.className = 'radio-wrapper';
            
            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = 'carousel';
            radio.id = radioId;
            radio.className = 'carousel-radio';
            radio.dataset.index = index;
            
            const label = document.createElement('label');
            label.htmlFor = radioId;
            
            radioWrapper.appendChild(radio);
            radioWrapper.appendChild(label);
            this.radioButtonsContainer.appendChild(radioWrapper);
            
            // Armazena referência
            this.radios.push(radio);
            
            // Adiciona evento
            radio.addEventListener('change', () => {
                if (radio.checked) {
                    this.goToSlide(index);
                }
            });
        });
    }

    goToSlide(index) {
        this.index = index;
        this.updateCarousel();
        this.resetTimer();
    }

    setupRadioEvents() {
        this.radios.forEach((radio, index) => {
            radio.addEventListener('change', () => {
                if (radio.checked) {
                    this.index = index;
                    this.updateCarousel();
                    this.resetTimer();
                }
            });
        });
    }

    setupEventListeners() {
        this.prevButton.addEventListener("click", () => this.back());
        this.nextButton.addEventListener("click", () => this.next());
    }

    updateCarousel() {
        const currentItem = this.images[this.index];

        this.imageElement.src = currentItem.image;
        this.imageElement.alt = currentItem.title;
        this.titleElement.textContent = currentItem.title;
        this.linkElement.href = currentItem.url;
        this.linkElement.target = "_self";
        
        // Atualizar apenas se houver radios
        if (this.radios.length > 0) {
            this.radios.forEach(radio => radio.checked = false);
            this.radios[this.index].checked = true;
        }
    }

    // Restante dos métodos permanece igual
    next() {
        this.index = (this.index + 1) % this.images.length;
        this.updateCarousel();
        this.resetTimer();
    }

    back() {
        this.index = (this.index - 1 + this.images.length) % this.images.length;
        this.updateCarousel();
        this.resetTimer();
    }
            
    startAutoSlide() {
        this.timer = setInterval(() => this.next(), this.intervalTime);
    }

    resetTimer() {
        clearInterval(this.timer);
        this.startAutoSlide();
    }
}

const images = [
    {
        image: "assets/imagens/imagem_1.jpg",
        title: "Esta é a nova Ranger Ford 2022",
        url: "lancamento.html"
    },
    {
        image: "assets/imagens/imagem_2.jpg",
        title: "Nossa história",
        url: "https://corporate.ford.com/about/history.html"
    },
    {
        image: "assets/imagens/imagem_3.jpg",
        title: "Nova Ford Bronco Sport 2022",
        url: "#"
    }
];

// Inicialização permanece igual
document.addEventListener("DOMContentLoaded", () => {
    new Carousel(images);
});