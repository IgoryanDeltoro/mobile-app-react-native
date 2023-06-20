import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { useRoute } from "./router";
import { useCallback, useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Main from "./components/Main";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";

export default function App({ navigation }) {
  const [isReady, setIsReady] = useState(false);

  SplashScreen.preventAutoHideAsync();

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          RobotoRegular: require("./assets/fonts/Roboto-Regular.ttf"),
          RobotoMedium: require("./assets/fonts/Roboto-Medium.ttf"),
          RobotoBold: require("./assets/fonts/Roboto-Bold.ttf"),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (isReady) {
      await SplashScreen.hideAsync();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  return (
    <Provider store={store}>
      <Main onLayout={onLayoutRootView} />
    </Provider>
  );
}
