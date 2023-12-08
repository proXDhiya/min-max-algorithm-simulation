class TicTacToe {
    constructor(board, player) {
        this.board = board;
        this.currentPlayer = player;
    }

    makeMove(index) {
        if (this.board[index] === "_") {
            this.board[index] = this.currentPlayer;
            this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
            return true;
        }
        return false;
    }

    isGameOver() {
        return this.checkWinner() || this.board.every(cell => cell !== "_");
    }

    checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (this.board[a] !== "_" && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
                return this.board[a];
            }
        }

        return null;
    }

    getEmptyCells() {
        return this.board.reduce((emptyCells, cell, index) => {
            if (cell === "_") {
                emptyCells.push(index);
            }
            return emptyCells;
        }, []);
    }

    minimax(depth, maximizingPlayer) {
        if (this.isGameOver()) {
            const winner = this.checkWinner();
            if (winner === 'X') {
                return -1;
            } else if (winner === 'O') {
                return 1;
            }
            return 0;
        }

        if (maximizingPlayer) {
            let maxEval = -Infinity;
            const emptyCells = this.getEmptyCells();

            for (const cell of emptyCells) {
                this.makeMove(cell);
                const evaluation = this.minimax(depth + 1, false);
                this.board[cell] = "_";
                maxEval = Math.max(maxEval, evaluation);
            }

            return maxEval;
        } else {
            let minEval = Infinity;
            const emptyCells = this.getEmptyCells();

            for (const cell of emptyCells) {
                this.makeMove(cell);
                const evaluation = this.minimax(depth + 1, true);
                this.board[cell] = "_";
                minEval = Math.min(minEval, evaluation);
            }

            return minEval;
        }
    }

    findBestMove() {
        const emptyCells = this.getEmptyCells();
        let bestMove = -1;
        let bestEval = -Infinity;

        for (const cell of emptyCells) {
            this.makeMove(cell);
            const evaluation = this.minimax(0, false);
            this.board[cell] = "_";

            if (evaluation > bestEval) {
                bestEval = evaluation;
                bestMove = cell;
            }
        }

        return bestMove;
    }
}

module.exports = TicTacToe;
