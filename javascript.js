const Player = (icon) => {
    this.icon = icon;

    const returnIcon = () => {
        return icon;
    };

    return {returnIcon};
}

const gameBoard = (() => {
    const board = [
        '', '', '', 
        '', '', '', 
        '', '', ''
    ];

    const resetBoard = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = '';
        }
    };

    const getIndex = (index) => {
        return board[index];
    };

    return { board, resetBoard, getIndex };
})();

const displayController = (() => {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach ((card) => {
        card.addEventListener('click', (e) => {
            let index = e.target.dataset.index;
            if (gameBoard.board[index] !== '') return;
            gameBoard.board[index] = gameController.playRound();
            updateDisplay();
        })
    });

    const updateDisplay = () => {
        for (let i = 0; i < cards.length; i++) {
            cards[i].textContent = gameBoard.board[i];
        }
    };

    return { updateDisplay };
})();

const gameController = (() => {
    const playerX = Player('X');
    const playerO = Player('O');
    let turn = 0;
    let gameOver = false;

    const playRound = () => {
        if (turn === 9) {
            gameOver = true;
            return;
        }
        if (turn % 2 === 0) {
            turn++;
            console.log(turn, playerX.returnIcon())
            return playerX.returnIcon();
        }
        turn++;
        console.log(turn, playerO.icon)
        return playerO.returnIcon();
    };

    const resetGame = () => {
        turn = 1;
        gameOver = false;
        gameBoard.resetBoard();
    }

    return { playRound, resetGame };

})();