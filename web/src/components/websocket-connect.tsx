import React from "react";
import { useWebSocket } from "../hooks/ws";
import { PayloadType } from "../types";
import { InitGameButton } from "./buttons/init-game.button";

const WebSocketComponent: React.FC = () => {
  const { messages, isOpen, sendMessage } = useWebSocket();

  const handleSendMessage = () => {
    sendMessage(
      JSON.stringify({
        type: PayloadType.INIT_GAME,
      })
    );
  };

  return (
    <div>
      <h1>WebSocket Connection</h1>
      <div>
        <p>Status: {isOpen ? "Connected" : "Disconnected"}</p>
      </div>
      <div>
        <InitGameButton onClick={handleSendMessage} disabled={!isOpen} />
      </div>
      <div>
        <h2>Messages</h2>
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WebSocketComponent;
