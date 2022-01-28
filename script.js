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



//Game Board Module 
const GameBoard = (function() {
    "use strict";

    let array = ["", "", "", "", "", "", "", "", ""];

    const addMarkToArray = (btnIndex, player) => {
        if (array[btnIndex] == "") {
            array[btnIndex] = player.getMark();
            player.updateTurnCount();
        };
    };

    const renderContents = () => {
        let cell = document.querySelectorAll(".cell");
        for ( let c = 0; c < cell.length; c++ ) { 
            for ( let i = 0; i < array.length; i++ ) { 
                if ( cell[c].id == i ) { 
                    cell[c].textContent = array[i];
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

    const getArray = () => {
        return array;
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

    return { 
        getArray,
        check3InArray,
        checkForWinner,
        renderContents,
        addMarkToArray
    };
})();

//Game Controller Module
const GameControl = (function() {
    "use strict";

    const checkTurn = (btnIndex) => {
        if ( player1.getCount() == 0 || player1.getCount() == player2.getCount() ) {
            GameBoard.addMarkToArray(btnIndex, player1);
        } else if ( player1.getCount() > player2.getCount() ) {
            GameBoard.addMarkToArray(btnIndex, player2);
        };
    };

    const p1Win = () => {
        alert("Congratulations, " + player1.getName() + " won!");
    };

    const p2Win = () => {
        alert("Congratulations, " + player2.getName() + " won!");
    }

    const announceTie = () => {
        alert("It's a tie! Close game!");
    }

    //Event Listener for clicking on the board
    let cell = document.querySelectorAll(".cell");
    cell.forEach((button) => {
        button.addEventListener("click", () => {
            let btnIndex = button.id;
            checkTurn(btnIndex);
            GameBoard.renderContents();
            GameBoard.checkForWinner();
        });
    });

    return {
        p1Win,
        p2Win,
        announceTie,
    }
})();

const player1 = CreatePlayer("peter", "X", 0);
const player2 = CreatePlayer("esther", "O", 0);
