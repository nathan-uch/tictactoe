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

let player1 = CreatePlayer("Peter", "X", 0);
let player2 = CreatePlayer("Esther", "O", 0);

//Game Board Module 
const GameBoard = (function() {
    "use strict";

    let array = ["", "", "", "", "", "", "", "", ""];
    let cell = document.querySelectorAll(".cell");
    let player1Turn = document.querySelector('.player1Turn');
    let player2Turn = document.querySelector('.player2Turn');

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
                        cell[c].style.color = "#BDD7EE";
                    } else if (cell[c].textContent == "O"){
                        cell[c].style.color = "#C5E0B4";
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
                }
            };
        };
    };

    //check for winning 3-in-a-row marks at each index
    const checkForWinner = () => {
        if (player1.getCount() >= 3) {
            if (check3InArray(0, 1, 2) == 'xWins') {
                GameControl.p1Win();
            } else if (check3InArray(0, 3, 6) == 'xWins') {
                GameControl.p1Win();
            } else if (check3InArray(0, 4, 8) == 'xWins') {
                GameControl.p1Win();
            } else if (check3InArray(2, 5, 8) == 'xWins') {
                GameControl.p1Win();
            } else if (check3InArray(6, 7, 8) == 'xWins') {
                GameControl.p1Win();
            } else if (check3InArray(3, 4, 5) == 'xWins') {
                GameControl.p1Win();
            } else if (check3InArray(2, 4, 6) == 'xWins') {
                GameControl.p1Win();
            } else if (check3InArray(1, 4, 7) == 'xWins') {
                GameControl.p1Win();
            } else if (check3InArray(0, 1, 2) == 'oWins') {
                GameControl.p2Win();
            } else if (check3InArray(0, 3, 6) == 'oWins') {
                GameControl.p2Win();
            } else if (check3InArray(0, 4, 8) == 'oWins') {
                GameControl.p2Win();
            } else if (check3InArray(2, 5, 8) == 'oWins') {
                GameControl.p2Win();
            } else if (check3InArray(6, 7, 8) == 'oWins') {
                GameControl.p2Win();
            } else if (check3InArray(3, 4, 5) == 'oWins') {
                GameControl.p2Win();
            } else if (check3InArray(2, 4, 6) == 'oWins') {
                GameControl.p2Win();
            } else if (check3InArray(1, 4, 7) == 'oWins') {
                GameControl.p2Win();
            } else if (player1.getCount() == 5) {
                GameControl.announceTie();
            };
        };
    };

    const displayTurn = () => {
        if (player1.getCount() == 0 || player1.getCount() == player2.getCount()) {
            player1Turn.textContent = "It is " + player1.getName() + "'s turn.";
            player2Turn.textContent = "Please wait for " + player1.getName() + "'s turn.";
        } else if (player2.getCount() < player1.getCount()) {
            player2Turn.textContent = "It is " + player2.getName() + "'s turn.";
            player1Turn.textContent = "Please wait for " + player2.getName() + "'s turn.";
        };
    };

    const resetGame = () => {
        array = ["", "", "", "", "", "", "", "", ""];
        player1 = CreatePlayer("Paul", "X", 0)
        player2 = CreatePlayer("Tina", "O", 0)
        renderContents();
    };

    let resetBtn = document.querySelector('#resetBtn')
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
    let player1Turn = document.querySelector('.player1Turn');
    let player2Turn = document.querySelector('.player2Turn');

    const displayPlayerNames = () => {
        player1Name.textContent = "Player 1: " + player1.getName();
        player2Name.textContent = "Player 2: " + player2.getName();
        player1Turn.textContent = "It is " + player1.getName() + "'s turn.";
        player2Turn.textContent = "It is NOT " + player2.getName() + "'s turn.";
    }

    const checkTurn = (btnIndex) => {
        if ( player1.getCount() == 0 || player1.getCount() == player2.getCount() ) {
            GameBoard.addMarkToArray(btnIndex, player1);
        } else if ( player1.getCount() > player2.getCount() ) {
            GameBoard.addMarkToArray(btnIndex, player2);
        };
    };

    const p1Win = () => {
        player1Turn.textContent = "Congratulations " + player1.getName() + "! You won!";
        player2Turn.textContent = "You lost. Good try.";

    };

    const p2Win = () => {
        player1Turn.textContent = "You lost. Good try.";
        player2Turn.textContent = "Congratulations " + player2.getName() + "! You won!";
    }

    const announceTie = () => {
        player1Turn.textContent = "It's a tie! So close!";
        player2Turn.textContent = "It's a tie! So close!";
    }


    //Event Listener for clicking on the board
    let cell = document.querySelectorAll(".cell");
    cell.forEach((button) => {
        button.addEventListener("click", () => {
            let btnIndex = button.id;
            checkTurn(btnIndex);
            GameBoard.displayTurn();
            GameBoard.renderContents();
            GameBoard.checkForWinner();
        });
    });

    return {
        displayPlayerNames,
        p1Win,
        p2Win,
        announceTie,
    }
})();

GameControl.displayPlayerNames();
