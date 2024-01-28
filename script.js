//your JS code here. If required.
let currentPlayer = 1;
let player1Name = "";
let player2Name = "";
let board = ["", "", "", "", "", "", "", "", ""];

function startGame() {
  player1Name = document.getElementById("player-1").value;
  player2Name = document.getElementById("player-2").value;

  document.querySelector(".container").innerHTML = "";
  displayBoard();
}

function displayBoard() {
  const container = document.querySelector(".container");

  container.innerHTML = `
    <h1>Tic Tac Toe</h1>
    <div class="message">${player1Name}, you're up!</div>
    <div id="board" class="board">
      ${board.map((cell, index) => `<div class="cell" id="${index + 1}" onclick="makeMove(${index + 1})">${cell}</div>`).join("")}
    </div>
  `;
}

function makeMove(index) {
  if (board[index - 1] === "") {
    board[index - 1] = currentPlayer === 1 ? "X" : "O";
    displayBoard();

    if (checkWin()) {
      document.querySelector(".message").innerText = `${currentPlayer === 1 ? player1Name : player2Name}, congratulations you won!`;
      disableBoard();
    } else if (board.every(cell => cell !== "")) {
      document.querySelector(".message").innerText = "It's a draw!";
    } else {
      currentPlayer = 3 - currentPlayer; // Switch player (1 -> 2, 2 -> 1)
      document.querySelector(".message").innerText = `${currentPlayer === 1 ? player1Name : player2Name}, you're up!`;
    }
  }
}

function checkWin() {
  const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  return winConditions.some(condition => {
    const [a, b, c] = condition;
    return board[a] !== "" && board[a] === board[b] && board[b] === board[c];
  });
}

function disableBoard() {
  const cells = document.querySelectorAll(".cell");
  cells.forEach(cell => cell.style.pointerEvents = "none");
}
