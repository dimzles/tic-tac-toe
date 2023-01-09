const Player = (icon) => {
    this.icon = icon;

    const returnIcon = () => {
        return icon;
    };

    return { returnIcon };
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

    const inputMove = (index, icon) => {
        board[index] = icon;
    }

    return { board, resetBoard, getIndex, inputMove };
})();

const displayController = (() => {
    const cards = document.querySelectorAll('.card');
    const resetBtn = document.querySelector('.resetBtn');
    
    cards.forEach ((card) => {
        card.addEventListener('click', (e) => {
            if (gameController.checkGameOver() || card.textContent !== '') return;
            gameController.playRound(parseInt(e.target.dataset.index));
            updateDisplay();
        })
    });

    resetBtn.addEventListener('click', () => {
        gameBoard.resetBoard()
        gameController.resetGame()
        updateDisplay();
    })

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

    const playRound = (index) => {
        gameBoard.inputMove(index, checkCurrentPlayer());
        if (checkWinner(index)) {
            gameOver = true;
            return;
        }
        if (turn === 9) {
            gameOver = true;
            return;
        }
        turn++;
    };

    const resetGame = () => {
        turn = 0;
        gameOver = false;
    }

    const checkCurrentPlayer = () => {
        return turn % 2 === 0 ? playerX.returnIcon() : playerO.returnIcon();
    }

    const checkWinner = (indexes) => {
        const winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        
        return winConditions
        .filter((combination) => combination.includes(indexes))
        .some((possibleCombination) =>
        possibleCombination.every(
            (index) => gameBoard.getIndex(index) === checkCurrentPlayer()
            )
        );
    };

    const checkGameOver = () => {
        return gameOver;
    }

    return { playRound, resetGame, checkGameOver };
})();