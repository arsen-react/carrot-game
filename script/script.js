const BOARD_SIZE = 8;
let MATRIX;
const EMPTYSLOT = 0;
const BUNNYSLOT = 1;
const ROOT_DIV = document.getElementById("root");

const createEmptyBoardMatrix = () => {
  MATRIX = new Array(BOARD_SIZE)
    .fill()
    .map(() => new Array(BOARD_SIZE).fill(EMPTYSLOT));
  console.log("asdasd", MATRIX);
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
      if (column === objectSlot) {
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

const changeBunnyCoordinates = (axis, step) => {
  const [currRow, currColumn] = getObjectPosition(BUNNYSLOT);
  let [newRow, newColumn] = [currRow, currColumn];

  if (axis === "X") {
    newColumn += step;
  } else {
    newRow += step;
  }

  MATRIX[newRow][newColumn] = BUNNYSLOT;
  MATRIX[currRow][currColumn] = EMPTYSLOT;

  changeBunnyPosition(currRow, currColumn, newRow, newColumn);
};

const changeBunnyPosition = (oldRow, oldColumn, newRow, newColumn) => {
  const oldPosition = document.getElementById(`${oldRow}${oldColumn}`);
  const newPosition = document.getElementById(`${newRow}${newColumn}`);

  if (oldPosition && oldPosition.childNodes[0]) {
    newPosition.appendChild(oldPosition.childNodes[0]);
  }
};

const moveBunny = (event) => {
  switch (event.key) {
    case "ArrowLeft":
      changeBunnyCoordinates("X", -1);
      break;
    case "ArrowRight":
      changeBunnyCoordinates("X", 1);
      break;
    case "ArrowUp":
      changeBunnyCoordinates("Y", -1);
      break;
    case "ArrowDown":
      changeBunnyCoordinates("Y", 1);
      break;
    default:
      break;
  }
};

const gameReady = () => {
  window.addEventListener("keyup", moveBunny);
};

function startGame() {
  createEmptyBoardMatrix();
  removeBoard();
  setBunnyPosition();
  createBoardUi();
  setBunnyImgPosition();
  gameReady();
}
