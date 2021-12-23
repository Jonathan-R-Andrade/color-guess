// Elementos HTML
let colorBalls;
let balls;
let rgbColor;
let score;
let answer;
let resetGame;

// Círculo sorteado
let chosenBall;
// Variável de controle para impedir de jogar com as mesmas cores
let newGame;

// Obtem os elementos da página
function obterElementos() {
  rgbColor = document.getElementById('rgb-color');
  resetGame = document.getElementById('reset-game');
  score = document.getElementById('score');
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

// Define a cor dos círculos
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

// Sorteia um círculo
function sortearCirculo() {
  chosenBall = balls[Math.floor(Math.random() * balls.length)];
}

// Define novas cores e escolhe uma que devera ser adivinhada
function resetar() {
  definirCor();
  sortearCirculo();
  // Pega a cor do círculo e coloca na tela o valor rgb dela para ser adivinhada
  let corRGB = chosenBall.style.backgroundColor;
  corRGB = corRGB.slice(3, corRGB.length);
  rgbColor.textContent = corRGB;
  // Reseta o texto de resposta
  answer.textContent = 'Escolha uma cor';
  newGame = true;
}

// Mudar a cor do placar
function mudarCorPlacar() {
  const placar = parseInt(score.textContent, 10);
  if (placar > 0) {
    score.style.backgroundColor = 'green';
  } else if (placar < 0) {
    score.style.backgroundColor = 'rgb(255, 50, 50)';
  } else {
    score.style.backgroundColor = 'rgb(70, 70, 70)';
  }
}

// Atualiza o placar do jogo
function atualizarPlacar(acertou) {
  const placar = parseInt(score.textContent, 10);
  if (acertou) {
    score.textContent = placar + 3;
  } else {
    score.textContent = placar - 1;
  }
  mudarCorPlacar();
}

// Verifica se a cor escolhida é a correta
function verificarCor(event) {
  const element = event.target;
  if (newGame && element.classList.contains('ball')) {
    if (element === chosenBall) {
      answer.textContent = 'Acertou!';
      atualizarPlacar(true);
    } else {
      answer.textContent = 'Errou! Tente novamente!';
      atualizarPlacar(false);
    }
    newGame = false;
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
