import { Square } from "chess.js";

export enum PayloadType {
  INIT_GAME = "init_game",
  MOVE = "move",
}
export const CONNECTED = "Connected!!!";
export const DISCONNECTED = "Disconnected!!!";
export const WAITING_FOR_OPPONENT = "Waiting for opponent";
export const INVALID_PAYLOAD = "Invalid Payload";
export const INVALID_DATA = "Invalid Data";
export const MESSAGE = "message";
export const ALREADY_WAITING = "You are already in the waiting list.";

export const NOT_YOUR_TURN = "Not your turn!";

export const ERROR_WHILE_MAKING_MOVE = "Error while making move";

export enum Color {
  WHITE = "w",
  BLACK = "b",
}

export interface Move {
  from: Square;
  to: Square;
}

export interface MessagePayload {
  type: PayloadType;
  id: string;
  data: Move;
}

export enum GameStatus {
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  ABANDONED = "ABANDONED",
}

export enum GameResult {
  WHITE_WINS = "WHITE_WINS",
  BLACK_WINS = "BLACK_WINS",
  DRAW = "DRAW",
}

export const DEFAULT_POSITION =
  "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
