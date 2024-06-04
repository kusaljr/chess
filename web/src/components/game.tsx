import { Chess, Square } from "chess.js";
import React, { useCallback, useMemo, useState } from "react";
import { Chessboard } from "react-chessboard";
import { useWebSocket } from "../hooks/ws";
import { PayloadType } from "../types";
export default function Game() {
  const { sendMessage, roomId, moveData, color } = useWebSocket();

  const chess = useMemo(() => new Chess(), []);
  const [fen, setFen] = useState(chess.fen());
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
        !roomId ? "pointer-events-none opacity-50" : ""
      }`}
    >
      <Chessboard
        boardOrientation={color}
        position={fen}
        onPieceDrop={onDrop}
      />
    </div>
  );
}
