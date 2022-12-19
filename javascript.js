const gameBoard = (() => {
    const board = ['X', 'O', 'X', 'O', 'O', 'X', 'X', 'X', 'O'];

    return {
        board
    };
})();

const displayController = (() => {
    const gameContainer = document.getElementById('game-board');
    
    const updateDisplay = () => {
        for (let i = 0; i < gameBoard.board.length; i++) {
            let card = document.createElement('div');
            card.classList.add('card');
            card.textContent = gameBoard.board[i];
            console.log(gameBoard.board[i]);
            gameContainer.appendChild(card);
    }
    }

    return { updateDisplay };
})();

displayController.updateDisplay();