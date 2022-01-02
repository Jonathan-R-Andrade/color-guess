// Elementos HTML
let rgbTextContainer;
let rgbText;
let plaque;

// Posição da parte de baixo da placa
let plaqueBottomPosition;

// Obtem os elementos da página
function obterElementos() {
  rgbTextContainer = document.getElementById('rgb-text-container');
  rgbText = document.getElementById('rgb-text');
  plaque = document.getElementById('plaque');
}

// Pega a posição da parte de baixo da placa
function pegarPlaqueBottomPosition() {
  // Não usei o DOMRect.bottom devido o rotateX() do CSS que altera a altura do elemento
  // e faz o DOMRect.bottom ficar variando.
  plaqueBottomPosition = plaque.getBoundingClientRect().top + plaque.offsetHeight;
  // acrescento mais 5px porque é a distancia que eu quero do texto rgb
  plaqueBottomPosition += 5;
}

// Fixa a cor rgb ao rolar a página
function fixarRGBText() {
  const rgbTextContainerTopPosition = rgbTextContainer.getBoundingClientRect().top;
  if (rgbTextContainerTopPosition < 0 || rgbTextContainerTopPosition < plaqueBottomPosition) {
    rgbTextContainer.style.height = String(rgbText.offsetHeight).concat('px');
    rgbText.classList.add('rgb-text-fixed');
  } else {
    rgbTextContainer.style.height = '';
    rgbText.classList.remove('rgb-text-fixed');
  }
}

// Ajusta os elementos de acordo com a largura da página
function ajustarElementos() {
  pegarPlaqueBottomPosition();
  fixarRGBText();
  rgbText.style.top = String(plaqueBottomPosition).concat('px');
  document.body.style.paddingTop = String(plaqueBottomPosition + 10).concat('px');
}

// Adiciona ouvintes aos elementos
function adicionarOuvinte() {
  window.addEventListener('scroll', fixarRGBText);
  window.addEventListener('resize', ajustarElementos);
}

// Iniciando a aplicação chamando as funções necessárias
obterElementos();
ajustarElementos();
adicionarOuvinte();
