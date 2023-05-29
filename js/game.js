"use strict";

const WALL = "#";
const FOOD = ".";
const EMPTY = " ";
const SUPER_FOOD = "🍄";

const gGame = {
  score: 0,
  isOn: false,
};
var gBoard;

function onInit() {
  gGame.isOn = true;
  gBoard = buildBoard();
  createPacman(gBoard);
  createGhosts(gBoard);

  renderBoard(gBoard);
  gGame.foodCount = countFood(gBoard);
  var modal = document.querySelector(".modal");
  modal.style.display = "none";
  document.querySelector("h2 span").innerText = gGame.score;
}

function buildBoard() {
  const size = 10;
  const board = [];

  for (var i = 0; i < size; i++) {
    board.push([]);

    for (var j = 0; j < size; j++) {
      if (board[i][j] === PACMAN) continue;

      board[i][j] = FOOD;
      if (
        (i === 1 && j === 1) ||
        (i === size - 2 && j === 1) ||
        (i === 1 && j === size - 2) ||
        (i === size - 2 && j === size - 2)
      ) {
        board[i][j] = SUPER_FOOD;
      }
      if (
        i === 0 ||
        i === size - 1 ||
        j === 0 ||
        j === size - 1 ||
        (j === 3 && i > 4 && i < size - 2)
      ) {
        board[i][j] = WALL;
      }
    }
  }

  return board;
}

function renderBoard(board) {
  var strHTML = "";
  for (var i = 0; i < board.length; i++) {
    strHTML += "<tr>";
    for (var j = 0; j < board[0].length; j++) {
      const cell = board[i][j];
      const className = `cell cell-${i}-${j}`;

      strHTML += `<td class="${className}">${cell}</td>`;
    }
    strHTML += "</tr>";
  }
  const elContainer = document.querySelector(".board");
  elContainer.innerHTML = strHTML;
}

// location is an object like this - { i: 2, j: 7 }
function renderCell(location, value) {
  // Select the elCell and set the value
  const elCell = document.querySelector(`.cell-${location.i}-${location.j}`);
  elCell.innerHTML = value;
}

function updateScore(diff) {
  // update model and dom
  gGame.score += diff;
  document.querySelector("h2 span").innerText = gGame.score;
  gGame.foodCount--;
  if (gGame.foodCount === 0) {
    gameOver(gGame.foodCount);
  }
}

function countFood(board) {
  var foodCount = 1;
  for (var i = 1; i < board.length; i++) {
    for (var j = 1; j < board[0].length; j++) {
      var currCell = board[i][j];

      if (currCell === ".") {
        foodCount++;
      }
    }
  }
  gGame.foodCount = foodCount;
  return foodCount;
}

function gameOver(foodCount) {
  gGame.isOn = false;
  clearInterval(gIntervalGhosts);
  renderCell(gPacman.location, EMPTY);

  var modal = document.querySelector(".modal");
  modal.style.display = "block";
  gGame.score = 0;

  var elH2 = document.querySelector(".modal h2");
  if (foodCount === 0) {
    elH2.innerText = "Victory!";
  } else elH2.innerText = "Game Over!";
}
