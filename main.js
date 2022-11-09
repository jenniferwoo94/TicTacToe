/* ----- Constant Variables -----*/
const lookup = {
    "1": "pink",
    "-1": "black",
    null: "white",
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

/* ----- Event Listeners ----- */
document.querySelector('table').addEventListener('click', handleMove);

/* ----- Functions ----- */
// initialize the board when the page loads
initialize();

// initialize all our state variables, sets the stage for our application
function initialize () {
    board = [null, null, null, null, null, null, null, null, null];
    turn = 1; 
    winner = null;
    render();
}

function render() {
    // run this function every time a player has made a move to render onto the DOM
}

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
    // render()
}