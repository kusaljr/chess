import { Toaster } from "sonner";
import Game from "./components/game";
import MiddleLeft from "./components/middle-left";
import MiddleRight from "./components/middle-right";
import TopComponent from "./components/top";
import { WebSocketProvider } from "./hooks/ws";
export default function App() {
  return (
    <WebSocketProvider url="ws://localhost:8080">
      <Toaster />
      <div className="bg-black h-screen w-screen">
        <TopComponent />
        <div className="grid grid-cols-3 gap-3 ">
          <MiddleLeft />
          <Game />
          <MiddleRight />
        </div>
      </div>
    </WebSocketProvider>
  );
}
