

let currentPlayer = "X";

let gameEnded = false;

let options = ["", "", "", "", "", "", "", "", ""];

const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector(".game-status");
const restartBtn = document.querySelector(".game-restart");

restartBtn.addEventListener('click', restartGame);
statusText.innerHTML = `${currentPlayer}'s tur`;

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(cell => {
    cell.addEventListener("click", cellClicked)
});


function cellClicked(event) {
    const audio = document.querySelector("audio");
    audio.volume = 0.4;
    audio.play();
    if (gameEnded) {
        return;
    }
    const cellIndex = this.getAttribute("data-cell-index");
    if (options[cellIndex].length == 0) {
        cells[cellIndex].textContent = currentPlayer;
        options[cellIndex] = currentPlayer;
        checkWinner();
        if (!gameEnded) {
            changePlayer();
            statusText.innerHTML = `${currentPlayer}'s tur`;
        }
    }
}

function changePlayer() {
    if (currentPlayer == "X") {
        currentPlayer = "O";
    } else {
        currentPlayer = "X";
    }
}

function checkWinner() {

    for (let i = 0; i < winConditions.length; i++) {
        let winner = true;
        for (let j = 0; j < winConditions[i].length; j++) {
            if (options[winConditions[i][j]] != currentPlayer) {
                console.log(options[winConditions[i][j]]);
                winner = false;
            }
        }
        if (winner == true) {
            gameEnded = true;
            statusText.textContent = `${currentPlayer} vandt!`;
        }
    }
}

function restartGame() {
    cells.forEach(cell => {
        cell.textContent = "";
    });

    for (i in options) {
        options[i] = "";
    }
    currentPlayer = "X";

    statusText.innerHTML = `${currentPlayer}'s tur`;
    gameEnded = false;
}