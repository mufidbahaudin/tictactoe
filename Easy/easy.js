class GameTicTacToe {
  constructor() {
    this.kotak_kotak = document.querySelectorAll("[data-cell]");
    this.tombolRestart = document.getElementById("restart-button");
    this.pesan = document.getElementById("message");
    this.player = "X";
    this.papanGame = ["", "", "", "", "", "", "", "", ""];
    this.gameActive = true;
    this.komputerBermain = false; // Properti untuk menandai apakah pemain adalah komputer

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

    this.tombolRestart.addEventListener("click", () => this.restartGame());
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

  handleCellClick(kotak, kotakIndex) {
    if (this.papanGame[kotakIndex] || !this.gameActive) return;

    this.papanGame[kotakIndex] = this.player;
    kotak.innerText = this.player;
    kotak.classList.add("player-" + this.player);

    this.cekMenang();
    if (this.gameActive) {
      this.player = this.player === "X" ? "O" : "X";
      if (this.komputerBermain && this.player === "O") {
        setTimeout(() => this.komputerBergerak(), 500);
      }
    }
  }

  komputerBergerak() {
    if (!this.gameActive) return;
    let kotakKosong = [];
    for (let i = 0; i < this.papanGame.length; i++) {
      if (this.papanGame[i] === "") {
        kotakKosong.push(i);
      }
    }

    const randomIndex = Math.floor(Math.random() * kotakKosong.length);
    const computerMoveIndex = kotakKosong[randomIndex];
    this.papanGame[computerMoveIndex] = "O";
    this.kotak_kotak[computerMoveIndex].innerText = "O";
    this.kotak_kotak[computerMoveIndex].classList.add("player-O");

    this.cekMenang();
    if (this.gameActive) {
      this.player = "X";
    }
  }

  restartGame() {
    this.papanGame = ["", "", "", "", "", "", "", "", ""];
    this.gameActive = true;
    this.player = "X";
    this.kotak_kotak.forEach((kotak) => {
      kotak.innerText = "";
      kotak.classList.remove("player-X", "player-O");
    });
    this.pesan.innerText = "";
  }

  // Getter dan Setter untuk properti komputerBermain
  get isComputer() {
    return this.komputerBermain;
  }

  set isComputer(value) {
    this.komputerBermain = value;
  }
}

// Membuat objek permainan Tic-Tac-Toe
const ticTacToe = new GameTicTacToe();
ticTacToe.isComputer = true; // Mengatur pemain komputer
