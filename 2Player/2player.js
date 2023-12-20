class GameTicTacToe {
  constructor() {
    this.kotak_kotak = document.querySelectorAll("[data-cell]");
    this.tombolRestart = document.getElementById("restart-button");
    this.pesan = document.getElementById("message");
    this.player = "X";
    this.papanGame = ["", "", "", "", "", "", "", "", ""];
    this.gameActive = true;

    this.kombinasiMenang = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    this.kotak_kotak.forEach((kotak, index) => {
      kotak.addEventListener("click", () => this.handleCellClick(kotak, index));
    });

    this.tombolRestart.addEventListener("click", () => this.ulangGame());
  }

  cekMenang() {
    for (let kombinasi of this.kombinasiMenang) {
      const [a, b, c] = kombinasi;
      if (this.papanGame[a] && this.papanGame[a] === this.papanGame[b] && this.papanGame[a] === this.papanGame[c]) {
        this.gameActive = false;
        this.pesan.innerText = `${this.player} wins!`;
      }
    }

    if (!this.papanGame.includes("") && this.gameActive) {
      this.gameActive = false;
      this.pesan.innerText = "It's a draw!";
    }
  }

  handleCellClick(kotak, cellIndex) {
    if (this.papanGame[cellIndex] || !this.gameActive) return;

    this.papanGame[cellIndex] = this.player;
    kotak.innerText = this.player;
    kotak.classList.add("player-" + this.player);

    this.cekMenang();
    this.player = this.player === "X" ? "O" : "X";
  }

  ulangGame() {
    this.papanGame = ["", "", "", "", "", "", "", "", ""];
    this.gameActive = true;
    this.player = "X";
    this.kotak_kotak.forEach((kotak) => {
      kotak.innerText = "";
      kotak.classList.remove("player-X", "player-O");
    });
    this.pesan.innerText = "";
  }
}

// Membuat objek permainan Tic-Tac-Toe
const ticTacToe = new GameTicTacToe();
