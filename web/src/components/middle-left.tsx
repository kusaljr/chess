import { cn } from "@chess/lib/utils";
import { CrossIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { BiGlobe } from "react-icons/bi";
import { BsRobot } from "react-icons/bs";
import { ClockLoader } from "react-spinners";
import { toast } from "sonner";
import { useWebSocket } from "../hooks/ws";
import { GameMode, PayloadType } from "../types";
import ReportButton from "./buttons/report-button";

export default function MiddleLeft() {
  const {
    userId,
    roomId,
    sendMessage,
    setPlaying,
    setGameMode,
    playing,
    resetGame,
  } = useWebSocket();

  const [loading, setLoading] = useState(false);

  const newGameHandler = () => {
    if (!userId) {
      toast.error("You are not connected to the server");
      return;
    }

    if (roomId) {
      toast.error("You are already in a room");
      return;
    }

    sendMessage(
      JSON.stringify({
        type: PayloadType.INIT_GAME,
      })
    );

    setLoading(true);
  };

  const [loadingText, setLoadingText] = useState("Waiting for opponent");

  useEffect(() => {
    let dots = 0;
    const interval = setInterval(() => {
      setLoadingText(`Waiting for opponent${".".repeat(dots % 4)}`);
      dots += 1;
    }, 500);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  useEffect(() => {
    if (roomId) {
      setLoading(false);
      setGameMode(GameMode.MULTIPLAYER);
      setPlaying(true);
    }
  }, [roomId]);

  const aiGameHandler = () => {
    setPlaying(true);
    setGameMode(GameMode.AI);
  };

  const handleReset = () => {
    resetGame();
  };
  return (
    <div>
      <div className="p-20 grid grid-cols-2 gap-9 ">
        <button
          disabled={loading || playing}
          onClick={newGameHandler}
          className={cn(
            "cursor-pointer flex items-center justify-center w-40 h-28 p-6 bg-gray-900 rounded-lg shadow ",
            loading ? "bg-gray-800 cursor-wait" : "hover:bg-gray-800",
            playing && "bg-gray-800 cursor-not-allowed"
          )}
        >
          <div className="flex flex-col items-center">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-center text-white">
              <BiGlobe className="text-white" />
            </h5>
            <p className="font-normal text-gray-400 dark:text-gray-400">
              Play Online
            </p>
          </div>
        </button>
        <button
          disabled={loading || playing}
          onClick={aiGameHandler}
          className={cn(
            "cursor-pointer flex items-center justify-center w-40 h-28 p-6 bg-gray-900 rounded-lg shadow ",
            loading ? "bg-gray-800 cursor-wait" : "hover:bg-gray-800",
            playing && "bg-gray-800 cursor-not-allowed"
          )}
        >
          <div className="flex flex-col items-center">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-center text-white">
              <BsRobot className="text-white" />
            </h5>
            <p className="font-normal text-gray-400 dark:text-gray-400">
              Play With AI
            </p>
          </div>
        </button>
        <button
          onClick={handleReset}
          className={cn(
            "cursor-pointer flex items-center justify-center w-40 h-28 p-6 bg-gray-900 rounded-lg shadow hover:bg-gray-800",
            !playing && "bg-gray-800 cursor-not-allowed"
          )}
        >
          <div className="flex flex-col items-center">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-center text-white">
              <CrossIcon className="text-white" />
            </h5>
            <p className="font-normal text-gray-400 dark:text-gray-400">
              Reset
            </p>
          </div>
        </button>
        <ReportButton />
      </div>
      {loading && (
        <div className="col-span-2 flex items-center justify-center">
          <div className="flex flex-col items-center justify-center gap-5">
            <ClockLoader color="#36d7b7" />
            <p className="text-white text-xs">{loadingText}</p>{" "}
          </div>
        </div>
      )}
    </div>
  );
}
