import { WebSocket } from "ws";
import { Game } from "./Game";
import { SocketManager } from "./SocketManager";
import {
  ALREADY_WAITING,
  Color,
  GameStarted,
  INVALID_DATA,
  INVALID_PAYLOAD,
  MESSAGE,
  MessagePayload,
  PayloadType,
  WAITING_FOR_OPPONENT,
} from "./types";
import { User } from "./User";

export class GameManager {
  private games: Game[];

  private users: User[];

  private waitingUsers: User[];

  constructor() {
    this.users = [];
    this.waitingUsers = [];
    this.games = [];
  }

  addUser(user: User) {
    this.users.push(user);
    this.handler(user);
  }

  removeUser(socket: WebSocket) {
    const user = this.users.find((user) => user.socket === socket);
    if (!user) {
      console.error("User not found?");
      return;
    }
    this.users = this.users.filter((user) => user.socket !== socket);

    // Remove user from waiting list
    this.waitingUsers = this.waitingUsers.filter(
      (waitingUser) => waitingUser.userId !== user.userId
    );

    // Remove user from games
    this.games = this.games.filter(
      (game) =>
        game.white.userId !== user.userId && game.black.userId !== user.userId
    );
  }

  logServer() {
    const users = this.users.map((user) => user.userId);
    const count = this.users.length;
    console.log({ users, count });
  }

  private handler(user: User) {
    user.socket.on(MESSAGE, (message) => {
      try {
        const { type, data, id }: MessagePayload = JSON.parse(
          message.toString()
        );

        switch (type) {
          case PayloadType.INIT_GAME:
            // Check if user is already in the waiting list
            if (this.waitingUsers.includes(user)) {
              user.socket.send(ALREADY_WAITING);
              return;
            }
            // Check if other user is already in the waiting list
            // if yes then pair them up
            if (this.waitingUsers.length) {
              const opponent = this.waitingUsers.pop();
              if (opponent) {
                // start the games
                const game = new Game(user, opponent);
                user.socket.send(
                  GameStarted(opponent, game.gameId, Color.WHITE)
                );
                opponent.socket.send(
                  GameStarted(user, game.gameId, Color.BLACK)
                );
                SocketManager.getInstance().createRoomForGame(game.gameId, [
                  user,
                  opponent,
                ]);
                this.games.push(game);
              }
            } else {
              // Add user to waiting list
              this.waitingUsers.push(user);
              user.socket.send(WAITING_FOR_OPPONENT);
            }
            break;

          case PayloadType.MOVE:
            const game = this.games.find((game) => game.gameId === id);
            if (game) {
              game.makeMove(user, data);
            }
            break;

          default:
            user.socket.send(INVALID_PAYLOAD);
            break;
        }
      } catch (error) {
        user.socket.send(INVALID_DATA);
      }
    });
  }
}
