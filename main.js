// Player factory function
const createPlayer = name => ({
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
    const player1Score = document.getElementById('player1-score');
    const player2Score = document.getElementById('player2-score');
    const winnerText = document.querySelector('.winner-text');

    const firstPlayer = createPlayer('Player 1');
    const secondPlayer = createPlayer('Player 2');

    const transitionTime = 3000;

    let player1Turn = true;
    let AIEnabled = false;

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

        function bestMove() {
            let bestScore = -Infinity;
            let optimalMove;
            // AI to make its turn
            let available = [];
            for (let i = 0; i < 9; i++) {
                // check if spot is available
                if (gameBoard.board[i] === '') {
                    gameBoard.board[i] = 'o';
                    let score = minimax(gameBoard.board);
                    gameBoard.board[i] = '';
                    if (score > bestScore) {
                        bestScore = score;
                        optimalMove = i;
                    }
                }
            }
        }

        function minimax(board) {
            return 1;
        }

        // Check if the board square is already taken or not
        if (gameBoard.board[idx] == '' && !checkWin()) {
            if (player1Turn) {
                gameBoard.board[idx] = 'x'; 
            } else if (AIEnabled) {
                bestMove();
                render();
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
                const winner = gameBoard.board[idx] === 'x' ? firstPlayer : secondPlayer;
                winner.score++;
                if (winner === firstPlayer) {
                    player1Score.textContent = winner.score;
                } else {
                    player2Score.textContent = winner.score;
                }
                winnerText.textContent = `${winner.name} Wins!`;
                winnerText.style.visibility = 'visible';
                // Wait some time then reset board
                setTimeout(gameBoard.clearBoard, transitionTime);
            }

            // Check if board is full
            if (gameBoard.board.every(square => square) && !checkWin()) {
                winnerText.textContent = 'Tie Game';
                winnerText.style.visibility = 'visible';
                setTimeout(gameBoard.clearBoard, transitionTime);
            }
        } else {
            return;
        }

    }

    // Allow player to add mark
    const boardSquares = document.querySelectorAll('.board-square');
    boardSquares.forEach(square => square.addEventListener('click', addMark));

    // Change player names
    const firstPlayerName = document.getElementById('player1-name');
    const secondPlayerName = document.getElementById('player2-name');

    function submitName(e) {
        // Stop modal from auto-closing
        e.preventDefault();

        if (firstPlayerName.value) {
            firstPlayer.setUserName(firstPlayerName.value);
        }
        if (secondPlayerName.value) {
            secondPlayer.setUserName(secondPlayerName.value);
        }

        firstPlayerName.value = '';
        secondPlayerName.value = '';

        // Change on-screen names
        player1Container.textContent = firstPlayer.name;
        player2Container.textContent = secondPlayer.name;

        const changesSavedText = document.getElementById('changes-saved');
        changesSavedText.style.display = 'inline-block';
    }

    // Submit player names event 
    const submitBtn = document.getElementById('submit-names');
    submitBtn.addEventListener('click', submitName);


    const player2NameContainer = document.querySelector('.player2-name-container');
    const player2NameInput = player2NameContainer.querySelector('input');
    function toggleAI(e) {
        AIEnabled = !AIEnabled;
        player2NameInput.disabled = !player2NameInput.disabled;
        player2NameContainer.classList.toggle('ai-enabled');
        if (this.checked) {
            player2Container.textContent = 'Computer';
        } else {
            player2Container.textContent = secondPlayer.name;
        }
    }
    
    const slider = document.querySelector('label.switch input');
    slider.addEventListener('click', toggleAI);    

    return {
        render,
        submitName,
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

    // Clean board on click
    const refreshBtn = document.getElementById('refresh');
    refreshBtn.addEventListener('click', clearBoard)

    return {
        board,
        clearBoard
    };
})();

// Start the game
gameControl.render();