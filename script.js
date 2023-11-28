// Time to make this Tic-Tac-Toe game!
// Plan:
// 1) Create a 3x3 grid
//// - Player should be able to click on one of the grid blocks and an 'X' or 'O' should appear depending on the symbol they chose
//// - After clicking, CPU/2nd player should fill in an empty grid block afterwards
// 2) Check game condition for win/loss/tie
// 3) Reset grid once result is determined

// Element variables
// Part of main div
let gameTitle = document.createElement('h1');
let container = document.createElement('div');
let btnContainer = document.createElement('div');
let info = document.createElement('p');

// Reset button
let btnReset = document.createElement('button');

// Footer
let footer = document.createElement('footer');

let gridBlock = document.createElement('div');

// Giving IDs to select elements
container.setAttribute('id', 'container');
info.setAttribute('id', 'info');
btnContainer.setAttribute('id', 'divButton');
btnReset.setAttribute('id', 'reset');


document.body.appendChild(container);
document.body.appendChild(info);

// Default states
reset.disabled = true;
let infoText = `Begin play! Player ${playerWhoStarts}\'s turn!`
info.textContent = infoText;


// Player variables
let playerOneTurn = true;
let playerTwoTurn = false;
let xCount = 0;
let oCount = 0;
let cpuTurn = false; // Plan for CPU later on

// Grid blocks list (to be resetted after every reset)
let gridBlocksList = [];

// Changes accordingly depending on who starts
if (playerWhoStarts === 1) {
    playerOneTurn = true;
    playerTwoTurn = false;
} else if (playerWhoStarts === 2) {
    playerOneTurn = false;
    playerTwoTurn = true;
}

// function placeX(e) {
//     if (e.type === 'mouseup'){
//         e.target.textContent = 'X';
//     }
// }

// function placeO(e) {
//     if (e.type === 'mouseup') {
//         e.target.textContent = 'O';
//     }
// }

// window.onload = function() {
//     alert('test');
// };
// Credit: https://www.javascripttutorial.net/dom/manipulating/remove-all-child-nodes/
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

// function resetGrid(list) {
//     for(let i = 0; i < list.length; i++) {
//        list[i].textContent = '';
//     }
// }

function disableSymbolPlacement() {
    for (let i = 0; i < gridBlocksList.length; i++) {
        document.getElementById(`block${i+1}`).removeEventListener('mouseup',placeSymbol);
    }
}

function updateInfo() {
    if (playerOneTurn && reset.disabled === true) {
        info.textContent = 'Player 1\'s turn';
    } else if (playerTwoTurn && reset.disabled === true) {
        info.textContent = 'Player 2\'s turn';
    };
}

function placeSymbol(e) {
    if (playerOneTurn && e.target.textContent === '' && e.button === 0) {
        e.target.textContent = 'X';
        xCount += 1;
        checkForWin();
        checkForTie();
        playerTwoTurn = true;
        playerOneTurn = false;
        updateInfo();
    } else if (playerTwoTurn && e.target.textContent === '' && e.button === 0) {
        e.target.textContent = 'O';
        oCount += 1;
        checkForWin();
        checkForTie();
        playerTwoTurn = false;
        playerOneTurn = true;
        updateInfo();
    } else {
        alert('Please click an empty block.');
    }
}

function createGrid() {
    if (container.hasChildNodes() === false) {
        for(let i = 0; i < 9; i++) {
            // Create the grid blocks
            gridBlock = document.createElement('div')
            gridBlock.setAttribute('id', `block${i+1}`);

            // Moved styles here since they're all IDs
            gridBlock.style.border = '2px solid black';
            gridBlock.style.textAlign = 'center';
            gridBlock.style.paddingTop = '20px';
            gridBlock.style.fontSize = '75px';

            // Place appropriate symbol when clicked
            gridBlock.addEventListener('mouseup', placeSymbol);
            // gridBlock.addEventListener('mouseup', placeX);
            // gridBlock.addEventListener('mouseup', placeO);
            

            container.appendChild(gridBlock);
        }
        gridBlocksList = Array.from(container.childNodes);
    }
}

