import React, {useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import Chessboard, {ChessboardRef} from 'react-native-chessboard';
import {useChess} from '../hooks/chess';

export const Game: React.FC = () => {
  const chessboardRef = useRef<ChessboardRef>(null);
  const {playing, moveData, makeMove, fen} = useChess();

  React.useEffect(() => {
    if (moveData && chessboardRef.current) {
      chessboardRef.current.move({
        from: moveData.from,
        to: moveData.to,
      });
    }
  }, [moveData]);

  React.useEffect(() => {
    if (!playing) {
      chessboardRef.current?.resetBoard();
    }
  }, [playing]);

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.chessboardContainer,
          !playing && styles.disabledChessboard,
          {
            pointerEvents: playing ? 'auto' : 'none',
          },
        ]}>
        <Chessboard
          onMove={({move, state}) => {
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
};

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
