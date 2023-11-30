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
const startFooterContainer = document.createElement('div');
const startFooter = document.createElement('footer');
const startBtnDarkOrLightMode = document.createElement('button');

startDiv.setAttribute('id','startDiv');
startBtnContainer.setAttribute('id', 'startBtnContainer');

startTitle.textContent = 'Tic-Tac-Toe!';
startTitle.setAttribute('id','startTitle');

startText.textContent = 'Who will go first?';
startText.setAttribute('id', 'startText');

startPlayerOne.textContent = 'Player 1 (X)';
startPlayerTwo.textContent = 'Player 2 (O)';

startFooterContainer.setAttribute('id', 'startFooterContainer');
startFooter.textContent = 'Made by andydingus';
startFooter.setAttribute('id', 'startFooter');

startBtnDarkOrLightMode.textContent = 'Dark Mode'; //Temp title, will be changed into a "lightswitch"
startBtnDarkOrLightMode.setAttribute('class', 'no-stretch');

// // // // // // // // // 
//  GAME PAGE ELEMENTS  //
// // // // // // // // //
// Part of main div
const main = document.createElement('div');
const gameTitle = document.createElement('h1');
const container = document.createElement('div');
const btnContainer = document.createElement('div');
const info = document.createElement('p');
const btnReset = document.createElement('button');
const gameBtnDarkOrLightMode = document.createElement('button');
const gameFooterContainer = document.createElement('div');
const footer = document.createElement('footer');

// Can't be const since it will be duplicated 
let gridBlock = document.createElement('div');

// Giving IDs to select elements
main.setAttribute('id', 'main');
container.setAttribute('id', 'container');
info.setAttribute('id', 'info');
btnContainer.setAttribute('id', 'divButton');
gameFooterContainer.setAttribute('id', 'gameFooterContainer');
btnReset.setAttribute('id', 'reset');

// Classes to elements
gameBtnDarkOrLightMode.setAttribute('class', 'no-stretch')

