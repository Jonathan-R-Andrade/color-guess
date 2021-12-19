// Elementos HTML
let balls;

// Obtem os elementos da página
function obterElementos() {
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

// Iniciando a aplicação chamando as funções necessárias
obterElementos();
definirCor();
