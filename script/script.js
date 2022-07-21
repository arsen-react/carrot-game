const BOARD_SIZE = 8;
let MATRIX;
const emptySlot = 0;
const bunnySlot = 1;
const ROOT_DIV = document.getElementById("root");

const createEmptyBoardMatrix = () => {
  MATRIX = new Array(BOARD_SIZE)
    .fill(emptySlot)
    .map(() => new Array(BOARD_SIZE).fill(emptySlot));
};

const getRandomPosition = () => {
  const row = Math.floor(Math.random() * BOARD_SIZE);
  const column = Math.floor(Math.random() * BOARD_SIZE);

  return { row, column };
};

const setBunnyPosition = () => {
  const { row, column } = getRandomPosition();
  console.log(MATRIX);

  MATRIX[row][column] = bunnySlot;
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
  createHTMLElement("div", boardWrapper, 'square', `${rowID}${columnID}`);
};

const createBoardUi = () => {
  createHTMLElement("div", ROOT_DIV, null, "board-wrapper");
  MATRIX.forEach((row, rowID) => {
    row.forEach((column, columnID) => {
   
      createBoardSquare(rowID, columnID);
    });
  });
};

const startGame = () => {
  createEmptyBoardMatrix();
  setBunnyPosition();
  createBoardUi();
};
startGame();
