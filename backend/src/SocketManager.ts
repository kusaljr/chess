import { User } from "./User";

export class SocketManager {
  private static instance: SocketManager;

  private ongoingGameRoom: Map<string, User[]>;

  constructor() {
    this.ongoingGameRoom = new Map<string, User[]>();
  }

  static getInstance(): SocketManager {
    if (!this.instance) {
      this.instance = new SocketManager();
    }
    return this.instance;
  }

  createRoomForGame(roomId: string, user: User[]) {
    this.ongoingGameRoom.set(roomId, user);
  }

  broadcast(gameId: string, message: string) {
    const users = this.ongoingGameRoom.get(gameId);
    if (!users) {
      return;
    }
    users.forEach((user) => user.socket.send(message));
  }
}