// Applying text to select elements
gameTitle.textContent = 'Tic-Tac-Toe!';
btnReset.textContent = 'Reset Game';
footer.textContent = 'Made by andydingus';
gameBtnDarkOrLightMode.textContent = 'Dark Mode';

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
        startBtnDarkOrLightMode.textContent = 'Light Mode';
        gameBtnDarkOrLightMode.textContent = 'Light Mode';

        // Grid styles
        container.style.boxShadow = '0 0 10px 10px #FAF0E6';
        for (let i = 0; i < gridBlocksList.length; i++) {
            document.getElementById(`block${i+1}`).style.border = '2px solid #FAF0E6';
        }
        onDarkMode = true;
        onLightMode = false;
    } else if (onDarkMode) {
        document.body.style.backgroundColor = '#FAF0E6';
        document.body.style.color = '#352F44';
        startBtnDarkOrLightMode.textContent = 'Dark Mode';
        gameBtnDarkOrLightMode.textContent = 'Dark Mode';

        // Grid styles
        container.style.boxShadow = '0 0 10px 10px #352F44';
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
    if (playerOneTurn && btnReset.disabled === true) {
        info.textContent = 'Player 1\'s turn';
    } else if (playerTwoTurn && btnReset.disabled === true) {
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
    startFooterContainer.appendChild(startBtnDarkOrLightMode);
    startFooterContainer.appendChild(startFooter);
}

function startGame() {
    // Remove the start page elements
    removeAllChildNodes(document.body);

    // Appending elements appropriately
    // Main
    document.body.appendChild(main);
    main.appendChild(gameTitle);
    main.appendChild(container);
    main.appendChild(info);

    // Reset button (button is disabled by default)
    main.appendChild(btnContainer);
    btnContainer.appendChild(btnReset);
    btnReset.disabled = true;
    btnReset.addEventListener('click', resetGame);

    let infoText = `Begin play! Player ${playerWhoStarts}\'s turn!`;
    info.textContent = infoText;    

    // Footer
    document.body.appendChild(gameFooterContainer);
    gameFooterContainer.appendChild(gameBtnDarkOrLightMode);
    gameFooterContainer.appendChild(footer);
    checkPlayerTurn();
    createGrid();
}

function resetGame() {
    playerOneTurn = false;
    playerTwoTurn = false;
    xCount = 0;
    oCount = 0;
    btnReset.disabled = true;
    removeAllChildNodes(container);
    playerWhoStarts = +prompt('Who starts this time? (type 1 or 2)');
    checkPlayerTurn();
    info.textContent = `Game has reset. Player ${playerWhoStarts}'s turn!`   
    gridBlocksList.splice(0, gridBlocksList.length);
    createGrid();
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
            btnReset.disabled = false;
            disableSymbolPlacement();
        } else if (gridBlocksList[3].textContent === 'X' && gridBlocksList[4].textContent === 'X' && gridBlocksList[5].textContent === 'X') {
            info.textContent = `Player 1 won!`;
            btnReset.disabled = false;
            disableSymbolPlacement();
        } else if (gridBlocksList[6].textContent === 'X' && gridBlocksList[7].textContent === 'X' && gridBlocksList[8].textContent === 'X') {
            info.textContent = `Player 1 won!`;
            btnReset.disabled = false;
            disableSymbolPlacement();

        // Vertical wins
        } else if (gridBlocksList[0].textContent === 'X' && gridBlocksList[3].textContent === 'X' && gridBlocksList[6].textContent === 'X') {
            info.textContent = `Player 1 won!`;
            btnReset.disabled = false;
            disableSymbolPlacement();
        } else if (gridBlocksList[1].textContent === 'X' && gridBlocksList[4].textContent === 'X' && gridBlocksList[7].textContent === 'X') {
            info.textContent = `Player 1 won!`;
            btnReset.disabled = false;
            disableSymbolPlacement();
        } else if (gridBlocksList[2].textContent === 'X' && gridBlocksList[5].textContent === 'X' && gridBlocksList[8].textContent === 'X') {
            info.textContent = `Player 1 won!`;
            btnReset.disabled = false;
            disableSymbolPlacement();

        // Diagonal win
        } else if (gridBlocksList[0].textContent === 'X' && gridBlocksList[4].textContent === 'X' && gridBlocksList[8].textContent === 'X') {
            info.textContent = `Player 1 won!`;
            btnReset.disabled = false;
            disableSymbolPlacement();
        } else if (gridBlocksList[2].textContent === 'X' && gridBlocksList[4].textContent === 'X' && gridBlocksList[6].textContent === 'X') {
            info.textContent = `Player 1 won!`;
            btnReset.disabled = false;
            disableSymbolPlacement();
        }
    } else if (playerTwoTurn) {
        // Horizontal wins
        if (gridBlocksList[0].textContent === 'O' && gridBlocksList[1].textContent === 'O' && gridBlocksList[2].textContent === 'O') {
            info.textContent = `Player 2 won!`;
            btnReset.disabled = false;
            disableSymbolPlacement();
        } else if (gridBlocksList[3].textContent === 'O' && gridBlocksList[4].textContent === 'O' && gridBlocksList[5].textContent === 'O') {
            info.textContent = `Player 2 won!`;
            btnReset.disabled = false;
            disableSymbolPlacement();
        } else if (gridBlocksList[6].textContent === 'O' && gridBlocksList[7].textContent === 'O' && gridBlocksList[8].textContent === 'O') {
            info.textContent = `Player 2 won!`;
            btnReset.disabled = false;
            disableSymbolPlacement();

        // Vertical wins
        } else if (gridBlocksList[0].textContent === 'O' && gridBlocksList[3].textContent === 'O' && gridBlocksList[6].textContent === 'O') {
            info.textContent = `Player 2 won!`;
            btnReset.disabled = false;
            disableSymbolPlacement();
        } else if (gridBlocksList[1].textContent === 'O' && gridBlocksList[4].textContent === 'O' && gridBlocksList[7].textContent === 'O') {
            info.textContent = `Player 2 won!`;
            btnReset.disabled = false;
            disableSymbolPlacement();
        } else if (gridBlocksList[2].textContent === 'O' && gridBlocksList[5].textContent === 'O' && gridBlocksList[8].textContent === 'O') {
            info.textContent = `Player 2 won!`;
            btnReset.disabled = false;
            disableSymbolPlacement();

        // Diagonal wins
        } else if (gridBlocksList[0].textContent === 'O' && gridBlocksList[4].textContent === 'O' && gridBlocksList[8].textContent === 'O') {
            info.textContent = `Player 2 won!`;
            btnReset.disabled = false;
            disableSymbolPlacement();
        } else if (gridBlocksList[2].textContent === 'O' && gridBlocksList[4].textContent === 'O' && gridBlocksList[6].textContent === 'O') {
            info.textContent = `Player 2 won!`;
            btnReset.disabled = false;
            disableSymbolPlacement();
        }
    }
}

function checkForTie() {
    if (xCount === 5 || oCount === 5) {
        info.textContent = 'It\'s a tie!';
        btnReset.disabled = false;
    }
}

initializeGame();





