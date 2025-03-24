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
let playerWhoStarts = null;
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
        document.body.style.transition = 'all 0.5s ease-in-out';

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

function appendChildren(parent, children){
    children.forEach(child => parent.appendChild(child));
}

function initializeGame() {
    appendChildren(document.body, [startDiv, startFooterContainer]);
    
    appendChildren(startDiv, [startTitle, startText, startBtnContainer]);
    appendChildren(startBtnContainer, [startPlayerOne, startPlayerTwo]);
    appendChildren(startPlayerOne, [startPlayerOneTop]);
    appendChildren(startPlayerTwo, [startPlayerTwoTop]);
    
    appendChildren(startFooterContainer, [startBtnDarkOrLightMode, startFooter]);
    appendChildren(startBtnDarkOrLightMode, [startBtnDarkOrLightModeTop]);
}

function startGame() {
    // Remove the start page elements
    removeAllChildNodes(document.body);

    // Appending elements appropriately
    // Main
    appendChildren(document.body, [gameMain, gameFooterContainer]);
    appendChildren(gameMain, [gameTitle, gameContainer, gameInfo, gameBtnContainer]);
    appendChildren(gameBtnContainer, [gameBtnReset]);
    appendChildren(gameBtnReset, [gameBtnResetTop]);

     // Set game info
    let infoText = `Begin play! Player ${playerWhoStarts}'s turn!`;
    gameInfo.textContent = infoText;

    // Disable reset button initially and attach listener
    gameBtnReset.disabled = true;
    gameBtnReset.addEventListener('click', resetGame);

    // Append footer elements
    appendChildren(gameFooterContainer, [gameBtnDarkOrLightMode, gameFooter]);
    appendChildren(gameBtnDarkOrLightMode, [gameBtnDarkOrLightModeTop]);

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
    // Input validation (ensuring no other number than 1 or 2)
    let input = null;
    while (input !== 1 && input !== 2) {
        input = +prompt('Who starts this time? (type 1 or 2)');
        if (input !== 1 && input !== 2) {
            alert('Invalid input. Please type 1 or 2.');
        }
    }
    playerWhoStarts = input;

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
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    const symbol = playerOneTurn ? 'X' : playerTwoTurn ? 'O' : null;
    const player = playerOneTurn ? 1 : playerTwoTurn ? 2 : null;

    if (!symbol) return; // Guard clause

    for (let combo of winningCombos){
        const [a,b,c] = combo;
        if (
            gridBlocksList[a].textContent === symbol &&
            gridBlocksList[b].textContent === symbol &&
            gridBlocksList[c].textContent === symbol
        ) {
            gameInfo.textContent = `Player ${player} won!`;
            gameBtnReset.disabled = false;
            disableSymbolPlacement();
            return;
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





