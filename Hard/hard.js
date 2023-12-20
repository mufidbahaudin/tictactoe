class TicTacToeGame {
  constructor() {
    this.cells = document.querySelectorAll("[data-cell]");
    this.restartButton = document.getElementById("restart-button");
    this.message = document.getElementById("message");
    this.currentPlayer = "X";
    this.gameBoard = ["", "", "", "", "", "", "", "", ""];
    this.gameActive = true;

    this.cells.forEach((cell, index) => {
      cell.addEventListener("click", () => this.handleCellClick(cell, index));
    });

    this.restartButton.addEventListener("click", () => this.restartGame());
  }

  checkWinner() {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (this.gameBoard[a] && this.gameBoard[a] === this.gameBoard[b] && this.gameBoard[a] === this.gameBoard[c]) {
        this.gameActive = false;
        this.message.innerText = `${this.currentPlayer} wins!`;
      }
    }

    if (!this.gameBoard.includes("") && this.gameActive) {
      this.gameActive = false;
      this.message.innerText = "It's a draw!";
    }
  }

  handleCellClick(cell, cellIndex) {
    if (this.gameBoard[cellIndex] || !this.gameActive) return;

    this.gameBoard[cellIndex] = this.currentPlayer;
    cell.innerText = this.currentPlayer;
    cell.classList.add("player-" + this.currentPlayer);

    this.checkWinner();
    if (this.gameActive) {
      this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
      if (this.currentPlayer === "O") {
        setTimeout(() => this.makeComputerMove(), 500);
      }
    }
  }

  makeComputerMove() {
    if (!this.gameActive) return;

    const bestMove = this.minimax(this.gameBoard, "O", -Infinity, Infinity).index;
    this.gameBoard[bestMove] = "O";
    this.cells[bestMove].innerText = "O";
    this.cells[bestMove].classList.add("player-O");

    this.checkWinner();
    if (this.gameActive) {
      this.currentPlayer = "X";
    }
  }

  minimax(board, player, alpha, beta) {
    const availableCells = this.getAvailableCells(board);

    if (this.checkWin(board, "O")) {
      return { score: 1 };
    } else if (this.checkWin(board, "X")) {
      return { score: -1 };
    } else if (availableCells.length === 0) {
      return { score: 0 };
    }

    const moves = [];

    for (let i = 0; i < availableCells.length; i++) {
      const move = {};
      move.index = availableCells[i];
      board[availableCells[i]] = player;

      if (player === "O") {
        const result = this.minimax(board, "X", alpha, beta);
        move.score = result.score;
        if (result.score > alpha) {
          alpha = result.score;
        }
      } else {
        const result = this.minimax(board, "O", alpha, beta);
        move.score = result.score;
        if (result.score < beta) {
          beta = result.score;
        }
      }

      board[availableCells[i]] = "";
      moves.push(move);

      if (alpha >= beta) {
        break;
      }
    }

    return player === "O"
      ? moves.reduce((max, move) => (move.score > max.score ? move : max), { score: -Infinity })
      : moves.reduce((min, move) => (move.score < min.score ? move : min), { score: Infinity });
  }

  getAvailableCells(board) {
    return board.reduce((cells, cell, index) => {
      if (cell === "") cells.push(index);
      return cells;
    }, []);
  }

  checkWin(board, player) {
    const winCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    return winCombos.some((combo) => {
      return combo.every((index) => board[index] === player);
    });
  }

  restartGame() {
    this.gameBoard = ["", "", "", "", "", "", "", "", ""];
    this.gameActive = true;
    this.currentPlayer = "X";
    this.cells.forEach((cell) => {
      cell.innerText = "";
      cell.classList.remove("player-X", "player-O");
    });
    this.message.innerText = "";
  }
}

// Inisialisasi permainan
const game = new TicTacToeGame();
