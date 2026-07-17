const GameBoard = (function () {
  const board = ['', '', '', '', '', '', '', '', ''];
  return {
    getBoard: function () {
      return board;
    },
    placeMarker: function (index, marker) {
      if (board[index] === '') board[index] = marker;
    },
    resetBoard: function () {
      board.fill('');
    },
  };
})();

function createPlayer(name, marker) {
  return { name, marker };
}

const GameController = (function () {
  const player1 = createPlayer('player1', 'x');
  const player2 = createPlayer('player2', 'o');
  let currentPlayer = player1;
  let isBoardFull = false;
  const winningTriplets = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  const isWinningTripletPresent = (currentBoard, triplet) => {
    return (
      currentBoard[triplet[0]] !== '' &&
      currentBoard[triplet[0]] === currentBoard[triplet[1]] &&
      currentBoard[triplet[1]] === currentBoard[triplet[2]]
    );
  };

  return {
    getCurrentPlayer: function () {
      return currentPlayer;
    },

    switchCurrentPlayer: function () {
      if (currentPlayer == player1) {
        currentPlayer = player2;
      } else {
        currentPlayer = player1;
      }
    },

    playRound: function (index) {
      GameBoard.placeMarker(index, currentPlayer.marker);
      const result = this.checkWinner();
      if (result.message === '') {
        this.switchCurrentPlayer();
        return result;
      } else {
        return result;
      }
    },

    checkWinner: function () {
      const currentBoard = GameBoard.getBoard();
      let winnerMarker = '';
      let winner = '';
      let winnerMessage = '';
      let winningLine;
      winningTriplets.forEach((triplet) => {
        isWinningTripletPresent(currentBoard, triplet);

        if (isWinningTripletPresent(currentBoard, triplet)) {
          winnerMarker = currentBoard[triplet[0]];
          winningLine = triplet;
          if (winnerMarker === player1.marker) {
            winnerMessage = `The winner is ${player1.name}`;
          } else if (winnerMarker === player2.marker) {
            winnerMessage = `The winner is ${player2.name}`;
          }
        }
      });
      if (winnerMessage === '' && currentBoard.every((cell) => cell !== '')) {
        winnerMessage = `it's a tie`;
        winningLine = null;
      }
      return { message: winnerMessage, line: winningLine };
    },

    resetCurrentPlayer: function () {
      currentPlayer = player1;
    },
  };
})();

let turn = document.querySelector('.turn');
const cells = document.querySelectorAll('.cell');
function render() {
  const board = GameBoard.getBoard();

  turn.textContent = GameController.getCurrentPlayer().name;
  cells.forEach((cell, i) => {
    cell.textContent = board[i];
  });
}

let gameOver = false;
const playAgain = document.getElementById('play-again');
playAgain.hidden = true;

document.querySelectorAll('.cell').forEach((cell) =>
  cell.addEventListener('click', () => {
    let index = Number(cell.dataset.index);

    if (gameOver === true || GameBoard.getBoard()[index] !== '') {
      return;
    }
    const result = GameController.playRound(index);
    render();

    if (result.message !== '') {
      let winMesDiv = document.querySelector('.winner')
      playAgain.hidden = false;
      turn.textContent = '';
      gameOver = true;
      winMesDiv.textContent = result.message
      let lineHighlighted = result.line;
      if(lineHighlighted !== null){
        lineHighlighted.forEach((line) => {
          cells[line].classList.add('highlight');
        });
      }
    }
  })
);

playAgain.addEventListener('click', () => {
  playAgain.hidden = true;
  GameController.resetCurrentPlayer();
  GameBoard.resetBoard();
  gameOver = false;
  cells.forEach((cell) => {
    cell.classList.remove('highlight')
  })
  render();
});
