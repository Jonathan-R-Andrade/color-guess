// Elementos HTML
let colorBalls;
let balls;
let rgbColor;
let answer;
let resetGame;

// Circulo sorteado
let chosenBall;

// Obtem os elementos da página
function obterElementos() {
  rgbColor = document.getElementById('rgb-color');
  resetGame = document.getElementById('reset-game');
  answer = document.getElementById('answer');
  colorBalls = document.getElementById('color-balls');
  balls = document.getElementsByClassName('ball');
}

// Gerar cor aleatória
function gerarCor() {
  const rgb = [];
  rgb.push(Math.round(Math.random() * 255));
  rgb.push(Math.round(Math.random() * 255));
  rgb.push(Math.round(Math.random() * 255));
  // Define uma string com a cor rgb
  let cor = 'rgb('.concat(rgb[0]).concat(', ');
  cor = cor.concat(rgb[1]).concat(', ');
  cor = cor.concat(rgb[2]).concat(')');
  return cor;
}

// Define a cor dos circulos
function definirCor() {
  // Guarda as cores para verificar se não repetem
  const cores = [];
  for (let i = 0; i < balls.length; i += 1) {
    let cor;
    // Enquanto a cor repetir gerar uma nova
    do {
      cor = gerarCor();
    } while (cores.indexOf(cor) > -1);
    // Adiciona a nova cor no array e no elemento
    cores.push(cor);
    balls[i].style.backgroundColor = cor;
  }
}

// Sorteia um circulo
function sortearCirculo() {
  chosenBall = balls[Math.floor(Math.random() * balls.length)];
}

// Define novas cores e escolhe uma que devera ser adivinhada
function resetar() {
  definirCor();
  sortearCirculo();
  // Pega a cor do circulo e coloca na tela o valor rgb dela para ser adivinhada
  let corRGB = chosenBall.style.backgroundColor;
  corRGB = corRGB.slice(3, corRGB.length);
  rgbColor.textContent = corRGB;
  // Reseta o texto de resposta
  answer.textContent = 'Escolha uma cor';
}

// Verifica se a cor escolhida é a correta
function verificarCor(event) {
  const element = event.target;
  if (element.classList.contains('ball')) {
    if (element === chosenBall) {
      answer.textContent = 'Acertou!';
    } else {
      answer.textContent = 'Errou! Tente novamente!';
    }
  }
}

// Adiciona ouvintes aos elementos
function adicionarOuvinte() {
  colorBalls.addEventListener('click', verificarCor);
  resetGame.addEventListener('click', resetar);
}

// Iniciando a aplicação chamando as funções necessárias
obterElementos();
adicionarOuvinte();
resetar();
