// Time to make this Tic-Tac-Toe game!
// Plan:
// 1) Create a 3x3 grid
//// - Player should be able to click on one of the grid blocks and an 'X' or 'O' should appear depending on the symbol they chose
//// - After clicking, CPU/2nd player should fill in an empty grid block afterwards
// 2) Check game condition for win/loss/tie
// 3) Reset grid once result is determined

// Player variables
let playerOneTurn = false;
let playerTwoTurn = false;
let playerWhoStarts = 0;
let xCount = 0;
let oCount = 0;
let cpuTurn = false; // Plan for CPU later on

// Dark/light mode variables
let onDarkMode = false;
let onLightMode = true;

// Grid blocks list (to be resetted after every reset)
let gridBlocksList = [];

// Element variables
// // // // // // // // // //
//    STARTING ELEMENTS    //
// // // // // // // // // //
const startDiv = document.createElement('div');
const startBtnContainer = document.createElement('div');
const startTitle = document.createElement('h1');
const startText = document.createElement('p');
const startPlayerOne = document.createElement('button');
const startPlayerTwo = document.createElement('button');
const startPlayerOneTop = document.createElement('span');
const startPlayerTwoTop = document.createElement('span');
const startFooterContainer = document.createElement('div');
const startFooter = document.createElement('footer');
const startBtnDarkOrLightMode = document.createElement('button');
const startBtnDarkOrLightModeTop = document.createElement('span');

startDiv.setAttribute('id','startDiv');
startBtnContainer.setAttribute('id', 'startBtnContainer');

startTitle.textContent = 'Tic-Tac-Toe!';
startTitle.setAttribute('id','startTitle');

startText.textContent = 'Who will go first?';
startText.setAttribute('id', 'startText');

// startPlayerOne.textContent = 'Player 1 (X)';
startPlayerOneTop.textContent = 'Player 1 (X)';
startPlayerOneTop.setAttribute('class', 'button_top');

// startPlayerTwo.textContent = 'Player 2 (O)';
startPlayerTwoTop.textContent = 'Player 2 (O)';
startPlayerTwoTop.setAttribute('class', 'button_top');

startFooterContainer.setAttribute('id', 'startFooterContainer');
startFooter.textContent = 'Made by andydingus';
startFooter.setAttribute('id', 'startFooter');

startBtnDarkOrLightMode.setAttribute('class', 'no-stretch');
startBtnDarkOrLightModeTop.textContent = 'Dark Mode'; //Temp title, will be changed into a "lightswitch"
startBtnDarkOrLightModeTop.setAttribute('class', 'button_top');

// // // // // // // // // 
//  GAME PAGE ELEMENTS  //
// // // // // // // // //
// Part of main div
const gameMain = document.createElement('div');
const gameTitle = document.createElement('h1');
const gameContainer = document.createElement('div');
const gameBtnContainer = document.createElement('div');
const gameInfo = document.createElement('p');
const gameBtnReset = document.createElement('button');
const gameBtnResetTop = document.createElement('span');
const gameBtnDarkOrLightMode = document.createElement('button');
const gameBtnDarkOrLightModeTop = document.createElement('span');
const gameFooterContainer = document.createElement('div');
const gameFooter = document.createElement('footer');

// Can't be const since it will be duplicated 
let gridBlock = document.createElement('div');

// Giving IDs to select elements
gameMain.setAttribute('id', 'gameMain');
gameContainer.setAttribute('id', 'gameContainer');
gameInfo.setAttribute('id', 'gameInfo');
gameBtnContainer.setAttribute('id', 'divButton');
gameFooterContainer.setAttribute('id', 'gameFooterContainer');
gameBtnReset.setAttribute('id', 'reset');

// Classes to elements
gameBtnResetTop.setAttribute('class', 'button_top')
gameBtnDarkOrLightMode.setAttribute('class', 'no-stretch')
gameBtnDarkOrLightModeTop.setAttribute('class', 'button_top');

// Applying text to select elements
gameTitle.textContent = 'Tic-Tac-Toe!';
gameBtnResetTop.textContent = 'Reset Game';
gameFooter.textContent = 'Made by andydingus';
gameBtnDarkOrLightModeTop.textContent = 'Dark Mode';

// Event listeners for the buttons
startPlayerOne.addEventListener('mouseup', function() {
    playerWhoStarts = 1;
    startGame();
});
startPlayerTwo.addEventListener('mouseup', function() {
    playerWhoStarts = 2;
    startGame();
});
startBtnDarkOrLightMode.addEventListener('mouseup', activateDarkOrLightMode);
gameBtnDarkOrLightMode.addEventListener('mouseup', activateDarkOrLightMode);

// Changes accordingly depending on who starts
function checkPlayerTurn() {
    if (playerWhoStarts === 1) {
        playerOneTurn = true;
        playerTwoTurn = false;
    } else if (playerWhoStarts === 2) {
        playerOneTurn = false;
        playerTwoTurn = true;
    }
}

