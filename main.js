const gameControl = (() => {
    const player1Container = document.getElementById('player1')
    const player2Container = document.getElementById('player2')

    let player1Turn = true;

    function render() {
        // Render the data from the board array
        for (let i = 0; i < gameBoard.board.length; i++) {
            boardSquares[i].textContent = gameBoard.board[i];
        }
    }

    function addMark(e) {
        e.target.classList.add('slide-in');
        player1Container.classList.toggle('current-player');
        player2Container.classList.toggle('current-player');
        
        let idx = parseInt(e.target.dataset.key);
        if (player1Turn) {
            gameBoard.board[idx] = 'x'; 
        } else {
            gameBoard.board[idx] = 'o';
        }
        player1Turn = !player1Turn;
        render();
    }

    // Allow player to add mark
    const boardSquares = document.querySelectorAll('.board-square');
    boardSquares.forEach(square => {
        square.addEventListener('click', addMark);
    });

    return {
        render: render,
    }
})();

const gameBoard = (() => { 
    'use strict';
    let board = ['', '', '', '', '', '', '', '', ''];

    return {
        board: board,
    };
})();

// Start the game
gameControl.render();