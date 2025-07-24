const cells = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const message = document.getElementById("message");
const restartBtn = document.getElementById("restartBtn");

let isXTurn = true;
const WIN_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function startGame() {
  cells.forEach(cell => {
    cell.classList.remove("x", "o");
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
  isXTurn = true;
  setBoardHoverClass();
  message.textContent = "Player X's Turn";
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = isXTurn ? "x" : "o";
  cell.classList.add(currentClass);

  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    isXTurn = !isXTurn;
    setBoardHoverClass();
    message.textContent = `Player ${isXTurn ? "X" : "O"}'s Turn`;
  }
}

function endGame(draw) {
  if (draw) {
    message.textContent = "It's a Draw!";
  } else {
    message.textContent = `Player ${isXTurn ? "X" : "O"} Wins!`;
  }
  cells.forEach(cell => cell.removeEventListener("click", handleClick));
}

function isDraw() {
  return [...cells].every(cell => cell.classList.contains("x") || cell.classList.contains("o"));
}

function checkWin(currentClass) {
  return WIN_COMBOS.some(combo => {
    return combo.every(index => cells[index].classList.contains(currentClass));
  });
}

function setBoardHoverClass() {
  board.classList.remove("x", "o");
  board.classList.add(isXTurn ? "x" : "o");
}

restartBtn.addEventListener("click", startGame);

// Start for the first time
startGame();
