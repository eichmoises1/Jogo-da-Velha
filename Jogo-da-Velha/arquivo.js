var currentPlayer = 'X';
var gameBoard = ['', '', '', '', '', '', '', '', ''];
var winningCombos = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // linhas
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // colunas
  [0, 4, 8], [2, 4, 6] // diagonais
];
var winningCells = []; // Variável para armazenar as células da combinação vencedora

// Função chamada quando uma célula é clicada
function play(index) {
  if (gameBoard[index] === '') {
    gameBoard[index] = currentPlayer;

    // Atualiza a célula no tabuleiro visual
    var cells = document.getElementsByClassName('cell');
    cells[index].textContent = currentPlayer;
    cells[index].classList.add('scale-animation');
    
    // Remove a classe CSS atual para o símbolo
    cells[index].classList.remove(currentPlayer === 'X' ? 'o-symbol' : 'x-symbol');
    
    // Adiciona a classe CSS correspondente ao símbolo
    cells[index].classList.add(currentPlayer === 'X' ? 'x-symbol' : 'o-symbol');

    if (checkWin(currentPlayer)) {
      // Armazena a combinação vencedora
      for (var i = 0; i < winningCombos.length; i++) {
        var combo = winningCombos[i];
        if (
          gameBoard[combo[0]] === currentPlayer &&
          gameBoard[combo[1]] === currentPlayer &&
          gameBoard[combo[2]] === currentPlayer
        ) {
          winningCells = combo;
          break;
        }
      }

      setTimeout(function() {
        alert('O jogador ' + currentPlayer + ' venceu!');
        reset();
      }, 500);
    } else if (gameBoard.indexOf('') === -1) {
      setTimeout(function() {
        alert('Empate!');
        reset();
      }, 500);
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
  }
}

// Verifica se um jogador venceu
function checkWin(player) {
  for (var i = 0; i < winningCombos.length; i++) {
    var combo = winningCombos[i];
    if (
      gameBoard[combo[0]] === player &&
      gameBoard[combo[1]] === player &&
      gameBoard[combo[2]] === player
    ) {
      return true;
    }
  }
  return false;
}

// Reseta o jogo para uma nova partida
function reset() {
  currentPlayer = 'X';
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  var cells = document.getElementsByClassName('cell');
  for (var i = 0; i < cells.length; i++) {
    cells[i].textContent = '';
    cells[i].classList.remove('scale-animation');
    cells[i].classList.remove('winning-cell'); // Remove a classe CSS especial das células
    cells[i].classList.remove('x-symbol'); // Remove a classe CSS para o símbolo "X"
    cells[i].classList.remove('o-symbol'); // Remove a classe CSS para o símbolo "O"
  }
  winningCells = []; // Limpa a variável da combinação vencedora
}

// Adiciona o ouvinte de evento de clique às células
var cells = document.getElementsByClassName('cell');
for (var i = 0; i < cells.length; i++) {
  cells[i].addEventListener('click', function() {
    var index = Array.prototype.indexOf.call(cells, this);
    play(index);
  });
}
