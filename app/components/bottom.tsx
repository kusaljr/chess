import { useChess } from "@/hooks/chess";
import { useChessAI } from "@/hooks/chessAi";
import { Ionicons } from "@expo/vector-icons";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
  TouchableOpacity,
} from "@gorhom/bottom-sheet";
import { useCallback, useMemo, useRef, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import NewGameButton from "./buttons/new-game.button";
import { History } from "./history";
import { NewGameComponent } from "./new-game.component";

enum Mode {
  GAME = "GAME",
  BUG = "BUG",
}

export default function BottomComponent() {
  const { isPlaying } = useChess();
  const { isPlaying: isAiPlaying } = useChessAI();
  const [mode, setMode] = useState<Mode | undefined>();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ["100%", "100%"], []);
  const handlePresentModalPress = useCallback((mode: Mode) => {
    setMode(mode);
    bottomSheetModalRef.current?.present();
  }, []);
  return (
    <View style={{ marginTop: 200, flex: 1 }}>
      {isPlaying || isAiPlaying ? (
        <History />
      ) : (
        <BottomSheetModalProvider>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <NewGameButton
              openBottomSheet={() => handlePresentModalPress(Mode.GAME)}
            />
            <TouchableOpacity onPress={() => handlePresentModalPress(Mode.BUG)}>
              <View
                style={{
                  padding: 10,
                  borderRadius: 8,
                  backgroundColor: "rgb(31 41 55)",
                  width: 150,
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons name="bug-outline" size={24} color="white" />
                <Text style={{ color: "white" }}>Report bug</Text>
              </View>
            </TouchableOpacity>
          </View>

          <BottomSheetModal
            index={1}
            snapPoints={snapPoints}
            ref={bottomSheetModalRef}
          >
            <BottomSheetView style={styles.contentContainer}>
              {mode === Mode.GAME ? (
                <NewGameComponent bottomSheet={bottomSheetModalRef} />
              ) : (
                <BugForm />
              )}
            </BottomSheetView>
          </BottomSheetModal>
        </BottomSheetModalProvider>
      )}
    </View>
  );
}

const BugForm = () => {
  return (
    <View>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          marginBottom: 10,
        }}
      >
        Report a bug
      </Text>
      <TextInput
        style={{
          marginBottom: 10,
          padding: 10,
          borderRadius: 5,
          paddingHorizontal: 10,
          backgroundColor: "rgb(229 231 235)",
        }}
        placeholder="Name"
      />
      <TextInput
        style={{
          marginBottom: 10,
          padding: 10,
          borderRadius: 5,
          paddingHorizontal: 10,
          backgroundColor: "rgb(229 231 235)",
        }}
        placeholder="Describe the bug"
        multiline={true}
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
  container: {
    backgroundColor: "grey",
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
});
