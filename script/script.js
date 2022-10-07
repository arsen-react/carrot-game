"use strict";

const BOARD_SIZE = 8;
let MATRIX;
const EMPTYSLOT = 0;
const BUNNYSLOT = 1;
const CARROTSLOT = 2;
const SOIL = 3;
const BUNNY_ON_SOIL = 4
const ROOT_DIV = document.getElementById("root");

const createEmptyBoardMatrix = () => {
  MATRIX = new Array(BOARD_SIZE)
    .fill()
    .map(() => new Array(BOARD_SIZE).fill(EMPTYSLOT));
  console.log(MATRIX);
};

const getRandomPosition = () => {
  const row = Math.floor(Math.random() * BOARD_SIZE);
  const column = Math.floor(Math.random() * BOARD_SIZE);

  return [row, column];
};

const setBunnyPosition = () => {
  const [row, column] = getRandomPosition();
  MATRIX[row][column] = BUNNYSLOT;
};

const createHTMLElement = (elementType, parent, className, id) => {
  const element = document.createElement(elementType);
  if (className) {
    element.classList.add(className);
  }
  if (id) {
    element.setAttribute("id", id);
  }
  parent.appendChild(element);
};

const createBoardSquare = (rowID, columnID) => {
  const boardWrapper = document.getElementById("board-wrapper");
  createHTMLElement("div", boardWrapper, "square", `${rowID}${columnID}`);
};

const createBoardUi = () => {
  createHTMLElement("div", ROOT_DIV, null, "board-wrapper");
  MATRIX.forEach((row, rowID) => {
    row.forEach((column, columnID) => {
      createBoardSquare(rowID, columnID);
    });
  });
};

const removeBoard = () => {
  const boardWrapper = document.getElementById("board-wrapper");
  if (boardWrapper) {
    boardWrapper.remove();
  }
};
const getObjectPosition = (objectSlot) => {
  const coordinates = [];
  MATRIX.forEach((row, rowID) => {
    row.forEach((column, columnID) => {
      if ((column & objectSlot) !== 0) {
        coordinates.push(rowID, columnID);
      }
    });
  });
  return coordinates;
};

const setBunnyImgPosition = () => {
  const [rowID, columnID] = getObjectPosition(BUNNYSLOT);
  const square = document.getElementById(`${rowID}${columnID}`);
  createHTMLElement("img", square, "bunny-img", "bunnyID");
};

const checkBunnyStep = (line, step, checkEndOrStartOfColumn, stepForEdges) => {
  const [currRow, currColumn] = getObjectPosition(BUNNYSLOT);
  let [newRow, newColumn] = [currRow, currColumn];

  if (line === "X") {
    newColumn += step;
  } else {
    newRow += step;
  }

  if (currColumn === checkEndOrStartOfColumn) {
    newColumn += stepForEdges;
  } else if (currColumn === checkEndOrStartOfColumn) {
    newColumn += stepForEdges;
  }
  changePreviousValueWithNew(newRow, newColumn, currRow, currColumn);

  changeBunnyPosition(newRow, newColumn, currRow, currColumn);
};

const changeBunnyPosition = (newRow, newColumn, currRow, currColumn) => {
  const oldPosition = document.getElementById(`${currRow}${currColumn}`);
  const newPosition = document.getElementById(`${newRow}${newColumn}`);

  if (oldPosition && oldPosition.childNodes[0]) {
    newPosition.appendChild(oldPosition.childNodes[0]);
  }
};

const setCarrotCoordinate = () => {
  const [currRow, currColumn] = getObjectPosition(BUNNYSLOT);
  const square = document.getElementById(`${currRow}${currColumn}`);

  if ((MATRIX[currRow][currColumn] & CARROTSLOT) === 0) {
    MATRIX[currRow][currColumn] |= CARROTSLOT;
    console.log(MATRIX);
  } else {
    MATRIX[currRow][currColumn] &= ~CARROTSLOT;
    console.log(MATRIX, "asdasda");
  }
  createHTMLElement("img", square, "ground-img", "groundID");
  const esim = document.getElementsByClassName("ground-img");
  console.log();
};

const changePreviousValueWithNew = (newRow, newColumn, currRow, currColumn) => {
  MATRIX[newRow][newColumn] = BUNNY_ON_SOIL; // es meky seta anum
};

const moveBunny = (event) => {
  switch (event.key) {
    case "ArrowLeft":
      checkBunnyStep("X", -1, 0, 8);
      break;
    case "ArrowRight":
      checkBunnyStep("X", 1, 7, -8);
      break;
    case "ArrowUp":
      checkBunnyStep("Y", -1);
      break;
    case "ArrowDown":
      checkBunnyStep("Y", 1);
      break;
    default:
      break;
  }
};

const gameReady = () => {
  window.addEventListener("keyup", moveBunny);
};

const setCarrot = () => {
  window.addEventListener("keypress", setCarrotCoordinate);
};

function startGame() {
  createEmptyBoardMatrix();
  removeBoard();
  setBunnyPosition();
  createBoardUi();
  setBunnyImgPosition();
  gameReady();
  setCarrot();
}
