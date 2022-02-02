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

    const changeName = (newName) => {
        name = newName;
    };

    return {
        getName: function() { return name },
        getMark: function() { return mark },
        getCount: function() { return count },
        updateTurnCount,
        changeName,
    };
};

let player1 = CreatePlayer("Player 1", "X", 0);
let player2 = CreatePlayer("Player 2", "O", 0);





//Game Board Module 
const GameBoard = (function() {
    "use strict";

    let array = ["", "", "", "", "", "", "", "", ""];
    let endGame = false;

    let cell = document.querySelectorAll(".cell");

    const getArray = () => {
        return array;
    };

    const addMarkToArray = (btnIndex, player) => {
        if (array[btnIndex] == "") {
            array[btnIndex] = player.getMark();
            player.updateTurnCount();
        };
    };

    const _resetCells = () => {
        for (let r = 0; r < cell.length; r++) {
            cell[r].id = r;
            cell[r].className = "cell";
        };
    };

    const renderContents = () => {
        for ( let c = 0; c < cell.length; c++ ) { 
            for ( let i = 0; i < array.length; i++ ) { 
                if ( cell[c].id == i ) { 
                    cell[c].textContent = array[i];
                    if (cell[c].textContent == "X") {
                        cell[c].className = 'xCell';
                        _checkForWinner();
                    } else if (cell[c].textContent == "O"){
                        cell[c].className = 'oCell';
                        _checkForWinner();
                    }
                };
            };
        };
    };

    const checkTurn = (endGame, btnIndex) => {
        if (endGame === false) {
            if ( player1.getCount() == 0 || player1.getCount() == player2.getCount() ) {
                GameBoard.addMarkToArray(btnIndex, player1);
                GameControl.displayTurn();
                GameBoard.renderContents();
            } else if ( player1.getCount() > player2.getCount() ) {
                GameBoard.addMarkToArray(btnIndex, player2);
                GameControl.displayTurn();
                GameBoard.renderContents();
            };
        } else if (endGame === true) {
            for (let u = 0; u < cell.length; u++) {
                cell[u].id = undefined;
            };
        };
    };

    const _check3InArray = (index1, index2, index3) => {
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
    const _checkForWinner = () => {
        if (player1.getCount() >= 3) {
            if (_check3InArray(0, 1, 2) == 'xWins') {
                GameControl.p1Win();
                GameControl.displayWinMarks(0, 1, 2);
                _gameHasEnded();
            } else if (_check3InArray(0, 3, 6) == 'xWins') {
                GameControl.p1Win();
                GameControl.displayWinMarks(0, 3, 6);
                _gameHasEnded();
            } else if (_check3InArray(0, 4, 8) == 'xWins') {
                GameControl.p1Win();
                GameControl.displayWinMarks(0, 4, 8);
                _gameHasEnded();
            } else if (_check3InArray(2, 5, 8) == 'xWins') {
                GameControl.p1Win();
                GameControl.displayWinMarks(2, 5, 8);
                _gameHasEnded();
            } else if (_check3InArray(6, 7, 8) == 'xWins') {
                GameControl.p1Win();
                GameControl.displayWinMarks(6, 7, 8);
                _gameHasEnded();
            } else if (_check3InArray(3, 4, 5) == 'xWins') {
                GameControl.p1Win();
                GameControl.displayWinMarks(3, 4, 5);
                _gameHasEnded();
            } else if (_check3InArray(2, 4, 6) == 'xWins') {
                GameControl.p1Win();
                GameControl.displayWinMarks(2, 4, 6);
                _gameHasEnded();
            } else if (_check3InArray(1, 4, 7) == 'xWins') {
                GameControl.p1Win();
                GameControl.displayWinMarks(1, 4, 7);
                _gameHasEnded();
            } else if (_check3InArray(0, 1, 2) == 'oWins') {
                GameControl.p2Win();
                GameControl.displayWinMarks(0, 1, 2);
                _gameHasEnded();
            } else if (_check3InArray(0, 3, 6) == 'oWins') {
                GameControl.p2Win();
                GameControl.displayWinMarks(0, 3, 6);
                _gameHasEnded();
            } else if (_check3InArray(0, 4, 8) == 'oWins') {
                GameControl.p2Win();
                GameControl.displayWinMarks(0, 4, 8);
                _gameHasEnded();
            } else if (_check3InArray(2, 5, 8) == 'oWins') {
                GameControl.p2Win();
                GameControl.displayWinMarks(2, 5, 8);
                _gameHasEnded();
            } else if (_check3InArray(6, 7, 8) == 'oWins') {
                GameControl.p2Win();
                GameControl.displayWinMarks(6, 7, 8);
                _gameHasEnded();
            } else if (_check3InArray(3, 4, 5) == 'oWins') {
                GameControl.p2Win();
                GameControl.displayWinMarks(3, 4, 5);
                _gameHasEnded();
            } else if (_check3InArray(2, 4, 6) == 'oWins') {
                GameControl.p2Win();
                GameControl.displayWinMarks(2, 4, 6);
                _gameHasEnded();
            } else if (_check3InArray(1, 4, 7) == 'oWins') {
                GameControl.p2Win();
                GameControl.displayWinMarks(1, 4, 7);
                _gameHasEnded();
            } else if (player1.getCount() == 5) {
                GameControl.announceTie();
                _gameHasEnded();
            };
        };
    };

    const _gameHasEnded = () => {
        endGame = true;
    };

    const _resetGameStatus = () => {
        endGame = false;
    };

    const addClicks = () => {
        cell.forEach((button) => {
            button.addEventListener("click", () => {
                let btnIndex = button.id;
                checkTurn(endGame, btnIndex);
            });
        });
    };

    const resetGame = () => {
        array = ["", "", "", "", "", "", "", "", ""];
        _resetGameStatus();
        _resetCells();
        addClicks();
        GameControl.resetDisplays;
        player1.updateTurnCount();
        player2.updateTurnCount();
        renderContents();
    };

    let resetBtn = document.querySelector('#restartBtn')
    resetBtn.addEventListener("click", () => {
        resetGame();
    });

    return { 
        getArray,
        renderContents, 
        addMarkToArray,
        resetGame,
        addClicks
    };

})();





//Game Controller Module
const GameControl = (function() {
    "use strict";

    let display = document.querySelector('.display');
    let cell = document.querySelectorAll(".cell");
    let arrowLeft1 = document.querySelector('.arrowLeft1');
    let arrowLeft2 = document.querySelector('.arrowLeft2');
    let namesBtn = document.querySelector('.renameBtn');
    let namesForm = document.querySelector('.namesForm');
    let closeFormBtn = document.querySelector('.closeForm');
    let player1Name = document.querySelector('.player1');
    let player2Name = document.querySelector('.player2');
    let startGame = document.querySelector('.start');

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

    const _displayPlayerNames = () => {
        player1Name.textContent = player1.getName();
        player2Name.textContent = player2.getName();
        display.textContent = "Click the board to begin"
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

    const displayWinMarks = (id1, id2, id3) => {
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

    const _openForm = () => {
        namesForm.style.display = "flex";
    };

    const _closeForm = () => {
        namesForm.style.display = "none";
    };

    const resetDisplays = () => {
        _displayPlayerNames();
        arrowLeft1.style.visibility = "visible";
        arrowLeft2.style.visibility = "hidden";
    }   

    //Event Listener: Changing names
    namesBtn.addEventListener("click", () => {
        _openForm();
    });

    closeFormBtn.addEventListener("click", () => {
        _closeForm();
    });

    startGame.addEventListener("click", () => {
        let p1NewName = document.getElementById('p1InputName').value;
        let p2NewName = document.getElementById('p2InputName').value;
        player1.changeName(p1NewName);
        player2.changeName(p2NewName);
        player1Name.textContent = p1NewName;
        player2Name.textContent = p2NewName;
        GameBoard.resetGame();
        player1.updateTurnCount();
        player2.updateTurnCount();
        _closeForm();
    });
    
    return {
        displayTurn,
        p1Win,
        p2Win,
        announceTie,
        displayWinMarks,
        resetDisplays,
    }
})();

GameBoard.addClicks();