// Credit: https://www.javascripttutorial.net/dom/manipulating/remove-all-child-nodes/
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function activateDarkOrLightMode() {
    // Ensures all of the font becomes readable, whether it is dark or light mode
    if (onLightMode) {
        document.body.style.backgroundColor = '#352F44';
        document.body.style.color = '#FAF0E6';

        // Change button styles
        startBtnDarkOrLightModeTop.textContent = 'Light Mode';
        gameBtnDarkOrLightModeTop.textContent = 'Light Mode';

        // Grid styles
        gameContainer.style.boxShadow = '0 0 10px 10px #FAF0E6';
        for (let i = 0; i < gridBlocksList.length; i++) {
            document.getElementById(`block${i+1}`).style.border = '2px solid #FAF0E6';
        }
        onDarkMode = true;
        onLightMode = false;
    } else if (onDarkMode) {
        document.body.style.backgroundColor = '#FAF0E6';
        document.body.style.color = '#352F44';
        startBtnDarkOrLightModeTop.textContent = 'Dark Mode';
        gameBtnDarkOrLightModeTop.textContent = 'Dark Mode';

        // Grid styles
        gameContainer.style.boxShadow = '0 0 10px 10px #352F44';
        for (let i = 0; i < gridBlocksList.length; i++) {
            document.getElementById(`block${i+1}`).style.border = '2px solid #352F44';
        }
        onLightMode = true;
        onDarkMode = false;
    }
}

// function activateLightMode() {
//     if (onDarkMode) {
        
//     }
// }

function disableSymbolPlacement() {
    for (let i = 0; i < gridBlocksList.length; i++) {
        document.getElementById(`block${i+1}`).removeEventListener('mouseup',placeSymbol);
    }
}

function updateInfo() {
    if (playerOneTurn && gameBtnReset.disabled === true) {
        gameInfo.textContent = 'Player 1\'s turn';
    } else if (playerTwoTurn && gameBtnReset.disabled === true) {
        gameInfo.textContent = 'Player 2\'s turn';
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
    } else if (!playerOneTurn && !playerTwoTurn) {
        alert('Error in code; it is no one\'s turn?');
    } else if (e.button !== 0) {
        alert('Unknown click registered, please use only left click.');
    } else {
        alert('Please click an empty block.')
    }
}

function initializeGame() {
    document.body.appendChild(startDiv);
    document.body.appendChild(startFooterContainer);
    startDiv.appendChild(startTitle);
    startDiv.appendChild(startText);
    startDiv.appendChild(startBtnContainer);
    startBtnContainer.appendChild(startPlayerOne);
    startBtnContainer.appendChild(startPlayerTwo);
    startPlayerOne.appendChild(startPlayerOneTop);
    startPlayerTwo.appendChild(startPlayerTwoTop);
    startFooterContainer.appendChild(startBtnDarkOrLightMode);
    startBtnDarkOrLightMode.appendChild(startBtnDarkOrLightModeTop);
    startFooterContainer.appendChild(startFooter);
}

function startGame() {
    // Remove the start page elements
    removeAllChildNodes(document.body);

    // Appending elements appropriately
    // Main
    document.body.appendChild(gameMain);
    gameMain.appendChild(gameTitle);
    gameMain.appendChild(gameContainer);
    gameMain.appendChild(gameInfo);

    // Reset button (button is disabled by default)
    gameMain.appendChild(gameBtnContainer);
    gameBtnContainer.appendChild(gameBtnReset);
    gameBtnReset.appendChild(gameBtnResetTop);
    gameBtnReset.disabled = true;
    gameBtnReset.addEventListener('click', resetGame);

    let infoText = `Begin play! Player ${playerWhoStarts}\'s turn!`;
    gameInfo.textContent = infoText;    

    // Footer
    document.body.appendChild(gameFooterContainer);
    gameFooterContainer.appendChild(gameBtnDarkOrLightMode);
    gameBtnDarkOrLightMode.appendChild(gameBtnDarkOrLightModeTop);
    gameFooterContainer.appendChild(gameFooter);
    checkPlayerTurn();
    createGrid();
}

function resetGame() {
    playerOneTurn = false;
    playerTwoTurn = false;
    xCount = 0;
    oCount = 0;
    gameBtnReset.disabled = true;
    removeAllChildNodes(gameContainer);
    playerWhoStarts = +prompt('Who starts this time? (type 1 or 2)');
    checkPlayerTurn();
    gameInfo.textContent = `Game has reset. Player ${playerWhoStarts}'s turn!`   
    gridBlocksList.splice(0, gridBlocksList.length);
    createGrid();
}

function createGrid() {
    if (gameContainer.hasChildNodes() === false) {
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
            

            gameContainer.appendChild(gridBlock);
        }
        gridBlocksList = Array.from(gameContainer.childNodes);
    }
}

