//Player Factory 
const CreatePlayer = (name, mark, count) => {
    this.name = name;
    this.mark = mark;
    this.count = count;

    const updateTurnCount = () => {
        count = 0;
        for ( let a = 0; a < GameBoard.getArray().length; a++ ) {
            if ( GameBoard.getArray()[a] == mark ) {
                count++;
            };
        };
    };

    return {
        getName: function() { return name },
        getMark: function() { return mark },
        getCount: function() { return count },
        updateTurnCount
    };
};

let player1 = CreatePlayer("Player 1", "X", 0);
let player2 = CreatePlayer("Player 2", "O", 0);

//Game Board Module 
const GameBoard = (function() {
    "use strict";

    let array = ["", "", "", "", "", "", "", "", ""];
    let cell = document.querySelectorAll(".cell");
    let display = document.querySelector('.display');
    let arrowLeft1 = document.querySelector('.arrowLeft1');
    let arrowLeft2 = document.querySelector('.arrowLeft2');

    const getArray = () => {
        return array;
    };

    const addMarkToArray = (btnIndex, player) => {
        if (array[btnIndex] == "") {
            array[btnIndex] = player.getMark();
            player.updateTurnCount();
        };
    };

    const renderContents = () => {
        for ( let c = 0; c < cell.length; c++ ) { 
            for ( let i = 0; i < array.length; i++ ) { 
                if ( cell[c].id == i ) { 
                    cell[c].textContent = array[i];
                    if (cell[c].textContent == "X") {
                        cell[c].className = 'xCell';
                        checkForWinner();
                    } else if (cell[c].textContent == "O"){
                        cell[c].className = 'oCell';
                        checkForWinner();
                    }
                };
            };
        };
    };

    const check3InArray = (index1, index2, index3) => {
        if (index1 !== undefined && index2 !== undefined && index3 !== undefined) { //checks if parameters exist
            if (array[index1] != '' && array[index2] != '' && array[index3] != '') { //checks if array at indexes is marked
                if (array[index1] == "X" && array[index2] == "X" && array[index3] == "X") { //checks contents of array at each index
                    return 'xWins'; 
                } else if (array[index1] == "O" && array[index2] == "O" && array[index3] == "O") {
                    return 'oWins';
                };
            };
        };
    };

    //check for winning 3-in-a-row marks at each index
    const checkForWinner = () => {
        if (player1.getCount() >= 3) {
            if (check3InArray(0, 1, 2) == 'xWins') {
                GameControl.p1Win();
                GameControl.showWinMarks(0, 1, 2);
            } else if (check3InArray(0, 3, 6) == 'xWins') {
                GameControl.p1Win();
                GameControl.showWinMarks(0, 3, 6);
            } else if (check3InArray(0, 4, 8) == 'xWins') {
                GameControl.p1Win();
                GameControl.showWinMarks(0, 4, 8);
            } else if (check3InArray(2, 5, 8) == 'xWins') {
                GameControl.p1Win();
                GameControl.showWinMarks(2, 5, 8);
            } else if (check3InArray(6, 7, 8) == 'xWins') {
                GameControl.p1Win();
                GameControl.showWinMarks(6, 7, 8);
            } else if (check3InArray(3, 4, 5) == 'xWins') {
                GameControl.p1Win();
                GameControl.showWinMarks(3, 4, 5);
            } else if (check3InArray(2, 4, 6) == 'xWins') {
                GameControl.p1Win();
                GameControl.showWinMarks(2, 4, 6);
            } else if (check3InArray(1, 4, 7) == 'xWins') {
                GameControl.p1Win();
                GameControl.showWinMarks(1, 4, 7);
            } else if (check3InArray(0, 1, 2) == 'oWins') {
                GameControl.p2Win();
                GameControl.showWinMarks(0, 1, 2);
            } else if (check3InArray(0, 3, 6) == 'oWins') {
                GameControl.p2Win();
                GameControl.showWinMarks(0, 3, 6);
            } else if (check3InArray(0, 4, 8) == 'oWins') {
                GameControl.p2Win();
                GameControl.showWinMarks(0, 4, 8);
            } else if (check3InArray(2, 5, 8) == 'oWins') {
                GameControl.p2Win();
                GameControl.showWinMarks(2, 5, 8);
            } else if (check3InArray(6, 7, 8) == 'oWins') {
                GameControl.p2Win();
                GameControl.showWinMarks(6, 7, 8);
            } else if (check3InArray(3, 4, 5) == 'oWins') {
                GameControl.p2Win();
                GameControl.showWinMarks(3, 4, 5);
            } else if (check3InArray(2, 4, 6) == 'oWins') {
                GameControl.p2Win();
                GameControl.showWinMarks(2, 4, 6);
            } else if (check3InArray(1, 4, 7) == 'oWins') {
                GameControl.p2Win();
                GameControl.showWinMarks(1, 4, 7);
            } else if (player1.getCount() == 5) {
                GameControl.announceTie();
            };
        };
    };

    const displayTurn = () => {
        if (player1.getCount() == 0 || player1.getCount() == player2.getCount()) {
            display.textContent = "It is " + player1.getName() + "'s turn.";
            arrowLeft1.style.visibility = "visible";
            arrowLeft2.style.visibility = "hidden";
        } else if (player2.getCount() < player1.getCount()) {
            display.textContent = "It is " + player2.getName() + "'s turn.";
            arrowLeft2.style.visibility = "visible";
            arrowLeft1.style.visibility = "hidden";
        };
    };

    const resetGame = () => {
        array = ["", "", "", "", "", "", "", "", ""];
        renderContents();
        GameControl.openForm();
    };

    let resetBtn = document.querySelector('#restartBtn')
    resetBtn.addEventListener("click", () => {
        resetGame();
        GameControl.displayPlayerNames();
    });

    return { 
        getArray,
        check3InArray,
        checkForWinner,
        renderContents,
        addMarkToArray,
        displayTurn
    };

})();

