"use strict";

const BOARD_SIZE = 8;
let MATRIX;
const EMPTY_SLOT = 0;
const BUNNY_SLOT = 1;
const CARROT_SLOT = 2;
const SOIL = 3;
const BUNNY_ON_SOIL = 4;
const ROOT_DIV = document.getElementById("root");
let TIMEOUT_ID;
const rightEdge = 7;
const leftEdge = 0;
const topEdge = 0;
const bottomEdge = 7;

const CARROTS_TO_WIN = 3;

const checkGameEnd = () => {
  if (points === CARROTS_TO_WIN) {
    alert("YOU WON!");
    startGame();
  }
};

const incrementPoints = () => {
  const pointsElem = document.getElementById("points");
  let points = parseInt(pointsElem.innerHTML);
  points++;
  pointsElem.innerHTML = `${points}`;

  checkGameEnd();
};

const createEmptyBoardMatrix = () => {
  MATRIX = new Array(BOARD_SIZE)
    .fill()
    .map(() => new Array(BOARD_SIZE).fill(EMPTY_SLOT));
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
      if(coordinates.length < 2 && column === objectSlot)
        coordinates.push(rowID, columnID);
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
  if (getObjectPosition(CARROT_SLOT).length) {
    return CARROT_SLOT;
  }
};

const checkBunnyStep = (line, step, edgeCoordinate, nextEdge) => {
  let currentSlot = getCurrentSlot();

  const [currRow, currColumn] = getObjectPosition(currentSlot);

  let [newRow, newColumn] = [currRow, currColumn];

  if (line === "X" && currColumn === edgeCoordinate) {
    newColumn = nextEdge;
  } else if (line === "X") {
    newColumn += step;
  } else if (line === "Y" && currRow === edgeCoordinate) {
    newRow = nextEdge;
  } else {
    newRow += step;
  }

  const nextSlot = MATRIX[newRow][newColumn];

  if (nextSlot === EMPTY_SLOT) {
    // bunny is moving to a next empty slot
    currentSlot = EMPTY_SLOT;
  } else if (nextSlot === CARROT_SLOT) {
    // bunny eats carrot
    currentSlot = EMPTY_SLOT;
    clearTimeout(TIMEOUT_ID);
    incrementPoints();
  } else {
    // we dont let bunny to move
    currentSlot = BUNNY_SLOT;
  }

  if (currentSlot === BUNNY_SLOT) {
    return;
  }

  changePreviousValueWithNew(newRow, newColumn);

  changeBunnyPosition(newRow, newColumn, currRow, currColumn);
};

const changeBunnyPosition = (newRow, newColumn, currRow, currColumn) => {
  const oldPosition = document.getElementById(`${currRow}${currColumn}`);
  const newPosition = document.getElementById(`${newRow}${newColumn}`);

  if (oldPosition && oldPosition.childNodes[0]) {
    if (MATRIX[newRow][newColumn] === BUNNY_SLOT) {
      newPosition.innerHTML = "";
    }
    newPosition.appendChild(oldPosition.childNodes[0]);
  }
};

const setCarrotCoordinate = (e) => {
  if (e.keyCode === 32) {
    const currentCharacter = getCurrentSlot();
    const [currRow, currColumn] = getObjectPosition(currentCharacter);
    MATRIX[currRow][currColumn] = BUNNY_ON_SOIL;

    setImagePosition(BUNNY_ON_SOIL, "ground-img");

    console.log('matrica: ', MATRIX)
    TIMEOUT_ID = setTimeout(() => {
      const [soilRow, soilColumn] = getObjectPosition(SOIL);
      MATRIX[soilRow][soilColumn] = CARROT_SLOT;
      setImagePosition(CARROT_SLOT, "carrot-img");
    }, 3000);

    e.preventDefault();
  }
};

const changePreviousValueWithNew = (newRow, newColumn) => {
  const currentCharacter = getCurrentSlot();
  const [currRow, currColumn] = getObjectPosition(currentCharacter);

  if (currentCharacter === BUNNY_ON_SOIL) {
    MATRIX[currRow][currColumn] = SOIL;
  } else {
    MATRIX[currRow][currColumn] = EMPTY_SLOT;
  }

  MATRIX[newRow][newColumn] = BUNNY_SLOT;
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
