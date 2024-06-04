import { Square } from "chess.js";
import React, { useCallback, useState } from "react";
import { Chessboard } from "react-chessboard";
import { useWebSocket } from "../hooks/ws";
import { GameMode, PayloadType } from "../types";
export default function Game() {
  const {
    sendMessage,
    roomId,
    moveData,
    color,
    playing,
    chessAi,
    gameMode,
    setMoveHistory,
    chess,
    setFen,
    fen,
  } = useWebSocket();

  const [over, setOver] = useState("");
  function onDrop(sourceSquare: Square, targetSquare: Square) {
    const moveData = {
      from: sourceSquare,
      to: targetSquare,
      // promotion: "q",
    };

    const move = makeAMove(moveData);
    if (roomId) {
      sendMessage(
        JSON.stringify({
          type: PayloadType.MOVE,
          id: roomId,
          data: moveData,
        })
      );
    }

    // illegal move
    if (move === null) return false;

    if (gameMode === GameMode.AI) {
      setMoveHistory((prev) => [...prev, moveData]);

      setTimeout(() => {
        chessAi(chess, setFen);
      }, 1000);
    }

    return true;
  }
  const makeAMove = useCallback(
    (move: { from: Square; to: Square }) => {
      try {
        const result = chess.move(move);
        setFen(chess.fen());
        console.log("over, checkmate", chess.isGameOver(), chess.isCheckmate());

        if (chess.isGameOver()) {
          if (chess.isCheckmate()) {
            setOver(
              `Checkmate! ${chess.turn() === "w" ? "black" : "white"} wins!`
            );
          } else if (chess.isDraw()) {
            setOver("Draw");
          } else {
            setOver("Game over");
          }
        }

        return result;
      } catch (e) {
        return null;
      }
    },
    [chess]
  );

  React.useEffect(() => {
    if (moveData) {
      makeAMove(moveData);
    }
  }, [moveData]);

  return (
    <div
      className={`w-[600px] z-0 ${
        !playing ? "pointer-events-none opacity-50" : ""
      }`}
    >
      <Chessboard
        boardOrientation={color}
        position={fen}
        onPieceDrop={onDrop}
      />

      {over && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 p-4 rounded-lg text-white">
          <h1>{over}</h1>
        </div>
      )}
    </div>
  );
}
