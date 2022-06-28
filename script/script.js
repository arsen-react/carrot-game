const BOARD_SIZE = 8;
const MATRIX = [];

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

MATRIX.push(
  Array(BOARD_SIZE)
    .fill()
    .map(() => Array(BOARD_SIZE).fill())
);
console.log(MATRIX, "asdasda");

// console.log(Array(9).fill().map(()=>Array(9).fill()));