//Game Controller Module
const GameControl = (function() {
    "use strict";

    let player1Name = document.querySelector(".player1Name");
    let player2Name = document.querySelector(".player2Name");
    let display = document.querySelector('.display');
    let cell = document.querySelectorAll(".cell");
    let arrowLeft1 = document.querySelector('.arrowLeft1');
    let arrowLeft2 = document.querySelector('.arrowLeft2');
    let namesBtn = document.querySelector('.changeNameBtn');
    let namesForm = document.querySelector('.namesForm');
    let closeFormBtn = document.querySelector('.closeForm');
    
    const displayPlayerNames = () => {
        player1Name.textContent = player1.getName();
        player2Name.textContent = player2.getName();
        display.textContent = "Click the board to begin"
    };

    const checkTurn = (btnIndex) => {
        if ( player1.getCount() == 0 || player1.getCount() == player2.getCount() ) {
            GameBoard.addMarkToArray(btnIndex, player1);
            GameBoard.displayTurn();
            GameBoard.renderContents();
        } else if ( player1.getCount() > player2.getCount() ) {
            GameBoard.addMarkToArray(btnIndex, player2);
            GameBoard.displayTurn();
            GameBoard.renderContents();
        };
    };

    const p1Win = () => {
        display.textContent = "Congratulations " + player1.getName() + "! You won!";
        arrowLeft2.style.visibility = "hidden";
    };

    const p2Win = () => {
        display.textContent = "Congratulations " + player2.getName() + "! You won!";
        arrowLeft1.style.visibility = "hidden";
    };

    const announceTie = () => {
        display.textContent = "It's a tie! So close!";
        arrowLeft1.style.visibility = "hidden";
        arrowLeft2.style.visibility = "hidden";
    };

    const showWinMarks = (id1, id2, id3) => {
        for (let q = 0; q < cell.length; q++) {
            if (cell[q].id == id1) {
                cell[q].className = "redCell";
                continue;
            } else if (cell[q].id == id2) {
                cell[q].className = "redCell";
                continue;
            } else if (cell[q].id == id3) {
                cell[q].className = "redCell";
                break;
            };
        };
    };

    const openForm = () => {
        namesForm.style.display = "flex";
    };

    const closeForm = () => {
        namesForm.style.display = "none";
    }

    //Event Listener for clicking on the board
    cell.forEach((button) => {
        button.addEventListener("click", () => {
            let btnIndex = button.id;
            checkTurn(btnIndex);
        });
    });

    //Event Listener for changing names form
    namesBtn.addEventListener("click", () => {
        openForm();
    });

    closeFormBtn.addEventListener("click", () => {
        closeForm();
    });

    return {
        displayPlayerNames,
        p1Win,
        p2Win,
        announceTie,
        showWinMarks,
        openForm,
        closeForm
    }
})();

GameControl.displayPlayerNames();
