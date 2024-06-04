import { useChess } from "@/hooks/chess";
import { useChessAI } from "@/hooks/chessAi";
import React, { useRef } from "react";
import { StyleSheet, View } from "react-native";
import Chessboard, { ChessboardRef } from "react-native-chessboard";

export default function Game() {
  const { makeMove, optimalMove, isPlaying: isAiPlaying, fen } = useChessAI();

  const { isPlaying } = useChess();

  const chessboardRef = useRef<ChessboardRef>(null);

  React.useEffect(() => {
    if (optimalMove) {
      chessboardRef.current?.move({
        from: optimalMove.from,
        to: optimalMove.to,
      });
    }
  }, [optimalMove]);

  React.useEffect(() => {
    if (!isPlaying || !isAiPlaying) {
      chessboardRef.current?.resetBoard();
    }
  }, [isPlaying, isAiPlaying]);

  return (
    <View style={styles.container}>
      <View
        style={[styles.chessboardContainer]}
        pointerEvents={isPlaying || isAiPlaying ? "auto" : "none"}
      >
        <Chessboard
          onMove={({ move }) => {
            makeMove({
              from: move.from,
              to: move.to,
            });
          }}
          fen={fen}
          ref={chessboardRef}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chessboardContainer: {
    flex: 1,
  },
  disabledChessboard: {
    opacity: 0.8,
  },
});
