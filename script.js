// Time to make this Tic-Tac-Toe game!
// Plan:
// 1) Create a 3x3 grid
//// - Player should be able to click on one of the grid blocks and an 'X' or 'O' should appear depending on the symbol they chose
//// - After clicking, CPU/2nd player should fill in an empty grid block afterwards
// 2) Check game condition for win/loss/tie
// 3) Reset grid once result is determined

// Element variables
const container = document.getElementById('container');

function createGrid() {
    for(let i = 0; i < 9; i++) {
        const gridBlock = document.createElement('div')
        gridBlock.className = 'grid-block';
        container.appendChild(gridBlock);
    }
}

createGrid();