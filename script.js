
// Board Object
// let gameBoard = (function() {
//     'use strict';

    let board = ["X", "", "O", "X", "X", "", "O", "O", ""];
    let cell = document.querySelectorAll(".cell");

    function renderBoard() {
        for (let c = 0; c < cell.length; c++) { //loop through each cell
            for (let i = 0; i < board.length; i++) { //loop through board array
                console.log(board[i]);
                if (board[i] == "X" && board.indexOf(board[i]) == cell[c].id) {
                    cell[c].textContent = "X";
                } else if (board[i] == "O" && board.indexOf(board[i]) == cell[c].id) {
                    cell[c].textContent = "O";
                };
            };
        };
    };

//     return {
//         board: board,
//         renderBoard
//     };
// })();

renderBoard();

var Cars = ["Nano", "Volvo", "BMW", "Nano", "VW", "Nano"];
function getAllIndexes(arr, val) {
    var indexes = [], i = -1;
    while ((i = arr.indexOf(val, i+1)) != -1){
        indexes.push(i);
    }
    return indexes;
}

var indexes = getAllIndexes(Cars, "Nano");