import { AntDesign } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

interface NewGameButtonProps {
  openBottomSheet: () => void;
}
export default function NewGameButton({ openBottomSheet }: NewGameButtonProps) {
  // ref

  return (
    <TouchableOpacity onPress={openBottomSheet}>
      <View
        style={{
          padding: 10,
          backgroundColor: "rgb(31 41 55)",
          width: 150,
          borderRadius: 8,

          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <AntDesign name="plus" size={24} color="white" />
        <Text style={{ color: "white" }}>New Game</Text>
      </View>
    </TouchableOpacity>
  );
}
