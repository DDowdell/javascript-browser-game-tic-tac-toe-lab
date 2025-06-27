//1) Define the required variables used to track the state of the game.
//2) Store cached element references.
//3) Upon loading, the game state should be initialized, and a function should 
//   be called to render this game state.
//4) The state of the game should be rendered to the user.
//5) Define the required constants.
//6) Handle a player clicking a square with a `handleClick` function.
//7) Create Reset functionality.

/*-------------------------------- Constants --------------------------------*/

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

/*---------------------------- Variables (state) ----------------------------*/

let turn = 'X';
let winner = 'false';
let tie = 'false';
let board = ['', '', '', '', '', '', '', '', ''];

/*------------------------ Cached Element References ------------------------*/

const messageEl = document.querySelector("#message");
const squareEls = document.querySelectorAll(".sqr");
const gameBoard = document.querySelector(".board");
const resetBtnEl = document.querySelector("#reset");

/*-------------------------------- Functions --------------------------------*/

function init() {
    messageEl.textContent = "Let's Play!";
    board = ['', '', '', '', '', '', '', '', ''];
    turn = 'X';
    winner = null;
    render();
    console.log('New Game');
};

function updateBoard() {
  board.forEach((square, index) => {
    if (square === "X") {
      squareEls[index].innerHTML = '<span class="lightning">⚡</span>';
    } else if (square === "O") {
      squareEls[index].innerHTML = '<span class="darkmark">🐍</span>';
    } else {
      squareEls[index].innerHTML = '';
    }
  });
}

function handleClick(event) {
    const squareIndex = event.target.id
    if (board[squareIndex] === 'X' || board[squareIndex] === 'O') {
        return
    } else if (winner === true) {
        return
    }

    placePiece(squareIndex);
    checkForWinner();
    switchPlayerTurn();
    checkForTie();
    updateMessage();
}

function placePiece(index) {
    board[index] = turn;
    updateBoard();
}

function checkForWinner() {
    winner = '';
    winningCombos.forEach((combo) => {
        if (!board[combo[0]]) return;
        if (board[combo[0]] === board[combo[1]] &&
            board[combo[0]] === board[combo[2]]) {
            winner = board[combo[0]];
        };
    });
    return winner;
};

function checkForTie() {
    if (winner) {
        return false;
    }

    const tie = board.every(space => space !== "");

    if (tie && !winner) {
        winner = "Tie";
        console.log("Its A Tie!");
    }
    return tie;
}

function switchPlayerTurn() {
    if (winner === true) {
        return;
    }
    if (turn === 'X') {
        turn = 'O';
    } else {
        turn = 'X';
    }
}

function updateMessage() {
  if (winner && winner !== "Tie") {
    let winnerName;
    if (winner === "X") {
      winnerName = "Harry";
    } else {
      winnerName = "Tom";
    }
    messageEl.textContent = winnerName + " Wins!";
  } else if (winner === "Tie") {
    messageEl.textContent = "It's A Tie!";
  } else {
    if (turn === "X") {
      messageEl.textContent = "Harry's Turn";
    } else {
      messageEl.textContent = "Tom's Turn";
    }
  }
}

function render() {
    updateBoard();
    updateMessage();
}

/*----------------------------- Event Listeners -----------------------------*/

gameBoard.addEventListener(
    'click', handleClick
)

resetBtnEl.addEventListener(
    'click', init
    
)


