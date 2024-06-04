import { v4 as uuidv4 } from "uuid";
import WebSocket from "ws";
import { GameManager } from "./GameManager";
import { User } from "./User";
import { CONNECTED, DISCONNECTED } from "./types";

const wss = new WebSocket.Server({ port: 8080 });

const gameManager = new GameManager();
wss.on("connection", (ws: WebSocket) => {
  ws.send(CONNECTED);

  const id = uuidv4();
  const user = new User(ws, id);
  gameManager.addUser(user);

  ws.send(JSON.stringify({ id: user.userId }));

  gameManager.logServer();
  ws.on("close", () => {
    gameManager.removeUser(ws);
    console.log(DISCONNECTED);
  });
});
