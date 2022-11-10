/* ----- Constant Variables -----*/
const lookup = {
    "1": "X",
    "-1": "O",
    null: "",
};

const playerColor = {
    "1": "black",
    "-1": "pink",
}

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
// Set the state variables so that when the page loads, we have an initial setup/stage of the game
// Reset the game
let board, winner, turn;

/* ----- Cached Element References/Variables ----- */
// Create variables for DOM elements on the page that we're going to interact with more than once
const squareEls = document.querySelectorAll('td');
const playerEl = document.getElementById('playerTurn');
const winnerEl = document.getElementById('winnerMessage');

/* ----- Event Listeners ----- */
document.querySelector('table').addEventListener('click', handleMove);
document.querySelector('button').addEventListener('click', initialize);

/* ----- Functions ----- */
// Initialize the board when the page loads
initialize();

// Initialize all our state variables, sets the stage for our application
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

// Run this function everyt time a player has made a move to render onto the DOM
function render() {
    // Board variable index number-wise should correspond exactly with the board array
    board.forEach(function(sq, idx) {
    // sq represents the value (each one of the null values in board variable)
    // idx represents the index value (both the board variable and the squareEls variable)
        squareEls[idx].innerHTML = lookup[sq];
        squareEls[idx].style.color = playerColor[sq];
    });
    // Show on DOM which player's turn it is
    playerEl.textContent = lookup[turn];
    // Change between a black "X" and a pink "O" color 
    if (turn) playerEl.style.color = playerColor[turn];

    // Declare winner if found
    if (winner === 1) {
        winnerEl.textContent = "Black X Wins!";
        winnerEl.style.color = "black";
    } else if (winner === -1) {
        winnerEl.textContent = "Pink O Wins!";
    } else if (winner === "tie") {
        winnerEl.textContent = "Cat's Game!";
    } else {
        winnerEl.textContent = "";
    }
};

function handleMove(evt) {
    // Grab the value from the square clicked
    const idx = parseInt(evt.target.id.replace("sq", ''));
    // Check if the square has been clicked on
    if (board[idx] || winner) return;
    // Update the state variables
    board[idx] = turn;
    // Next player's turn
    turn *= -1;
    // Check every time a player makes a move to see if there is a winner
    winner = whoWon();
    // Render the state variable changes to the DOM
    render();
}

function whoWon() {
    for (let i = 0; i < winningCombos.length; i++) {
        if ( Math.abs( board[winningCombos[i][0]] + board[winningCombos[i][1]] + board[winningCombos[i][2]] ) === 3)
          return board[winningCombos[i][0]];
    }
    // Check if any null spaces; winner has not been found yet
    if (board.includes(null)) return null;
    // No more spaces and no winner; tie game
    return "tie";
}