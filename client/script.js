const gameBoardCells = document.querySelectorAll('.game_box');
let gameStatus = true;

gameBoardCells.forEach(cell => {
    cell.addEventListener('click', async () => {
        // check if cell has <p> tag with value X or O
        if (!cell.childElementCount === 0 || !gameStatus)
            return;

        // create <p> tag with value X
        const p = document.createElement('p');
        p.textContent = 'X';
        p.style.userSelect = 'none';
        cell.appendChild(p);

        // get board values
        const board = [];
        gameBoardCells.forEach(cell => {
            if (cell.childElementCount === 0)
                board.push('_');
            else
                board.push(cell.children[0].textContent);
        });

        // check if there is a winner
        const winner = checkWinner();
        if (winner) {
            document.body.style.backgroundColor = 'var(--win-color)';
            alert(`${winner} wins!`);
            return;
        }

        // send request to server
        const URL = 'http://localhost:3000/api/minmax'
        const response = await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                board,
                player: 'O'
            })
        });

        // get response
        const data = await response.json();
        const bestMove = data.bestMove;

        // create <p> tag with value O
        const p2 = document.createElement('p');
        p2.textContent = 'O';
        p2.style.userSelect = 'none';
        gameBoardCells[bestMove].appendChild(p2);

        // check if there is a winner
        const winner2 = checkWinner();
        if (winner2) {
            document.body.style.backgroundColor = 'var(--lose-color)';
            alert(`${winner2} wins!`);
            return;
        }
    });
});

// check if there is a winner
const checkWinner = () => {
    const board = [];
    gameBoardCells.forEach(cell => {
        if (cell.childElementCount === 0)
            board.push('_');
        else
            board.push(cell.children[0].textContent);
    });

    const winningCombinations = [
        // horizontal
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],

        // vertical
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],

        // diagonal
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];

        if (board[a] === board[b] && board[b] === board[c] && board[a] !== '_') {
            gameStatus = false;
            return board[a];
        }
    }

    // color the boxes that caused the win
    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];

        if (board[a] === board[b] && board[b] === board[c] && board[a] !== '_') {
            gameBoardCells[a].style.backgroundColor = 'var(--in-game-color)';
            gameBoardCells[b].style.backgroundColor = 'var(--in-game-color)';
            gameBoardCells[c].style.backgroundColor = 'var(--in-game-color)';
        }
    }

    return null;
}
