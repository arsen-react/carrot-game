"use strict";

const BOARD_SIZE = 8;
let MATRIX;
const EMPTY_SLOT = 0;
const BUNNY_SLOT = 1;
const CARROT_SLOT = 2;
const SOIL = 3;
const BUNNY_ON_SOIL = 4;
const ROOT_DIV = document.getElementById("root");

const rightEdge = 7
const leftEdge = 0
const topEdge = 0
const bottomEdge = 7

const createEmptyBoardMatrix = () => {
  MATRIX = new Array(BOARD_SIZE)
    .fill()
    .map(() => new Array(BOARD_SIZE).fill(EMPTY_SLOT));
  console.log(MATRIX);
};

const getRandomPosition = () => {
  const row = Math.floor(Math.random() * BOARD_SIZE);
  const column = Math.floor(Math.random() * BOARD_SIZE);

  return [row, column];
};

const setBunnyPosition = () => {
  const [row, column] = getRandomPosition();
  MATRIX[row][column] = BUNNY_SLOT;
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
      if (column === objectSlot) {
        coordinates.push(rowID, columnID);
      }
    });
  });
  return coordinates;
};

const setImagePosition = (character, className, id) => {
  const [rowID, columnID] = getObjectPosition(character);
  const square = document.getElementById(`${rowID}${columnID}`);
  createHTMLElement("img", square, className, id);
};

const getCurrentSlot = () => {
  if (getObjectPosition(BUNNY_SLOT).length) {
    return BUNNY_SLOT;
  }
  if (getObjectPosition(BUNNY_ON_SOIL).length) {
    return BUNNY_ON_SOIL;
  }
  if (getObjectPosition(EMPTY_SLOT).length) {
    return EMPTY_SLOT;
  }
};

const checkBunnyStep = (line, step, edgeCoordinate, nextEdge) => {
  const currentSlot = getCurrentSlot();

  const [currRow, currColumn] = getObjectPosition(currentSlot);

  let [newRow, newColumn] = [currRow, currColumn];

  if (line === "X" && currColumn === edgeCoordinate) {
    newColumn = nextEdge
  } else if(line === "X" ){
     newColumn += step
  }else if(line === "Y" && currRow === edgeCoordinate){
    newRow = nextEdge
  }else{
    newRow += step
  }

  const nextObject = MATRIX[newRow][newColumn];
  const newObject = nextObject === EMPTY_SLOT ? BUNNY_SLOT : BUNNY_ON_SOIL

  changePreviousValueWithNew(currentSlot, newObject, newRow, newColumn);

  changeBunnyPosition(newRow, newColumn, currRow, currColumn);
};

const changeBunnyPosition = (newRow, newColumn, currRow, currColumn) => {
  const oldPosition = document.getElementById(`${currRow}${currColumn}`);
  const newPosition = document.getElementById(`${newRow}${newColumn}`);

  if (oldPosition && oldPosition.childNodes[0]) {
    newPosition.appendChild(oldPosition.childNodes[0]);
  }
};

const setCarrotCoordinate = (e) => {
  if (e.keyCode === 32) {
    const [currRow, currColumn] = getObjectPosition(BUNNY_SLOT);
    const square = document.getElementById(`${currRow}${currColumn}`);

    changePreviousValueWithNew(BUNNY_SLOT, BUNNY_ON_SOIL);
    setImagePosition(BUNNY_ON_SOIL, "ground-img", "groundImg");
  }
};

const changePreviousValueWithNew = (
  currentObject,
  changeObject,
  newRow,
  newColumn
) => {
  const [currRow, currColumn] = getObjectPosition(currentObject);
  MATRIX[currRow][currColumn] = changeObject;
  if (newRow && newColumn) {
    MATRIX[newRow][newColumn] = BUNNY_SLOT;
  }
};

const moveBunny = (event) => {
  switch (event.key) {
    case "ArrowLeft":
      checkBunnyStep("X", -1, leftEdge, rightEdge);
      break;
    case "ArrowRight":
      checkBunnyStep("X", 1, rightEdge, leftEdge);
      break;
    case "ArrowUp":
      checkBunnyStep("Y", -1, topEdge, bottomEdge);
      break;
    case "ArrowDown":
      checkBunnyStep("Y", 1, bottomEdge, topEdge);
      break;
    default:
      break;
  }
};

const gameReady = () => {
  window.addEventListener("keyup", moveBunny);
};

const setCarrot = () => {
  window.addEventListener("keydown", setCarrotCoordinate);
};

function startGame() {
  createEmptyBoardMatrix();
  removeBoard();
  setBunnyPosition();
  createBoardUi();
  setImagePosition(BUNNY_SLOT, "bunny-img", "bunnyID");
  gameReady();
  setCarrot();
}