function checkForWin() {    
    if (playerOneTurn) {
        // Horizontal wins
        if (gridBlocksList[0].textContent === 'X' && gridBlocksList[1].textContent === 'X' && gridBlocksList[2].textContent === 'X') {
            gameInfo.textContent = `Player 1 won!`;
            gameBtnReset.disabled = false;
            disableSymbolPlacement();
        } else if (gridBlocksList[3].textContent === 'X' && gridBlocksList[4].textContent === 'X' && gridBlocksList[5].textContent === 'X') {
            gameInfo.textContent = `Player 1 won!`;
            gameBtnReset.disabled = false;
            disableSymbolPlacement();
        } else if (gridBlocksList[6].textContent === 'X' && gridBlocksList[7].textContent === 'X' && gridBlocksList[8].textContent === 'X') {
            gameInfo.textContent = `Player 1 won!`;
            gameBtnReset.disabled = false;
            disableSymbolPlacement();

        // Vertical wins
        } else if (gridBlocksList[0].textContent === 'X' && gridBlocksList[3].textContent === 'X' && gridBlocksList[6].textContent === 'X') {
            gameInfo.textContent = `Player 1 won!`;
            gameBtnReset.disabled = false;
            disableSymbolPlacement();
        } else if (gridBlocksList[1].textContent === 'X' && gridBlocksList[4].textContent === 'X' && gridBlocksList[7].textContent === 'X') {
            gameInfo.textContent = `Player 1 won!`;
            gameBtnReset.disabled = false;
            disableSymbolPlacement();
        } else if (gridBlocksList[2].textContent === 'X' && gridBlocksList[5].textContent === 'X' && gridBlocksList[8].textContent === 'X') {
            gameInfo.textContent = `Player 1 won!`;
            gameBtnReset.disabled = false;
            disableSymbolPlacement();

        // Diagonal win
        } else if (gridBlocksList[0].textContent === 'X' && gridBlocksList[4].textContent === 'X' && gridBlocksList[8].textContent === 'X') {
            gameInfo.textContent = `Player 1 won!`;
            gameBtnReset.disabled = false;
            disableSymbolPlacement();
        } else if (gridBlocksList[2].textContent === 'X' && gridBlocksList[4].textContent === 'X' && gridBlocksList[6].textContent === 'X') {
            gameInfo.textContent = `Player 1 won!`;
            gameBtnReset.disabled = false;
            disableSymbolPlacement();
        }
    } else if (playerTwoTurn) {
        // Horizontal wins
        if (gridBlocksList[0].textContent === 'O' && gridBlocksList[1].textContent === 'O' && gridBlocksList[2].textContent === 'O') {
            gameInfo.textContent = `Player 2 won!`;
            gameBtnReset.disabled = false;
            disableSymbolPlacement();
        } else if (gridBlocksList[3].textContent === 'O' && gridBlocksList[4].textContent === 'O' && gridBlocksList[5].textContent === 'O') {
            gameInfo.textContent = `Player 2 won!`;
            gameBtnReset.disabled = false;
            disableSymbolPlacement();
        } else if (gridBlocksList[6].textContent === 'O' && gridBlocksList[7].textContent === 'O' && gridBlocksList[8].textContent === 'O') {
            gameInfo.textContent = `Player 2 won!`;
            gameBtnReset.disabled = false;
            disableSymbolPlacement();

        // Vertical wins
        } else if (gridBlocksList[0].textContent === 'O' && gridBlocksList[3].textContent === 'O' && gridBlocksList[6].textContent === 'O') {
            gameInfo.textContent = `Player 2 won!`;
            gameBtnReset.disabled = false;
            disableSymbolPlacement();
        } else if (gridBlocksList[1].textContent === 'O' && gridBlocksList[4].textContent === 'O' && gridBlocksList[7].textContent === 'O') {
            gameInfo.textContent = `Player 2 won!`;
            gameBtnReset.disabled = false;
            disableSymbolPlacement();
        } else if (gridBlocksList[2].textContent === 'O' && gridBlocksList[5].textContent === 'O' && gridBlocksList[8].textContent === 'O') {
            gameInfo.textContent = `Player 2 won!`;
            gameBtnReset.disabled = false;
            disableSymbolPlacement();

        // Diagonal wins
        } else if (gridBlocksList[0].textContent === 'O' && gridBlocksList[4].textContent === 'O' && gridBlocksList[8].textContent === 'O') {
            gameInfo.textContent = `Player 2 won!`;
            gameBtnReset.disabled = false;
            disableSymbolPlacement();
        } else if (gridBlocksList[2].textContent === 'O' && gridBlocksList[4].textContent === 'O' && gridBlocksList[6].textContent === 'O') {
            gameInfo.textContent = `Player 2 won!`;
            gameBtnReset.disabled = false;
            disableSymbolPlacement();
        }
    }
}

function checkForTie() {
    if (xCount === 5 || oCount === 5) {
        gameInfo.textContent = 'It\'s a tie!';
        gameBtnReset.disabled = false;
    }
}

initializeGame();





