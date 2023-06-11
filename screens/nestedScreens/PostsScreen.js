import React, { useCallback, useEffect, useState } from "react";

import {
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";

const PostsScreen = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          RobotoRegular: require("../../assets/fonts/Roboto-Regular.ttf"),
          RobotoMedium: require("../../assets/fonts/Roboto-Medium.ttf"),
          RobotoBold: require("../../assets/fonts/Roboto-Bold.ttf"),
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
    <View onLayout={onLayoutRootView} style={styles.container}>
      <View style={styles.userBox}>
        <Image
          style={styles.image}
          source={require("../../assets/images/user.jpg")}
        />
        <View style={styles.titleBox}>
          <Text style={styles.nameTitle}>Natali Romanova</Text>
          <Text style={styles.emailTitle}>email@example.com</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 32,
    backgroundColor: "#FFFFFF",
  },
  userBox: { flexDirection: "row", width: 171, alignItems: "center" },
  image: { width: 60, height: 60, borderRadius: 16 },
  titleBox: { marginLeft: 8 },
  nameTitle: {
    fontFamily: "RobotoBold",
    fontWeight: 700,
    fontSize: 13,
    lineHeight: 15,
  },
  emailTitle: {
    fontFamily: "RobotoRegular",
    fontSize: 11,
    lineHeight: 13,
  },
});

export default PostsScreen;