function checkForWin() {    
    if (playerOneTurn) {
        // Horizontal wins
        if (gridBlocksList[0].textContent === 'X' && gridBlocksList[1].textContent === 'X' && gridBlocksList[2].textContent === 'X') {
            info.textContent = `Player 1 won!`;
            reset.disabled = false;
            disableSymbolPlacement();
        } else if (gridBlocksList[3].textContent === 'X' && gridBlocksList[4].textContent === 'X' && gridBlocksList[5].textContent === 'X') {
            info.textContent = `Player 1 won!`;
            reset.disabled = false;
            disableSymbolPlacement();
        } else if (gridBlocksList[6].textContent === 'X' && gridBlocksList[7].textContent === 'X' && gridBlocksList[8].textContent === 'X') {
            info.textContent = `Player 1 won!`;
            reset.disabled = false;
            disableSymbolPlacement();

        // Vertical wins
        } else if (gridBlocksList[0].textContent === 'X' && gridBlocksList[3].textContent === 'X' && gridBlocksList[6].textContent === 'X') {
            info.textContent = `Player 1 won!`;
            reset.disabled = false;
            disableSymbolPlacement();
        } else if (gridBlocksList[1].textContent === 'X' && gridBlocksList[4].textContent === 'X' && gridBlocksList[7].textContent === 'X') {
            info.textContent = `Player 1 won!`;
            reset.disabled = false;
            disableSymbolPlacement();
        } else if (gridBlocksList[2].textContent === 'X' && gridBlocksList[5].textContent === 'X' && gridBlocksList[8].textContent === 'X') {
            info.textContent = `Player 1 won!`;
            reset.disabled = false;
            disableSymbolPlacement();

        // Diagonal win
        } else if (gridBlocksList[0].textContent === 'X' && gridBlocksList[4].textContent === 'X' && gridBlocksList[8].textContent === 'X') {
            info.textContent = `Player 1 won!`;
            reset.disabled = false;
            disableSymbolPlacement();
        } else if (gridBlocksList[2].textContent === 'X' && gridBlocksList[4].textContent === 'X' && gridBlocksList[6].textContent === 'X') {
            info.textContent = `Player 1 won!`;
            reset.disabled = false;
            disableSymbolPlacement();
        }
    } else if (playerTwoTurn) {
        // Horizontal wins
        if (gridBlocksList[0].textContent === 'O' && gridBlocksList[1].textContent === 'O' && gridBlocksList[2].textContent === 'O') {
            info.textContent = `Player 2 won!`;
            reset.disabled = false;
            disableSymbolPlacement();
        } else if (gridBlocksList[3].textContent === 'O' && gridBlocksList[4].textContent === 'O' && gridBlocksList[5].textContent === 'O') {
            info.textContent = `Player 2 won!`;
            reset.disabled = false;
            disableSymbolPlacement();
        } else if (gridBlocksList[6].textContent === 'O' && gridBlocksList[7].textContent === 'O' && gridBlocksList[8].textContent === 'O') {
            info.textContent = `Player 2 won!`;
            reset.disabled = false;
            disableSymbolPlacement();

        // Vertical wins
        } else if (gridBlocksList[0].textContent === 'O' && gridBlocksList[3].textContent === 'O' && gridBlocksList[6].textContent === 'O') {
            info.textContent = `Player 2 won!`;
            reset.disabled = false;
            disableSymbolPlacement();
        } else if (gridBlocksList[1].textContent === 'O' && gridBlocksList[4].textContent === 'O' && gridBlocksList[7].textContent === 'O') {
            info.textContent = `Player 2 won!`;
            reset.disabled = false;
            disableSymbolPlacement();
        } else if (gridBlocksList[2].textContent === 'O' && gridBlocksList[5].textContent === 'O' && gridBlocksList[8].textContent === 'O') {
            info.textContent = `Player 2 won!`;
            reset.disabled = false;
            disableSymbolPlacement();

        // Diagonal wins
        } else if (gridBlocksList[0].textContent === 'O' && gridBlocksList[4].textContent === 'O' && gridBlocksList[8].textContent === 'O') {
            info.textContent = `Player 2 won!`;
            reset.disabled = false;
            disableSymbolPlacement();
        } else if (gridBlocksList[2].textContent === 'O' && gridBlocksList[4].textContent === 'O' && gridBlocksList[6].textContent === 'O') {
            info.textContent = `Player 2 won!`;
            reset.disabled = false;
            disableSymbolPlacement();
        // } else if (gridBlocksList.length === 9) {
        //     info.textContent = 'It\'s a tie!';
        //     reset.disabled = false;
        // }
        }
    }
}

function checkForTie() {
    if (xCount === 5 || oCount === 5) {
        info.textContent = 'It\'s a tie!';
        reset.disabled = false;
    }
}

createGrid();

reset.addEventListener('click', function() {
    playerOneTurn = true;
    playerTwoTurn = false;
    xCount = 0;
    oCount = 0;
    reset.disabled = true;
    removeAllChildNodes(container);
    playerWhoStarts = +prompt('Who starts this time? (type 1 or 2)');
    info.textContent = `Game has reset. Player ${playerWhoStarts}'s turn!`   
    gridBlocksList.splice(0, gridBlocksList.length);
    createGrid();
});



