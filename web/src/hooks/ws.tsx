import { Square } from "chess.js";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { BoardOrientation } from "react-chessboard/dist/chessboard/types";

interface MoveData {
  from: Square;
  to: Square;
}
interface WebSocketContextType {
  messages: string[];
  isOpen: boolean;
  sendMessage: (message: string) => void;
  roomId: string | null;
  moveData: MoveData | null;
  userId: string | null;
  moveHistory: MoveData[];
  color: BoardOrientation | undefined;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(
  undefined
);

interface WebSocketProviderProps {
  url: string;
  children: ReactNode;
}

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({
  url,
  children,
}) => {
  const [messages, setMessages] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [moveData, setMoveData] = useState<MoveData | null>(null);

  const [moveHistory, setMoveHistory] = useState<MoveData[]>([]);
  const [color, setColor] = useState<BoardOrientation | undefined>();

  const [roomId, setRoomId] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    ws.current = new WebSocket(url);

    ws.current.onopen = () => {
      setIsOpen(true);
      console.log("WebSocket is open now.");
    };

    ws.current.onclose = () => {
      setIsOpen(false);
      console.log("WebSocket is closed now.");
    };

    ws.current.onmessage = (event: MessageEvent) => {
      setMessages((prevMessages) => [...prevMessages, event.data]);

      try {
        const payload = JSON.parse(event.data);
        console.log(payload);

        if (payload.id) {
          setUserId(payload.id);
        }

        if (payload.roomId) {
          setColor(payload.color);
          setRoomId(payload.roomId);
        }

        if (payload.from && payload.to) {
          setMoveData(payload);
          setMoveHistory((prevMoveHistory) => [...prevMoveHistory, payload]);
        }
      } catch (error) {
        console.log(error);
      }
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket error: ", error);
    };

    return () => {
      ws.current?.close();
    };
  }, [url]);

  const sendMessage = (message: string) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(message);
    } else {
      console.error("WebSocket is not open.");
    }
  };

  return (
    <WebSocketContext.Provider
      value={{
        messages,
        color,
        isOpen,
        sendMessage,
        roomId,
        moveData,
        userId,
        moveHistory,
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = (): WebSocketContextType => {
  const context = useContext(WebSocketContext);
  if (context === undefined) {
    throw new Error("useWebSocket must be used within a WebSocketProvider");
  }
  return context;
};
