const router = require('express').Router();
const TicTacToe = require('./helper/minmaxAlgorithm.js');

// Routes

// POST: /api/minmax
router.post('/minmax', (req, res) => {
    const {
        board,
        player,
    } = req.body;

    if (!board || !player)
        return res.status(400).json({
            message: 'Missing board or player'
        });

    // Run minimax algorithm
    const game = new TicTacToe(board, player);
    const bestMove = game.findBestMove();

    // Return result
    return res.status(200).json({
        bestMove
    });
});

module.exports = router;
