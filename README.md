<p><a target="_blank" href="https://app.eraser.io/workspace/irD8ODGls0S6bNzXfYzB" id="edit-in-eraser-github-link"><img alt="Edit in Eraser" src="https://firebasestorage.googleapis.com/v0/b/second-petal-295822.appspot.com/o/images%2Fgithub%2FOpen%20in%20Eraser.svg?alt=media&amp;token=968381c8-a7e7-472a-8ed6-4a6626da5501"></a></p>

# Min-Max Algorithm Documentation


**Student**: Kellouche Dhiya

**Student**: Benaboura Sabrine

---

## Table of Contents
1. **Introduction**
    - [1.1 Purpose](#11-purpose)
    - [1.2 Background](#12-background)
    - [1.3 Terminology](#13-terminology)
2. **Algorithm Overview**
    - [2.1 Basic Idea](#21-basic-idea)
    - [2.2 Objective Function](#22-objective-function)
    - [2.3 Turn-Taking](#23-turn-taking)
3. **Pseudocode**
    - [3.1 Initialization](#31-initialization)
    - [3.2 Recursion](#32-recursion)
    - [3.3 Evaluation Function](#33-evaluation-function)
4. **Implementation Details**
    - [4.1 Data Structures](#41-data-structures)
    - [4.2 Game State Representation](#42-game-state-representation)
    - [4.3 Move Generation](#43-move-generation)
    - [4.4 Min-Max Implementation](#44-min-max-implementation)
    - [4.5 Alpha-Beta Pruning](#45-alpha-beta-pruning)
5. **Mini-Project: Tic-Tac-Toe with Min-Max Algorithm**
    - [5.1 Overview](#51-overview)
    - [5.2 API for Game State Handling](#52-api-for-game-state-handling)
    - [5.3 Client Application](#53-client-application)
    - [5.4 Algorithm JS Code](#54-algorithm-js-code)
    - [5.5 Algorithm Implementation](#55-algorithm-implementation)
6. **Application Demo**
    - [6.1 API](#61-api)
    - [6.2 Client Application](#62-client-application)
7. **Conclusion**
8. **References**

## 1. Introduction
### 1.1 Purpose
The primary purpose of the Min-Max algorithm is to make optimal decisions in two-player games with perfect information. In these games, both players have complete knowledge of the current game state, and the outcome is solely determined by the players' decisions. The Min-Max algorithm helps a player decide the best move at each turn by considering all possible moves and their potential outcomes.

The goal of this document is to offer a thorough understanding of the Min-Max algorithm, providing insights into its underlying principles, implementation details, and potential enhancements through optimizations.

### 1.2 Background
The Min-Max algorithm finds its roots in game theory, a branch of mathematics and economics that deals with the analysis of strategic interactions among rational decision-makers. Introduced as a decision-making tool, the Min-Max algorithm was initially designed to determine the optimal strategy for players in turn-based games.

In turn-based games, players take sequential turns, and each player aims to maximize their chances of winning. The Min-Max algorithm systematically evaluates all possible moves and outcomes, creating a game tree that represents the entire decision space. By assigning values to different game states, the algorithm assists players in making informed decisions to maximize their advantage or minimize their disadvantage.

### 1.3 Terminology
- **Maximizer:** The player employs the Min-Max algorithm, aiming to maximize the objective function, which is often a measure of the desirability or advantage of a game state. The maximizer seeks the move that leads to the highest possible evaluation.
- **Minimizer:** The opponent, aiming to minimize the objective function. The minimizer acts in opposition to the maximizer, seeking moves that lead to lower evaluations for the maximizer.
- **Depth:** Refers to the level of recursion in the game tree. As the Min-Max algorithm explores the decision tree, it goes deeper into levels of possible moves. The depth influences the algorithm's ability to consider long-term strategies and the computational complexity of the problem.
- **Terminal State:** Represents the end state of the game, where no more moves are possible. Terminal states are crucial for determining the outcome and are typically associated with win/loss conditions or draws.
Understanding these terms is essential for grasping the dynamics of the Min-Max algorithm. The maximizer and minimizer players alternate turns, and the algorithm's recursive nature allows it to explore the decision space efficiently, ultimately leading to optimal decision-making in turn-based games with perfect information.

## 2. Algorithm Overview
### 2.1 Basic Idea
The fundamental idea behind the Min-Max algorithm is to systematically explore the decision space represented by the game tree. The game tree is a graphical representation of all possible moves and their consequences in a turn-based game. Min-Max assigns values to each node in the tree based on an objective function, helping players make decisions that lead to the most favorable outcomes.

In the context of the Min-Max algorithm, the nodes in the game tree are categorized into two types:

- **Maximizer Nodes:** These nodes represent the current player's turn, and the objective is to maximize the outcome. The algorithm explores these nodes by considering all possible moves available to the player and evaluates the resulting game states.
- **Minimizer Nodes:** These nodes represent the opponent's turn, and the objective is to minimize the outcome from the maximizer's perspective. The algorithm explores these nodes by considering all possible moves available to the opponent and evaluates the resulting game states.
By systematically evaluating and assigning values to nodes, the Min-Max algorithm guides the decision-making process, helping the player choose moves that lead to the most favorable positions.

### 2.2 Objective Function
The objective function is a crucial component of the Min-Max algorithm. It serves as a metric for quantifying the desirability of a particular game state from the perspective of the player. The objective function typically considers factors such as the current position of pieces, control of the board, potential threats, and other relevant aspects of the game.

The goal of the objective function is to provide a numerical representation of the advantages or disadvantages associated with a specific game state. Positive values often indicate an advantageous position for the player, while negative values suggest a disadvantage. By incorporating the objective function, the Min-Max algorithm can prioritize moves that lead to more favorable positions.

### 2.3 Turn-Taking
Turn-taking is a critical aspect of the Min-Max algorithm, as it reflects the sequential nature of turn-based games. Players alternate making moves and the algorithm adapts to this turn-taking structure. The algorithm starts at the root of the game tree, representing the current game state, and systematically explores the tree by considering all possible moves.

As the algorithm explores the tree, it alternates between maximizing and minimizing nodes. During the maximizer's turn, the algorithm seeks moves that maximize the objective function, aiming to increase the advantage. Conversely, during the minimizer's turn, the algorithm seeks moves that minimize the objective function, attempting to reduce the advantage from the maximizer's perspective.

This turn-taking mechanism continues until a terminal state is reached, signaling the end of the game. At this point, the algorithm has assigned values to all relevant nodes in the tree, and the player can choose the move associated with the most favorable outcome.

In summary, the Min-Max algorithm's basic idea involves exploring the game tree, utilizing an objective function to evaluate nodes, and incorporating turn-taking to guide decision-making in turn-based games with perfect information.

## 3. Pseudocode
### 3.1 Initialization
The Min-Max algorithm begins by initializing the game tree with the current game state. The algorithm then proceeds to explore the tree, assigning values to nodes and ultimately determining the best move for the player.

```python
function MinMax(node, depth, maximizingPlayer)
    if depth = 0 or node is a terminal node
        return the heuristic value of node
    if maximizingPlayer
        bestValue := -∞
        for each child of node
            val := MinMax(child, depth - 1, FALSE)
            bestValue := max(bestValue, val)
        return bestValue
    else
        bestValue := +∞
        for each child of node
            val := MinMax(child, depth - 1, TRUE)
            bestValue := min(bestValue, val)
        return bestValue
```

### 3.2 Recursion
The Min-Max algorithm utilizes recursion to explore the game tree. The algorithm starts at the root node, representing the current game state, and proceeds to explore the tree by considering all possible moves. The algorithm alternates between maximizing and minimizing nodes, assigning values to each node based on the objective function.

### 3.3 Evaluation Function
The evaluation function is a crucial component of the Min-Max algorithm. It serves as a metric for quantifying the desirability of a particular game state from the perspective of the player. The evaluation function typically considers factors such as the current position of pieces, control of the board, potential threats, and other relevant aspects of the game.

```python
function evaluate(board)
    if board is a terminal node
        return value of board
    else return heuristic value of board
```

## 4. Implementation Details
### 4.1 Data Structures
Choosing appropriate data structures is crucial for the efficiency of the Min-Max algorithm. Key data structures include:

- **Game State Representation:** Typically represented as a data structure that captures the current state of the game. For board games, this might involve a 2D array or a similar structure that holds information about the positions of pieces.

- **Moves:** A mechanism for representing and storing possible moves. This can be a list of coordinates, indices, or any data structure that encodes valid moves for a given state.

- **Game Tree:** The tree structure itself is fundamental. Each node in the tree contains information about a specific game state, and the edges represent possible moves.

### 4.2 Game State Representation
The design of the game state representation depends on the specific requirements of the game being modeled. For example:

- **Chess:** The game state could be represented as a 2D array where each element corresponds to a square on the chessboard, and the pieces are represented by specific symbols or numerical values.

- **Tic-Tac-Toe:** A simple 3x3 array could represent the board, with each element containing information about whether it's empty or occupied by a player's mark.

Efficiency considerations should be taken into account to ensure that the representation allows for quick and easy access to relevant information, such as piece positions, for move generation and evaluation.

### 4.3 Move Generation
A mechanism for generating possible moves is critical for the Min-Max algorithm. This involves analyzing the current game state and determining all legal moves available to the player.

- **Chess:** Move generation might involve checking the legal moves for each piece on the board, considering factors such as piece type, position, and board boundaries.

- **Tic-Tac-Toe:** Move generation is simpler here, as it only involves identifying empty spaces on the board.

### 4.4 Min-Max Implementation
Translating the pseudocode into a programming language involves creating functions that correspond to the pseudocode's structure. For example, in Python:

```python
def minimax(node, depth, maximizingPlayer):
    if depth == 0 or isTerminal(node):
        return evaluate(node)

    if maximizingPlayer:
        value = float('-inf')
        for child in node.children:
            value = max(value, minimax(child, depth - 1, False))
        return value
    else:
        value = float('inf')
        for child in node.children:
            value = min(value, minimax(child, depth - 1, True))
        return value
```
Here, ***node.children*** would represent the possible moves from the current state.

### 4.5 Alpha-Beta Pruning
Alpha-Beta Pruning is a technique used to optimize the Min-Max algorithm by reducing the number of nodes that need to be evaluated. When implementing Alpha-Beta Pruning:

- **Maintain Alpha and Beta Values:** Track the alpha (best value for the maximizing player) and beta (best value for the minimizing player) values during the recursive search.

- **Prune Unnecessary Branches:** If, during the search, it's determined that a branch does not contribute to the final decision (i.e., it won't affect the alpha-beta values), prune that branch, saving computational resources.

- **Update Alpha and Beta Values:** Update the alpha and beta values as the search progresses to guide the pruning.

The implementation of Alpha-Beta Pruning is an enhancement to the basic Min-Max algorithm and significantly improves its efficiency, especially in scenarios with a large decision tree.

## 5. Mini-Project: Tic-Tac-Toe with Min-Max Algorithm
### 5.1 Overview
The purpose of this mini-project is to create an interactive Tic-Tac-Toe game where users can play against an AI opponent powered by the Min-Max algorithm. The application consists of a backend built with Node.js and Express.js, featuring an API that receives the current state of the Tic-Tac-Toe game board and the next player's symbol (X or O). The backend employs the Min-Max algorithm to determine the optimal move for the AI opponent and returns the updated game state to the client.

<img src="https://raw.githubusercontent.com/proXDhiya/min-max-algorithm-simulation/98ccabccbeb7b61fbe80bf03d44c47ad978b5a02/images/image1.png" style="width: 70%; margin-left: 15%; margin-top: 20px;"/>

<p style="text-align: center"> Figure-1: Project architecture</p>


### 5.2 API for Game State Handling:
- **API Endpoints:** The backend features API endpoints responsible for receiving incoming requests from the client. These endpoints handle information about the current state of the Tic-Tac-Toe game board and the next player.

- **Min-Max Algorithm Integration:** The API integrates the Min-Max algorithm to calculate the optimal move for the AI opponent based on the received game state. This ensures the AI makes strategic decisions to challenge the player.

### 5.3 Client Application:
- **User Interface:** The client application features a user interface that allows users to play Tic-Tac-Toe against an AI opponent. The interface displays the current state of the game board and the next player's symbol (X or O).

- **Communication with Backend:** The client application communicates with the backend through API calls, sending information about the current game state (array of symbols) and the next player's symbol (X or O). The backend responds with the updated game state and timestamp.

### 5.4 Algorithm JS Code:
```js
function minimax(node, depth, maximizingPlayer) {
    if (depth == 0 || isTerminal(node)) {
        return evaluate(node);
    }

    if (maximizingPlayer) {
        let value = -Infinity;
        for (let child of node.children) {
            value = Math.max(value, minimax(child, depth - 1, false));
        }
        return value;
    } else {
        let value = Infinity;
        for (let child of node.children) {
            value = Math.min(value, minimax(child, depth - 1, true));
        }
        return value;
    }
}
```

### 5.5 Algorithm Implementation:
- **Game State Representation:** The game state is represented as a 2D array, where each element corresponds to a square on the Tic-Tac-Toe board. The elements contain information about whether they're empty or occupied by a player's mark.

- **Move Generation:** Move generation involves checking the legal moves for each empty square on the board.

- **Alpha-Beta Pruning:** The implementation of Alpha-Beta Pruning significantly improves the efficiency of the Min-Max algorithm, especially in scenarios with a large decision tree.

- **Evaluation Function:** The evaluation function considers factors such as the current position of pieces, control of the board, potential threats, and other relevant aspects of the game.

- **Turn-Taking:** The algorithm alternates between maximizing and minimizing nodes, assigning values to each node based on the objective function.

- **Terminal State:** The algorithm determines the terminal state by checking for win/loss conditions or draws.

- **Optimal Move:** The algorithm determines the optimal move by evaluating all possible moves and their outcomes, ultimately choosing the move associated with the most favorable outcome.

## 6. Application Demo
### 6.1 API

<img src="https://raw.githubusercontent.com/proXDhiya/min-max-algorithm-simulation/98ccabccbeb7b61fbe80bf03d44c47ad978b5a02/images/image2.png" style="width: 70%; margin-left: 15%; margin-top: 20px;"/>
<p style="text-align: center"> Figure-2: API endpoints</p>

### 6.2 Client Application

<img src="https://raw.githubusercontent.com/proXDhiya/min-max-algorithm-simulation/98ccabccbeb7b61fbe80bf03d44c47ad978b5a02/images/image3.png" style="width: 70%; margin-left: 15%; margin-top: 20px;"/>

<p style="text-align: center"> Figure-3: Client application</p>

<img src="https://raw.githubusercontent.com/proXDhiya/min-max-algorithm-simulation/98ccabccbeb7b61fbe80bf03d44c47ad978b5a02/images/image4.png" style="width: 70%; margin-left: 15%; margin-top: 20px;"/>

<p style="text-align: center"> Figure-4: Client application</p>

## 7. Conclusion
The Min-Max algorithm is a decision-making tool that helps players make optimal decisions in turn-based games with perfect information. The algorithm explores the decision space represented by the game tree, assigning values to nodes based on an objective function. The algorithm's recursive nature allows it to consider all possible moves and their outcomes, ultimately leading to optimal decision-making in turn-based games with perfect information.

## 8. References
- [Minimax Algorithm in Game Theory | Set 1 (Introduction)](https://www.geeksforgeeks.org/minimax-algorithm-in-game-theory-set-1-introduction/)
- [Minimax Algorithm in Game Theory | Set 2 (Introduction to Evaluation Function)](https://www.geeksforgeeks.org/minimax-algorithm-in-game-theory-set-2-evaluation-function/)
- [Minimax Algorithm in Game Theory | Set 3 (Tic-Tac-Toe AI – Finding optimal move)](https://www.geeksforgeeks.org/minimax-algorithm-in-game-theory-set-3-tic-tac-toe-ai-finding-optimal-move/)
- [Minimax Algorithm in Game Theory | Set 4 (Alpha-Beta Pruning)](https://www.geeksforgeeks.org/minimax-algorithm-in-game-theory-set-4-alpha-beta-pruning/)
- [Minimax Algorithm in Game Theory | Set 5 (Zobrist Hashing)](https://www.geeksforgeeks.org/minimax-algorithm-in-game-theory-set-5-zobrist-hashing/)
- [Minimax Algorithm in Game Theory | Set 6 (Evaluation Function)](https://www.geeksforgeeks.org/minimax-algorithm-in-game-theory-set-6-evaluation-function/)
- [Minimax Algorithm in Game Theory | Set 7 (Evaluation Function for Tic-Tac-Toe)](https://www.geeksforgeeks.org/minimax-algorithm-in-game-theory-set-7-evaluation-function-for-tic-tac-toe/)
