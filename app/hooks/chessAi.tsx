import { Chess, Square } from "chess.js";
import { create } from "zustand";

interface ShortMove {
  from: Square;
  to: Square;
}

interface UseChessAI {
  fen: string;
  gameHistory: ShortMove[];
  makeMove: (move: ShortMove) => void;
  optimalMove: ShortMove | null;
  setOptimalMove: (move: ShortMove | null) => void;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  endGame: () => void;
}

interface Piece {
  type: "p" | "r" | "n" | "b" | "q" | "k"; // Pawn, Rook, Knight, Bishop, Queen, King
  color: "w" | "b"; // White or Black
}

// Define the type for the board

export const useChessAI = create<UseChessAI>((set, get) => {
  const isPlaying = false;
  const chessi = new Chess();
  const initialFen = chessi.fen();
  const reverseArray = function (array: number[][]) {
    return array.slice().reverse();
  };

  const whitePawnEval = [
    [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
    [5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0],
    [1.0, 1.0, 2.0, 3.0, 3.0, 2.0, 1.0, 1.0],
    [0.5, 0.5, 1.0, 2.5, 2.5, 1.0, 0.5, 0.5],
    [0.0, 0.0, 0.0, 2.0, 2.0, 0.0, 0.0, 0.0],
    [0.5, -0.5, -1.0, 0.0, 0.0, -1.0, -0.5, 0.5],
    [0.5, 1.0, 1.0, -2.0, -2.0, 1.0, 1.0, 0.5],
    [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
  ];

  const blackPawnEval = reverseArray(whitePawnEval);

  const knightEval = [
    [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0],
    [-4.0, -2.0, 0.0, 0.0, 0.0, 0.0, -2.0, -4.0],
    [-3.0, 0.0, 1.0, 1.5, 1.5, 1.0, 0.0, -3.0],
    [-3.0, 0.5, 1.5, 2.0, 2.0, 1.5, 0.5, -3.0],
    [-3.0, 0.0, 1.5, 2.0, 2.0, 1.5, 0.0, -3.0],
    [-3.0, 0.5, 1.0, 1.5, 1.5, 1.0, 0.5, -3.0],
    [-4.0, -2.0, 0.0, 0.5, 0.5, 0.0, -2.0, -4.0],
    [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0],
  ];

  const whiteBishopEval = [
    [-2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0],
    [-1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -1.0],
    [-1.0, 0.0, 0.5, 1.0, 1.0, 0.5, 0.0, -1.0],
    [-1.0, 0.5, 0.5, 1.0, 1.0, 0.5, 0.5, -1.0],
    [-1.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0, -1.0],
    [-1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0],
    [-1.0, 0.5, 0.0, 0.0, 0.0, 0.0, 0.5, -1.0],
    [-2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0],
  ];

  const blackBishopEval = reverseArray(whiteBishopEval);

  const whiteRookEval = [
    [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
    [0.5, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.5],
    [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
    [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
    [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
    [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
    [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
    [0.0, 0.0, 0.0, 0.5, 0.5, 0.0, 0.0, 0.0],
  ];

  const blackRookEval = reverseArray(whiteRookEval);

  const evalQueen = [
    [-2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
    [-1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -1.0],
    [-1.0, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -1.0],
    [-0.5, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -0.5],
    [0.0, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -0.5],
    [-1.0, 0.5, 0.5, 0.5, 0.5, 0.5, 0.0, -1.0],
    [-1.0, 0.0, 0.5, 0.0, 0.0, 0.0, 0.0, -1.0],
    [-2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
  ];

  const whiteKingEval = [
    [-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [-2.0, -3.0, -3.0, -4.0, -4.0, -3.0, -3.0, -2.0],
    [-1.0, -2.0, -2.0, -2.0, -2.0, -2.0, -2.0, -1.0],
    [2.0, 2.0, 0.0, 0.0, 0.0, 0.0, 2.0, 2.0],
    [2.0, 3.0, 1.0, 0.0, 0.0, 1.0, 3.0, 2.0],
  ];

  const blackKingEval = reverseArray(whiteKingEval);

  const calculateBestMove = function (chess: Chess, minimaxDepth = 2) {
    if (chess.turn() !== "b") {
      return;
    }
    var possibleNextMoves = chess.moves();
    var bestMove = -9999;
    var bestMoveFound;

    for (var i = 0; i < possibleNextMoves.length; i++) {
      var possibleNextMove = possibleNextMoves[i];
      chess.move(possibleNextMove);
      var value = minimax(chess, minimaxDepth, -10000, 10000, false);
      chess.undo();
      if (value >= bestMove) {
        bestMove = value;
        bestMoveFound = possibleNextMove;
      }
    }
    return bestMoveFound;
  };

  const minimax = function (
    chess: Chess,
    depth: number,
    alpha: number,
    beta: number,
    isMaximisingPlayer: boolean
  ) {
    if (depth === 0) {
      return -evaluateBoard(chess.board());
    }

    var possibleNextMoves = chess.moves();
    var numPossibleMoves = possibleNextMoves.length;

    if (isMaximisingPlayer) {
      var bestMove = -9999;
      for (var i = 0; i < numPossibleMoves; i++) {
        chess.move(possibleNextMoves[i]);
        bestMove = Math.max(
          bestMove,
          minimax(chess, depth - 1, alpha, beta, !isMaximisingPlayer)
        );
        chess.undo();
        alpha = Math.max(alpha, bestMove);
        if (beta <= alpha) {
          return bestMove;
        }
      }
    } else {
      var bestMove = 9999;
      for (var i = 0; i < numPossibleMoves; i++) {
        chess.move(possibleNextMoves[i]);
        bestMove = Math.min(
          bestMove,
          minimax(chess, depth - 1, alpha, beta, !isMaximisingPlayer)
        );
        chess.undo();
        beta = Math.min(beta, bestMove);
        if (beta <= alpha) {
          return bestMove;
        }
      }
    }

    return bestMove;
  };

  const evaluateBoard = function (board: any[][]) {
    var totalEvaluation = 0;
    for (var i = 0; i < 8; i++) {
      for (var j = 0; j < 8; j++) {
        totalEvaluation = totalEvaluation + getPieceValue(board[i][j], i, j);
      }
    }
    return totalEvaluation;
  };

  const getPieceValue = (piece: Piece, x: number, y: number) => {
    if (piece === null) {
      return 0;
    }
    const absoluteValue = getAbsoluteValue(piece, piece.color === "b", x, y);
    return piece.color === "b" ? absoluteValue : -absoluteValue;
  };

  const getAbsoluteValue = (
    piece: Piece,
    isWhite: boolean,
    x: number,
    y: number
  ) => {
    switch (piece.type) {
      case "p":
        return 10 + (isWhite ? whitePawnEval[y][x] : blackPawnEval[y][x]);
      case "r":
        return 50 + (isWhite ? whiteRookEval[y][x] : blackRookEval[y][x]);
      case "n":
        return 30 + knightEval[y][x];
      case "b":
        return 30 + (isWhite ? whiteBishopEval[y][x] : blackBishopEval[y][x]);
      case "q":
        return 90 + evalQueen[y][x];
      case "k":
        return 900 + (isWhite ? whiteKingEval[y][x] : blackKingEval[y][x]);
      default:
        throw new Error("Unknown piece type");
    }
  };

  return {
    fen: initialFen,
    gameHistory: [],
    optimalMove: null,
    setOptimalMove: (move: ShortMove | null) => set({ optimalMove: move }),

    makeMove: (move: ShortMove) => {
      // check if the move is from the player

      const chessInstance = new Chess(get().fen);
      if (chessInstance.move(move)) {
        console.log(chessInstance.ascii());

        set((state) => ({
          fen: chessInstance.fen(),
          gameHistory: [...state.gameHistory, move],
        }));

        const bestMove = calculateBestMove(chessInstance, 2);
        if (bestMove) {
          const move = chessInstance.move(bestMove);
          console.log("From: ", move.from);
          console.log("To: ", move.to);

          chessInstance.undo();

          set((state) => ({
            fen: chessInstance.fen(),
            optimalMove: { from: move.from, to: move.to },
          }));
        }
      }
    },

    endGame: () => {
      set({
        fen: initialFen,
        gameHistory: [],
        optimalMove: null,
        isPlaying: false,
      });
    },

    isPlaying,
    setIsPlaying: (isPlaying: boolean) => set({ isPlaying }),
  };
});
