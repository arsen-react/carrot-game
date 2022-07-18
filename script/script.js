const BOARD_SIZE = 8;
const MATRIX = [];
const emptySlots = 0;
const bunnySlot = 1;
// ha start sxmeluc 2 functiona ashxatelu demi hamar, heto avelanaluya eli, kzganq yntacqum

// hmi 2 function

// 1. CreateEmptyBoard, vory et matrixi mej 8 hat arraya sarqelu, amen meki meje 8 hat zro lcni

// 2. SetBunnyPosition, vory patahakan kerpov et 64 zroneric meky pti sarqi 1

// const PARENT_BOARD = document.createElement("table");

// var table = document.createElement("table");
// for (var i = 1; i < 9; i++) {
//   var tr = document.createElement("tr");
//   for (var j = 1; j < 9; j++) {
//     var td = document.createElement("td");
//     if (i % 2 == j % 2) {
//       td.className = "white";
//     } else {
//       td.className = "black";
//     }
//     tr.appendChild(td);
//   }
//   table.appendChild(tr);
// }
// document.body.appendChild(table);

const createEmptyBoardMatrix = () => {
  MATRIX.push(
    Array(BOARD_SIZE)
      .fill()
      .map(() => Array(BOARD_SIZE).fill(emptySlots, 0, BOARD_SIZE))
  );

  // return console.log(MATRIX);
};

const getRandomPosition = () => {
  const row = Math.floor(Math.random() * BOARD_SIZE);
  const column = Math.floor(Math.random() * BOARD_SIZE);

  return row, column;
};

const setBunnyPosition = () => {
 const {row,column} = getRandomPosition()

 MATRIX[row][column] = bunnySlot
};

const startGame = () => {
  createEmptyBoardMatrix();
  getRandomPosition();
};
startGame();

// const random = () =>{
// console.log(MATRIX.Math.floor(Math.random() * MATRIX.length));
// }

// console.log(MATRIX);

// setBunnyPosition()

// var a = ['a', 'b', 'c', 'd', 'e', 'f'];
// var randomValue = a[Math.floor(a.length * Math.random())];

// console.log(randomValue);

// console.log(Math.floor(Math.random() * 8 ));

// random()
