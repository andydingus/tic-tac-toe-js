// Time to make this Tic-Tac-Toe game!
// Plan:
// 1) Create a 3x3 grid
//// - Player should be able to click on one of the grid blocks and an 'X' or 'O' should appear depending on the symbol they chose
//// - After clicking, CPU/2nd player should fill in an empty grid block afterwards
// 2) Check game condition for win/loss/tie
// 3) Reset grid once result is determined

// Element variables
const container = document.getElementById('container');


// Player variables
let playerOneTurn = true;
let playerTwoTurn = false;
let cpuTurn = false; // Plan for CPU later on

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
function resetGrid(list) {
    for(let i = 0; i < list.length; i++) {
       list[i].textContent = '';
    }
}

function createGrid() {
    for(let i = 0; i < 9; i++) {
        // Create the grid blocks
        const gridBlock = document.createElement('div')
        gridBlock.setAttribute('id', `block${i+1}`);

        // Moved styles here since they're all IDs
        gridBlock.style.border = '2px solid black';
        gridBlock.style.textAlign = 'center';
        gridBlock.style.paddingTop = '20px';
        gridBlock.style.fontSize = '75px';

        // Place appropriate symbol when clicked
        gridBlock.addEventListener('mouseup', function(e) {
            if (playerOneTurn && e.target.textContent === '') {
                e.target.textContent = 'X';
                checkForWin();
                playerTwoTurn = true;
                playerOneTurn = false;  
            } else if (playerTwoTurn && e.target.textContent === '') {
                e.target.textContent = 'O';
                checkForWin();
                playerTwoTurn = false;
                playerOneTurn = true;
            } else {
                alert('Please click an empty block.');
            }
        });
        // gridBlock.addEventListener('mouseup', placeX);
        // gridBlock.addEventListener('mouseup', placeO);
        

        container.appendChild(gridBlock);
    }
}

function checkForWin() {
    if (container.hasChildNodes() === true) {
        let gridBlocksList = Array.from(container.childNodes);
        if (playerOneTurn) {
            // Horizontal wins
            if (gridBlocksList[0].textContent === 'X' && gridBlocksList[1].textContent === 'X' && gridBlocksList[2].textContent === 'X') {
                console.log('Player 1 won!');
                resetGrid(gridBlocksList);
            } else if (gridBlocksList[3].textContent === 'X' && gridBlocksList[4].textContent === 'X' && gridBlocksList[5].textContent === 'X') {
                console.log('Player 1 won!');
                resetGrid(gridBlocksList);
            } else if (gridBlocksList[6].textContent === 'X' && gridBlocksList[7].textContent === 'X' && gridBlocksList[8].textContent === 'X') {
                console.log('Player 1 won!');
                resetGrid(gridBlocksList);

            // Vertical wins
            } else if (gridBlocksList[0].textContent === 'X' && gridBlocksList[3].textContent === 'X' && gridBlocksList[6].textContent === 'X') {
                console.log('Player 1 won!');
                resetGrid(gridBlocksList);
            } else if (gridBlocksList[1].textContent === 'X' && gridBlocksList[4].textContent === 'X' && gridBlocksList[7].textContent === 'X') {
                console.log('Player 1 won!');
                resetGrid(gridBlocksList);
            } else if (gridBlocksList[2].textContent === 'X' && gridBlocksList[5].textContent === 'X' && gridBlocksList[8].textContent === 'X') {
                console.log('Player 1 won!');
                resetGrid(gridBlocksList);

            // Diagonal win
            } else if (gridBlocksList[0].textContent === 'X' && gridBlocksList[4].textContent === 'X' && gridBlocksList[8].textContent === 'X') {
                console.log('Player 1 won!');
                resetGrid(gridBlocksList);
            } else if (gridBlocksList[2].textContent === 'X' && gridBlocksList[4].textContent === 'X' && gridBlocksList[6].textContent === 'X') {
                console.log('Player 1 won!');
                resetGrid(gridBlocksList);
            } 
        } else if (playerTwoTurn) {
            // Horizontal wins
            if (gridBlocksList[0].textContent === 'O' && gridBlocksList[1].textContent === 'O' && gridBlocksList[2].textContent === 'O') {
                console.log('Player 2 won!');
                resetGrid(gridBlocksList);
            } else if (gridBlocksList[3].textContent === 'O' && gridBlocksList[4].textContent === 'O' && gridBlocksList[5].textContent === 'O') {
                console.log('Player 2 won!');
                resetGrid(gridBlocksList);
            } else if (gridBlocksList[6].textContent === 'O' && gridBlocksList[7].textContent === 'O' && gridBlocksList[8].textContent === 'O') {
                console.log('Player 2 won!');
                resetGrid(gridBlocksList);

            // Vertical wins
            } else if (gridBlocksList[0].textContent === 'O' && gridBlocksList[3].textContent === 'O' && gridBlocksList[6].textContent === 'O') {
                console.log('Player 2 won!');
                resetGrid(gridBlocksList);
            } else if (gridBlocksList[1].textContent === 'O' && gridBlocksList[4].textContent === 'O' && gridBlocksList[7].textContent === 'O') {
                console.log('Player 2 won!');
                resetGrid(gridBlocksList);
            } else if (gridBlocksList[2].textContent === 'O' && gridBlocksList[5].textContent === 'O' && gridBlocksList[8].textContent === 'O') {
                console.log('Player 2 won!');
                resetGrid(gridBlocksList);

            // Diagonal wins
            } else if (gridBlocksList[0].textContent === 'O' && gridBlocksList[4].textContent === 'O' && gridBlocksList[8].textContent === 'O') {
                console.log('Player 2 won!');
                resetGrid(gridBlocksList);
            } else if (gridBlocksList[2].textContent === 'O' && gridBlocksList[4].textContent === 'O' && gridBlocksList[6].textContent === 'O') {
                console.log('Player 2 won!');
                resetGrid(gridBlocksList);
            }
        }
    }
}
createGrid();