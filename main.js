/* ----- Constant Variables -----*/
const lookup = {
    "1": "X",
    "-1": "O",
    null: "",
};

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2],
]

/* ----- State Variables ----- */
// set the state variables so that when the page loads, we have an initial setup/stage of the game
// reset the game
let board, winner, turn;

/* ----- Cached Element References/Variables ----- */
// creating variables for DOM elements on the page that we're going to interact with more than once
const squareEls = document.querySelectorAll('td');
const playerEl = document.getElementById('playerTurn');

/* ----- Event Listeners ----- */
document.querySelector('table').addEventListener('click', handleMove);
document.querySelector('button').addEventListener('click', initialize);

/* ----- Functions ----- */
// initialize the board when the page loads
initialize();

// initialize all our state variables, sets the stage for our application
function initialize () {
    board = [null, null, null,
            null, null, null,
            null, null, null];
            /* Game grid is represented in the array as follows:
            [0] [1] [2]
            [3] [4] [5]
            [6] [7] [8]
            */
    turn = 1; 
    winner = null;
    render();
}

// run this function everyt time a player has made a move to render onto the DOM
function render() {
    // board variable index number-wise should correspond exactly with the board array
    board.forEach(function(sq, idx) {
    // sq represents the value (each one of the null values in board variable)
    // idx represents the index value (both the board variable and the squareEls variable)
        squareEls[idx].innerHTML = lookup[sq];
    });

};

function handleMove(evt) {
    // grab the value from the square clicked
    const idx = parseInt(evt.target.id.replace("sq", ''));
    // check if the square has been clicked on
    if (board[idx]) return;
    // update the state variables
    board[idx] = turn;
    // next player's turn
    turn *= -1;
    // render the state variable changes to the DOM
    render();
}