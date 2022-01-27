//Player Factory 
//this factory will objects for each player with mark of X or O and will add marks to the array
//this will also be used for the computer player
const CreatePlayer = (name, mark, count) => {
    this.name = name;
    this.mark = mark;
    this.count = count;

    const addMarkToArray = (btnIndex) => {
        if ( GameBoard.array[btnIndex] == "" ) {
            GameBoard.array[btnIndex] = mark;
            updateCount();
        };
    };

    const updateCount = () => {
        count = 0;
        for ( let a = 0; a < GameBoard.array.length; a++ ) {
            if ( GameBoard.array[a] == mark ) {
                count++;
            };
        };
    };

    return {
        name,
        getCount: function() { return count },
        addMarkToArray,
    };
};

//Game Board Module 
//this module create the board array and render the board
const GameBoard = (function() {
    "use strict";

    let array = ["", "", "", "", "", "", "", "", ""];

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

    return { 
        array,
        renderContents
    };
})();

//Game Controller Module
//this module will check different variables each turn
const GameControl = (function() {
    "use strict";

    const checkTurn = (btnIndex) => {
        if ( player1.getCount() == 0 || player1.getCount() == player2.getCount() ) {
            player1.addMarkToArray(btnIndex);
        } else if ( player1.getCount() > player2.getCount() ) {
            player2.addMarkToArray(btnIndex);
        };
    };

    const checkForWinner = () => {
        if (player1.getCount() >= 3 || player2.getCount() >= 3) {
            if (GameBoard.array[0] == "X" && GameBoard.array[1] == "X" && GameBoard.array[2] == "X") {
                p1Win();
            } else if (GameBoard.array[0], GameBoard.array[3] == "X" && GameBoard.array[6] == "X") {
                p1Win();
            } else if (GameBoard.array[0] == "X" && GameBoard.array[4] == "X" && GameBoard.array[8] == "X") {
                p1Win();
            } else if (GameBoard.array[2] == "X" && GameBoard.array[5] == "X" && GameBoard.array[8] == "X") {
                p1Win();
            } else if (GameBoard.array[6] == "X" && GameBoard.array[7] == "X" && GameBoard.array[8] == "X") {
                p1Win();
            } else if (GameBoard.array[3] == "X" && GameBoard.array[4] == "X" && GameBoard.array[5] == "X") {
                p1Win();
            } else if (GameBoard.array[2] == "X" && GameBoard.array[4] == "X" && GameBoard.array[6] == "X") {
                p1Win();
            } else if (GameBoard.array[1] == "X" && GameBoard.array[4] == "X" && GameBoard.array[7] == "X") {
                p1Win();
            } else if (GameBoard.array[0] == "O" && GameBoard.array[1] == "O" && GameBoard.array[2] == "O") {
                p2Win();
            } else if (GameBoard.array[0] == "O" && GameBoard.array[3] == "O" && GameBoard.array[6] == "O") {
                p2Win();
            } else if (GameBoard.array[0] == "O" && GameBoard.array[4] == "O" && GameBoard.array[8] == "O") {
                p2Win();
            } else if (GameBoard.array[2] == "O" && GameBoard.array[5] == "O" && GameBoard.array[8] == "O") {
                p2Win();
            } else if (GameBoard.array[6] == "O" && GameBoard.array[7] == "O" && GameBoard.array[8] == "O") {
                p2Win();
            } else if (GameBoard.array[3] == "O" && GameBoard.array[4] == "O" && GameBoard.array[5] == "O") {
                p2Win();
            } else if (GameBoard.array[2] == "O" && GameBoard.array[4] == "O" && GameBoard.array[6] == "O") {
                p2Win();
            } else if (GameBoard.array[1] == "O" && GameBoard.array[4] == "O" && GameBoard.array[7] == "O") {
                p2Win();
            } else if (player1.getCount() == 5) {
                announceTie();
            };
        };
    };
    
    
    const p1Win = () => {
        alert("Congratulations, " + player1.name + " won!");
    };

    const p2Win = () => {
        alert("Congratulations, " + player2.name + " won!");
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
            checkForWinner();
        });
    });
})();

const player1 = CreatePlayer("nina", "X", 0);
const player2 = CreatePlayer("nathan", "O", 0);
