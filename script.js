const X_CLASS = "x";
const CIRCLE_CLASS = "circle";
let circleTurn;

const WINNINGCOMBINATION = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
  [1, 4, 7],
];

const cellElement = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const restartButton = document.getElementById("restartButton");
const WinningMessageElement = document.getElementById("winning-message");
const WinningMessageTextElement = document.querySelector(
  "[data-winning-message-text]"
);

startgame();

restartButton.addEventListener("click", startgame);

function startgame() {
  circleTurn = false;
  cellElement.forEach((cell) => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(CIRCLE_CLASS);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
  setBoardHoverClass();
  WinningMessageElement.classList.remove("show");
}

function handleClick(e) {
  //placeeMark
  const cell = e.target;
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
  placeMark(cell, currentClass);

  //Check for win
  if (checkWins(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    //Switch turns
    swapTurns();

    //Setting hover effect
    setBoardHoverClass();
  }
  //swapTurns()

  //Setting hover effect
  setBoardHoverClass();
}

function isDraw() {
  return [...cellElement].every((cell) => {
    return (
      cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    );
  });
}

function endGame(Draw) {
  if (Draw) {
    WinningMessageTextElement.innerText = "Draw!";
  } else {
    WinningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`;
  }
  WinningMessageElement.classList.add("show");
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function swapTurns() {
  circleTurn = !circleTurn;
}

function setBoardHoverClass() {
  board.classList.remove(X_CLASS);
  board.classList.remove(CIRCLE_CLASS);
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS);
  } else {
    board.classList.add(X_CLASS);
  }
}

function checkWins(currentClass) {
  return WINNINGCOMBINATION.some((combination) => {
    return combination.every((index) => {
      return cellElement[index].classList.contains(currentClass);
    });
  });
}
