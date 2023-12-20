class TicTacToe {
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

    // Add normal-level logic for computer's move here
    const emptyCells = this.gameBoard.reduce((cells, cell, index) => {
      if (cell === "") cells.push(index);
      return cells;
    }, []);

    // Make a random move
    const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    this.gameBoard[randomIndex] = "O";
    this.cells[randomIndex].innerText = "O";
    this.cells[randomIndex].classList.add("player-O");

    this.checkWinner();
    if (this.gameActive) {
      this.currentPlayer = "X";
    }
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

const game = new TicTacToe();
