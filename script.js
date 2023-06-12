const rows = 10;
const cols = 10;

let board = createBoard();

function createBoard() {
    const board = [];
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < cols; j++) {
            board[i][j] = Math.random() < 0.2 ? 1 : 0;
        }
    }
    return board;
}

function renderBoard() {
    const boardContainer = document.getElementById('board');
    boardContainer.innerHTML = '';

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            if (board[i][j] === 1) {
                cell.classList.add('alive');
            }
            cell.addEventListener('click', () => {
                toggleCell(i, j);
            });
            boardContainer.appendChild(cell);
        }
    }
}

function toggleCell(row, col) {
    board[row][col] = board[row][col] === 1 ? 0 : 1;
    renderBoard();
}

function nextGeneration() {
    const newBoard = createBoard();
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const neighbors = countNeighbors(i, j);
            if (board[i][j] === 1) {
                if (neighbors < 2 || neighbors > 3) {
                    newBoard[i][j] = 0;
                } else {
                    newBoard[i][j] = 1;
                }
            } else {
                if (neighbors === 3) {
                    newBoard[i][j] = 1;
                }
            }
        }
    }
    board = newBoard;
    renderBoard();
}

function countNeighbors(row, col) {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue;
            const newRow = row + i;
            const newCol = col + j;
            if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
                count += board[newRow][newCol];
            }
        }
    }
    return count;
}

renderBoard();
setInterval(nextGeneration, 1000);