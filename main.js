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

    function checkWin() {
        let combos = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (let combo of combos) {
            let num1 = gameBoard.board[combo[0]];
            let num2 = gameBoard.board[combo[1]];
            let num3 = gameBoard.board[combo[2]];  
            if ((num1 === num2 && num1 === num3 && num1 !== null) && num1 !== '') {
                return true;
            }
        }
    }

    function addMark(e) {
        let idx = parseInt(e.target.dataset.key);
        
        // Check if the board square is already taken or not
        if (gameBoard.board[idx] == '') {
            if (player1Turn) {
                gameBoard.board[idx] = 'x'; 
            } else {
                gameBoard.board[idx] = 'o';
            }
 
            // Links to css animation
            e.target.classList.add('slide-in');

            // Add highlight to current player
            player1Container.classList.toggle('current-player');
            player2Container.classList.toggle('current-player');

            // Alternate the player turns
            player1Turn = !player1Turn;
            
            // Re-render every time new mark is added
            render();

            // Check win
            if (checkWin()) {
                alert(`Player ${gameBoard.board[idx] === 'x' ? 1 : 2} wins!`);
            }
        } else {
            return;
        }
    }

    // Allow player to add mark
    const boardSquares = document.querySelectorAll('.board-square');
    boardSquares.forEach(square => square.addEventListener('click', addMark));

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