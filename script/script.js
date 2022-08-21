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

const getBunnyPosition = () => {
  for (const [rowID, row] of Object.entries(MATRIX)) {
    const columnID = row.findIndex((column) => column === 1);
    if (columnID > -1) return [rowID, columnID];
  }
};

const setBunnyImgPosition = () => {
  const [rowID, columnID] = getBunnyPosition() ?? [];
  const square = document.getElementById(`${rowID}${columnID}`);
  createHTMLElement("img", square, "bunny-img", "bunnyID");
};

// const moveBunny = () => {
//   let [rowID, columnID] = getBunnyPosition();
//   let moveUp = rowID - 1;
//   const square = document.getElementById(`${moveUp}${columnID}`);
//   rowID = moveUp;
//   createHTMLElement("img", square, "bunny-img", "");
//   // return [rowID, columnID];
// };

// const removePreviousBunnyImg = () => {
//   const [rowID, columnID] = getBunnyPosition();
//   const square = document.getElementById(`${rowID}${columnID}`);
//   square.parentNode.removeChild("bunny-img");
// };

// const moveBunnyUpDeleteImg = () => {
//   moveBunny();
//   // removePreviousBunnyImg();
//   setBunnyImgPosition()
// };

// const removeClick = () =>{

//   const [rowID,columnID] = getBunnyPosition()
//   const squre = document.getElementById(`${rowID}${columnID}`)
//   squre.removeEventListener('keyup',removeClick)
// }

const esim = () => {
  const [rowID, columnID] = getBunnyPosition();

  MATRIX[rowID - 1][columnID] = BUNNYSLOT;
  console.log(rowID, columnID);
  console.log(rowID - 1, columnID);
  MATRIX[rowID][columnID] = EMPTYSLOT;
  const bunnyIMG = document.getElementById("bunnyID");
  bunnyIMG.remove();
  const square = document.getElementById(`${rowID - 1}${columnID}`);
  createHTMLElement("img", square, "bunny-img", "bunnyID");
};

const moveBunnyUp = () => {
  window.addEventListener("keyup", esim);
};

// const moveBunny = () => {
//   window.addEventListener("keyup", (event) => {
//     console.log(square);
//     switch (event.key) {
//       case "ArrowLeft":
//         console.log(setBunnyImgPosition.columnID);
//         break;
//       case "ArrowRight":
//         square.style.left = parseInt(square.style.left) + 5 + "px";
//         break;
//       case "ArrowUp":

//         break;
//       case "ArrowDown":
//         square.style.top = parseInt(square.style.top) + 5 + "px";
//         break;
//       default:
//         alert("Only Arrow Keys Are Allowed!");
//     }
//   });
//   console.log(rowID, columnID);
// };

const startGame = () => {
  createEmptyBoardMatrix();
  removeBoard();
  setBunnyPosition();
  createBoardUi();
  getBunnyPosition();
  setBunnyImgPosition();
  moveBunnyUp();
  // removePreviousBunnyImg();
};
