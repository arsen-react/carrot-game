// const BOARD_SIZE = 8;
// let board = "";

// // const create = () => {
// for (let i = 0; i < BOARD_SIZE; i++) {
  
//     if (i === 8) {
//         board += "\n";
//     } else {
//       board += "#";
    
//     }
//     console.log(board);
//   }

// // };

// const parent = document.getElementById('root');

// const divCreate = document.createElement("div");
// divCreate.classList.add('asd')
// parent.appendChild(divCreate)

var table = document.createElement("table");
for (var i = 1; i < 9; i++) {
    var tr = document.createElement('tr');
    for (var j = 1; j < 9; j++) {
        var td = document.createElement('td');
        if (i%2 == j%2) {
            td.className = "white";
        } else {
            td.className = "black";
        }
        tr.appendChild(td);
    }
    table.appendChild(tr);
}
document.body.appendChild(table);

