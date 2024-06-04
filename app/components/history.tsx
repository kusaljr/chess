import { useChessAI } from "@/hooks/chessAi";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
export function History() {
  const { gameHistory, endGame } = useChessAI();

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={styles.header}>Moves History</Text>
        <TouchableOpacity
          style={{
            backgroundColor: "gray",
            padding: 8,
            borderRadius: 5,
          }}
          onPress={endGame}
        >
          <Text style={{ color: "white" }}>Reset Game</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollContainer}>
        {gameHistory
          .slice()
          .reverse()
          .map((move, index) => (
            <View key={index} style={styles.moveContainer}>
              <Text style={styles.moveText}>
                {gameHistory.length - index}. {move.from}
                <AntDesign name="right" size={14} color="white" />
                {move.to}
              </Text>
            </View>
          ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "black",
  },
  header: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    marginBottom: 10,
  },
  scrollContainer: {
    flex: 1,
  },
  moveContainer: {
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#dee2e6",
  },
  moveText: {
    color: "white",
    fontSize: 18,
  },
});
