//Player Factory 
//this factory will objects for each player with mark of X or O
//this will also be used for the computer player
const CreatePlayer = (name, mark) => {
    this.name = name;
    this.mark = mark;
    
    return {
        name,
        mark
    };
};

//Game Board Module 
//this module create the board array and render the board
const GameBoard = (function() {
    'use strict';

    let array = ["X", "", "", "O", "", "", "", "", ""];

    function arrayBoard() {
        return array;
    }

    const renderContents = () => {
        let cell = document.querySelectorAll(".cell");
        for (let c = 0; c < cell.length; c++) { 
            for (let i = 0; i < arrayBoard.length; i++) { 
                if (cell[c].id == i) { 
                    cell[c].textContent = arrayBoard[i];
                };
            };
        };
    };

    return { 
        arrayBoard: arrayBoard,
        renderContents
    };
})();

//Game Controller Module
//this module will check different variables each turn
const GameControl = (function() {
    'use strict';

    //Event Listener for clicking on the board
    let cell = document.querySelectorAll(".cell");
    let index;
    let xCount;
    let oCount;

    const checkTurn = () => {
        for (let c = 0; c > GameBoard.arrayBoard.length; c++) {
            if (GameBoard.arrayBoardray[c] == "X") {
                xCount++;
            } else if (GameBoard.arrayBoardray[c] == "O") {
                oCount++;
            };
        };
    };

    const checkExistingMarks = () => {
    };

    const addMarkToArray = (index, xCount, oCount) => {
        if (xCount == 0 || xCount == oCount ) {
            GameBoard.arrayBoard[index] = 'X';
        } else if (oCount < xCount) {
            GameBoard.arrayBoard[index] = 'O';
        };
    };

    const checkWinner = () => {
    };

    cell.forEach((button) => {
        button.addEventListener('click', () => {
            index = button.id;
            checkTurn;
            //checkExistingMarks;
            addMarkToArray(index);
            GameBoard.renderContents();
            //this.checkWinner;
        });
    });

    return {
    }

})();


const player1 = CreatePlayer('bob', 'X');
const player2 = CreatePlayer('mary', 'O');
