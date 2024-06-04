import BottomComponent from "@/components/bottom";
import Game from "@/components/game";
import TopComponent from "@/components/top";
import { WebSocketProvider } from "@/hooks/chess";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView>
      <WebSocketProvider url="ws://192.168.1.66:8080">
        <View
          style={{
            backgroundColor: "black",
            flex: 1,
            justifyContent: "center",
          }}
        >
          <TopComponent />
          <Game />
          <BottomComponent />
        </View>
      </WebSocketProvider>
    </GestureHandlerRootView>
  );
}
