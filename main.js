// Player factory function
const createPlayer = ({ name }) => ({
    name,
    score: 0,
    setUserName(userName) {
        this.name = userName;
        return this;
    }
});

const gameControl = (() => {
    const player1Container = document.getElementById('player1');
    const player2Container = document.getElementById('player2');
    const winnerText = document.querySelector('.winner-text');

    const player1 = createPlayer('Player 1');
    const player2 = createPlayer('Player 2');

    const transitionTime = 3000;

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

        // Pretty messy way of looping through the different ways to win the game
        // TODO: Make a much cleaner solution to this problem
        for (let combo of combos) {
            let num1 = gameBoard.board[combo[0]];
            let num2 = gameBoard.board[combo[1]];
            let num3 = gameBoard.board[combo[2]];  
            if ((num1 === num2 && num1 === num3 && num1 !== null) && num1 !== '') {
                console.log(boardSquares[combo[0]], boardSquares[combo[1]], boardSquares[combo[2]]);
                let winningSquares = [boardSquares[combo[0]], boardSquares[combo[1]], boardSquares[combo[2]]];
                for (let square of winningSquares) {
                    square.classList.add('winning-square');
                    setTimeout(() => {
                        square.classList.remove('winning-square');
                    }, transitionTime);
                }
                return true;
            }
        }
    }

    function addMark(e) {
        let idx = parseInt(e.target.dataset.key);
        
        // Check if the board square is already taken or not
        if (gameBoard.board[idx] == '' && !checkWin()) {
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
                const winner = gameBoard.board[idx] === 'x' ? player1.name : player2.name;
                if (winner === player1.name) {
                    player1.score++;
                } else {
                    player2.score++;
                }
                winnerText.textContent = `${winner} Wins!`;
                winnerText.style.visibility = 'visible';
                // Wait some time then reset board
                setTimeout(gameBoard.clearBoard, transitionTime);
            }
        } else {
            return;
        }
    }

    // Allow player to add mark
    const boardSquares = document.querySelectorAll('.board-square');
    boardSquares.forEach(square => square.addEventListener('click', addMark));

    return {
        render,
        winnerText,
        boardSquares
    }
})();

// Store gameBoard and functions in a module
const gameBoard = (() => { 
    'use strict';
    let board = ['', '', '', '', '', '', '', '', ''];

    
    function clearBoard() {
        for (let i = 0; i < board.length; i++) {
            board[i] = '';
            gameControl.boardSquares[i].classList.remove('slide-in');
        }
        gameControl.winnerText.style.visibility = 'hidden';
        gameControl.render();
    }

    const refreshBtn = document.getElementById('refresh');
    refreshBtn.addEventListener('click', clearBoard)

    return {
        board,
        clearBoard
    };
})();

// Start the game
gameControl.render();