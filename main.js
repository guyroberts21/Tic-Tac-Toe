const player1Container = document.getElementById('player1')
const player2Container = document.getElementById('player2')
const boardSquares = document.querySelectorAll('.board-square');

const displayController = (() => {
    let player1Turn = true;

    if (player1Turn) {
        player1Container.backgroundColor = '#3ff2b6';
    }

    return {
        player1Turn,
    }
})();

const gameBoard = (() => { 
    let board = ['', '', '', '', '', '', '', '', ''];

    return {
        board,
    }

})();

const createPlayer = (() => ({
    score: 0,
}));

function render() {
    // Render the data from the board array
    for (let i = 0; i < gameBoard.board.length; i++) {
        boardSquares[i].textContent = gameBoard.board[i];
    }
}

function addMark(e) {
    console.log(e.target.dataset.key);
    let idx = parseInt(e.target.dataset.key);
    gameBoard.board[idx] = 'x';
    render();
}

const player1 = createPlayer();
const player2 = createPlayer();

boardSquares.forEach(square => square.addEventListener('click', addMark));
render();