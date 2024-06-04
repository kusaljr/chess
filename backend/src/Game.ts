import { Chess } from "chess.js";
import { SocketManager } from "./SocketManager";
import { User } from "./User";
import { compositeUUID } from "./helper";
import {
  ERROR_WHILE_MAKING_MOVE,
  GameResult,
  GameStatus,
  Move,
  NOT_YOUR_TURN,
} from "./types";

export class Game {
  public gameId: string;
  public black: User;
  public white: User;
  private gameResult?: GameResult;

  private gameStatus: GameStatus;

  public chessBoard: Chess;

  constructor(white: User, black: User) {
    // Give unique gameid to game
    this.gameId = compositeUUID(white.userId, black.userId);

    // Set Players
    this.black = black;
    this.white = white;

    // Initialize Game Board
    this.chessBoard = new Chess();

    // Set Game Status to In Progress
    this.gameStatus = GameStatus.IN_PROGRESS;

    this.displayBoard();
  }

  displayBoard() {
    console.log(this.chessBoard.ascii());
  }

  makeMove(user: User, move: Move) {
    // validate the user turn
    if (this.chessBoard.turn() === "w" && user.userId !== this.white.userId) {
      user.socket.send(NOT_YOUR_TURN);
      return;
    }

    if (this.chessBoard.turn() === "b" && user.userId !== this.black.userId) {
      user.socket.send(NOT_YOUR_TURN);
      return;
    }

    try {
      this.chessBoard.move({
        from: move.from,
        to: move.to,
      });

      this.displayBoard();
      SocketManager.getInstance().broadcast(this.gameId, JSON.stringify(move));
    } catch (error) {
      user.socket.send(ERROR_WHILE_MAKING_MOVE);
    }
  }
}
