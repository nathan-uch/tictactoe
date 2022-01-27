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
            console.log("Winner");
        };
    };
    
    //Event Listener for clicking on the board
    let cell = document.querySelectorAll(".cell");
    cell.forEach((button) => {
        button.addEventListener("click", () => {
            let btnIndex = button.id;
            checkTurn(btnIndex);
            GameBoard.renderContents();
            console.log(player1.getCount());
            console.log(player2.getCount());
            checkForWinner();
        });
    });
})();

const player1 = CreatePlayer("bob", "X", 0);
const player2 = CreatePlayer("mary", "O", 0);
