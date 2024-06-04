import { useChessAI } from "@/hooks/chessAi";
import { FontAwesome6 } from "@expo/vector-icons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";

interface NewGameComponentProps {
  bottomSheet: React.RefObject<BottomSheetModalMethods>;
}

export const NewGameComponent: React.FC<NewGameComponentProps> = ({
  bottomSheet,
}: NewGameComponentProps) => {
  const { setIsPlaying: setIsAiPlaying } = useChessAI();

  const randomOnline = () => {
    ToastAndroid.show("Not connected to server!", ToastAndroid.SHORT);
    return;
  };

  const joinRoom = () => {
    ToastAndroid.show("Not connected to server!", ToastAndroid.SHORT);
    return;
  };

  const playWithAI = () => {
    ToastAndroid.show("You're white, make your move!", ToastAndroid.SHORT);
    bottomSheet.current?.dismiss();
    setIsAiPlaying(true);
  };
  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        gap: 30,
      }}
    >
      <TouchableOpacity onPress={playWithAI} style={styles.button}>
        <MaterialCommunityIcons
          name="robot-angry-outline"
          size={24}
          color="white"
        />
        <Text style={{ color: "white" }}>Play with AI</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={randomOnline} style={styles.button}>
        <FontAwesome6 name="chess-knight" size={24} color="white" />
        <Text style={{ color: "white" }}>Random Online</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={joinRoom} style={styles.button}>
        <MaterialCommunityIcons
          name="gamepad-variant-outline"
          size={24}
          color="white"
        />
        <Text style={{ color: "white" }}>Join Room</Text>
      </TouchableOpacity>
    </View>
  );
};

const JoinRoomComponent = () => {
  return (
    <View>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          marginBottom: 10,
        }}
      >
        New Game
      </Text>
      <TextInput
        style={{
          marginBottom: 10,
          padding: 10,
          borderRadius: 5,
          paddingHorizontal: 10,
          backgroundColor: "rgb(229 231 235)",
        }}
        placeholder="Opponent's username"
      />
      <TouchableOpacity
        style={{
          padding: 10,
          backgroundColor: "rgb(31 41 55)",
          borderRadius: 5,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ color: "white", fontWeight: "600" }}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: "rgb(31 41 55)",
    width: 150,
    borderRadius: 8,
    gap: 8,

    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});
