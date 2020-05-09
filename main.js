const boardSquares = document.querySelectorAll('.board-square');

const gameBoard = (() => { 
    let board = ['', '', '', '', '', '', '', '', ''];

    return {
        board,
    }

})();

const createPlayer = name => {
    
}

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

boardSquares.forEach(square => square.addEventListener('click', addMark));
render();