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
    const gameMessage = document.querySelector('.text');
    
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
        setGameMessage("Player X's turn")
        updateDisplay();
    })

    const updateDisplay = () => {
        for (let i = 0; i < cards.length; i++) {
            cards[i].textContent = gameBoard.board[i];
        }
    };

    const setGameMessage = (message) => {
        gameMessage.textContent = message
    }

    const setGameResult = (winner) => {
        if (winner === 'Draw') {
            setGameMessage("It's a draw!");
        } else {
            setGameMessage(`Player ${winner} has won!`);
        }
    }

    return { updateDisplay, setGameMessage, setGameResult };
})();

const gameController = (() => {
    const playerX = Player('X');
    const playerO = Player('O');
    let turn = 1;
    let gameOver = false;

    const playRound = (index) => {
        gameBoard.inputMove(index, checkCurrentPlayer());
        if (checkWinner(index)) {
            displayController.setGameResult(checkCurrentPlayer())
            gameOver = true;
            return;
        }
        if (turn === 9) {
            displayController.setGameResult('Draw')
            gameOver = true;
            return;
        }
        turn++;
        displayController.setGameMessage(`Player ${checkCurrentPlayer()}'s turn`)
    };

    const resetGame = () => {
        turn = 1;
        gameOver = false;
    }

    const checkCurrentPlayer = () => {
        return turn % 2 === 1 ? playerX.returnIcon() : playerO.returnIcon();
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