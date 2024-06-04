import { Chess } from "chess.js";

export const pieceValue = {
  p: 10, // pawn
  n: 30, // knight
  b: 30, // bishop
  r: 50, // rook
  q: 90, // queen
  k: 900, // king
};

export const getBoardValue = (board: ReturnType<Chess["board"]>) => {
  let totalValue = 0;
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const piece = board[i][j];
      if (piece) {
        totalValue +=
          piece.color === "w"
            ? pieceValue[piece.type]
            : -pieceValue[piece.type];
      }
    }
  }
  return totalValue;
};

export const minimax = (
  game: Chess,
  depth: number,
  alpha: number,
  beta: number,
  isMaximizing: boolean
) => {
  if (depth === 0) {
    return -getBoardValue(game.board());
  }

  const possibleMoves = game.moves();

  if (isMaximizing) {
    let bestMove = -Infinity;
    possibleMoves.forEach((_, i) => {
      game.move(possibleMoves[i]);
      bestMove = Math.max(
        bestMove,
        minimax(game, depth - 1, alpha, beta, false)
      );
      game.undo();
      alpha = Math.max(alpha, bestMove);
      if (beta <= alpha) {
        return bestMove;
      }
    });
    return bestMove;
  } else {
    let bestMove = Infinity;
    possibleMoves.forEach((_, i) => {
      game.move(possibleMoves[i]);
      bestMove = Math.min(
        bestMove,
        minimax(game, depth - 1, alpha, beta, true)
      );
      game.undo();
      beta = Math.min(beta, bestMove);
      if (beta <= alpha) {
        return bestMove;
      }
    });
    return bestMove;
  }
};
