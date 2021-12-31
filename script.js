// Elementos HTML
let colorBalls;
let balls;
let rgbText;
let rgbColor;
let score;
let answer;
let resetGame;
let difficultyButton;
let difficultyLevel;
let btnApplyLevel;
let btnReturn;
let inputLevel;
let autoResetCheckbox;
let autoResetButton;

// Círculo sorteado
let chosenBall;
// Variável de controle para impedir de jogar com as mesmas cores
let newGame;
// Nível do jogo
let level = 2;
const minLevel = 1;
const maxLevel = 100;

// Obtem os elementos da página
function obterElementos() {
  rgbText = document.getElementById('rgb-text');
  rgbColor = document.getElementById('rgb-color');
  resetGame = document.getElementById('reset-game');
  score = document.getElementById('score');
  answer = document.getElementById('answer');
  colorBalls = document.getElementById('color-balls');
  balls = document.getElementsByClassName('ball');
  difficultyButton = document.getElementById('difficulty-button');
  difficultyLevel = document.getElementById('difficulty-level');
  btnApplyLevel = document.getElementById('apply-level');
  btnReturn = document.getElementById('return');
  inputLevel = document.getElementById('level');
  autoResetCheckbox = document.getElementById('auto-reset-check');
  autoResetButton = document.getElementById('auto-reset-button');
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

// Constantes com o nome da classe css que altera a cor de fundo do elemento
const BG_COLOR_WIN = 'bg-color-win';
const BG_COLOR_LOSE = 'bg-color-lose';

// Mudar a cor do placar
function mudarCorPlacar() {
  score.classList.remove('bg-score-default');
  score.classList.remove(BG_COLOR_WIN);
  score.classList.remove(BG_COLOR_LOSE);
  const placar = parseInt(score.textContent, 10);
  if (placar > 0) {
    score.classList.add(BG_COLOR_WIN);
  } else if (placar < 0) {
    score.classList.add(BG_COLOR_LOSE);
  } else {
    score.classList.add('bg-score-default');
  }
}

// Atualiza a cor de fundo dos círculos
function atualizarFundoCirculos(acertou) {
  colorBalls.classList.remove('bg-color-balls-default');
  colorBalls.classList.remove(BG_COLOR_WIN);
  colorBalls.classList.remove(BG_COLOR_LOSE);
  if (acertou === null || acertou === undefined) {
    colorBalls.classList.add('bg-color-balls-default');
  } else if (acertou) {
    colorBalls.classList.add(BG_COLOR_WIN);
  } else {
    colorBalls.classList.add(BG_COLOR_LOSE);
  }
}

// Define novas cores e escolhe uma que devera ser adivinhada
function resetar() {
  atualizarFundoCirculos(null);
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

// Atualiza o placar do jogo
function atualizarPlacar(acertou) {
  const placar = parseInt(score.textContent, 10);
  if (acertou) {
    score.textContent = placar + Math.floor(level * 1.5);
  } else {
    score.textContent = placar - Math.floor(level * 0.5);
  }
  mudarCorPlacar();
}

// Auto reseta o jogo se a opção estiver ativa
function autoResetar() {
  if (autoResetCheckbox.checked) {
    window.setTimeout(resetar, 1500);
  }
}

// Verifica se a cor escolhida é a correta
function verificarCor(event) {
  const element = event.target;
  if (newGame && element.classList.contains('ball')) {
    if (element === chosenBall) {
      answer.textContent = 'Acertou!';
      atualizarPlacar(true);
      atualizarFundoCirculos(true);
    } else {
      answer.textContent = 'Errou! Tente novamente!';
      atualizarPlacar(false);
      atualizarFundoCirculos(false);
    }
    newGame = false;
    autoResetar();
  }
}
// Faz aparecer a opção de alterar o nível do jogo
function abrirOpcaoNivel() {
  difficultyButton.style.display = 'none';
  difficultyLevel.style.display = 'block';
  inputLevel.value = level;
  inputLevel.focus();
}

// Faz desaparecer a opção de alterar o nível do jogo
function fecharOpcaoNivel() {
  difficultyButton.style.display = 'inline-block';
  difficultyLevel.style.display = 'none';
}
// Altera a dificuldade do jogo
function alterarDificuldade() {
  // Verifiva se o valor no input está correto
  const inputValue = parseInt(inputLevel.value, 10);
  if (Number.isNaN(inputValue)) {
    return;
  }
  level = inputValue;
  // Apaga os círculos atuais
  colorBalls.innerHTML = '';
  // Cria novos círculos de acordo com o nível escolhido
  for (let i = 0; i < (level * 3); i += 1) {
    const ball = document.createElement('div');
    ball.className = 'ball';
    colorBalls.appendChild(ball);
    colorBalls.append(' ');
  }
  fecharOpcaoNivel();
  balls = document.getElementsByClassName('ball');
  resetar();
}
// Verifica se a tecla apertada no input é permitida
function verificarTeclaInput(event) {
  if (event.key === 'Enter') {
    alterarDificuldade();
  } else if (event.key < '0' || event.key > '9') {
    event.preventDefault();
  }
}
// Verifica se o valor no input é permitido
function verificarValorInput() {
  const inputValue = parseInt(inputLevel.value, 10);
  if (inputValue < minLevel) {
    inputLevel.value = minLevel;
  } else if (inputValue > maxLevel) {
    inputLevel.value = maxLevel;
  } else {
    inputLevel.value = Number.isNaN(inputValue) ? '' : inputValue;
  }
}
// Fixa a cor rgb ao rolar a página
function fixarCorRGB() {
  if (window.scrollY > 55) {
    rgbText.classList.add('rgb-text-fixed');
  } else {
    rgbText.classList.remove('rgb-text-fixed');
  }
}
// Desabilita botão resetar se a opção de auto resetar for ativa
function desabilitaBotaoResetar() {
  if (!autoResetCheckbox.checked) {
    resetar();
    resetGame.style.textDecorationLine = 'line-through';
    resetGame.style.cursor = 'not-allowed';
    resetGame.removeEventListener('click', resetar);
  } else {
    resetGame.style.textDecorationLine = '';
    resetGame.style.cursor = '';
    resetGame.addEventListener('click', resetar);
  }
}
// Adiciona ouvintes aos elementos
function adicionarOuvinte() {
  colorBalls.addEventListener('click', verificarCor);
  resetGame.addEventListener('click', resetar);
  difficultyButton.addEventListener('click', abrirOpcaoNivel);
  btnReturn.addEventListener('click', fecharOpcaoNivel);
  btnApplyLevel.addEventListener('click', alterarDificuldade);
  inputLevel.addEventListener('keypress', verificarTeclaInput);
  inputLevel.addEventListener('input', verificarValorInput);
  window.addEventListener('scroll', fixarCorRGB);
  autoResetButton.addEventListener('click', desabilitaBotaoResetar);
}
// Iniciando a aplicação chamando as funções necessárias
obterElementos();
adicionarOuvinte();
resetar();
