import React, { useCallback, useEffect, useState } from "react";

import {
  TextInput,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  View,
  Text,
} from "react-native";

import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { AntDesign } from "@expo/vector-icons";

const { height, width } = Dimensions.get("window");
const textBoxWidth = width - 76;
const itemWidth = width - 32;

const allComments = [
  {
    id: "1",
    userName: "",
    userIcon: "",
    date: "09 июня, 2020 08:40",
    comment:
      "Really love your most recent photo. I’ve been trying to capture the same thing for a few months and would love some tips!",
  },

  {
    id: "2",
    userName: "me",
    userIcon: "",
    date: "09 июня, 2020 | 09:14",
    comment:
      "A fast 50mm like f1.8 would help with the bokeh. I’ve been using primes as they tend to get a bit sharper images.",
  },
  {
    id: "3",
    userName: "",
    userIcon: "",
    date: "09 июня, 2020 | 09:20",
    comment: "Thank you! That was very helpful!",
  },
];

const CommentsScreen = ({ navigation, route }) => {
  const [comment, setComment] = useState("");
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

  const handleCommentOnBtn = () => {
    console.log(comment);
    setComment("");
  };

  return (
    <View onLayout={onLayoutRootView} style={styles.container}>
      <Image style={styles.image} />
      <SafeAreaView style={{ flex: 1, width: itemWidth }}>
        <FlatList
          data={allComments}
          renderItem={({ item }) => (
            <View
              style={{
                ...styles.commentContainer,
                flexDirection: item.userName === "me" ? "row-reverse" : "row",
              }}
            >
              <Image
                style={{
                  ...styles.userIcon,
                  marginRight: item.userName === "me" ? 0 : 16,
                  marginLeft: item.userName === "me" ? 16 : 0,
                }}
              />
              <View
                style={{
                  ...styles.textBox,
                  borderTopLeftRadius: item.userName === "me" ? 6 : 0,
                  borderTopRightRadius: item.userName === "me" ? 0 : 6,
                }}
              >
                <Text style={styles.commentText}>{item.comment}</Text>
                <Text
                  style={{
                    ...styles.commentDate,
                    textAlign: item.userName === "me" ? "left" : "right",
                  }}
                >
                  {item.date}
                </Text>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={comment}
          placeholder="Комментировать..."
          onChangeText={setComment}
        />
        <TouchableOpacity onPress={handleCommentOnBtn} style={styles.sendBtn}>
          <AntDesign name="arrowup" size={20} color="#ffffff" />
        </TouchableOpacity>
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
  image: {
    width: itemWidth,
    height: 240,
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    marginBottom: 32,
  },
  commentContainer: {
    flexDirection: "row",
    marginBottom: 24,
  },
  textBox: {
    width: textBoxWidth,
    paddingHorizontal: 16,
    paddingVertical: 16,

    backgroundColor: "#F6F6F6",
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
  userIcon: {
    width: 28,
    height: 28,
    borderRadius: 50,
    backgroundColor: "#F6F6F6",
  },
  commentText: {
    fontFamily: "RobotoRegular",
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 8,
  },
  commentDate: {
    fontFamily: "RobotoRegular",
    fontSize: 10,
    lineHeight: 12,
    color: "#BDBDBD",
  },
  sendBtn: {
    position: "absolute",
    top: 8,
    right: 8,

    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    backgroundColor: "#FF6C00",
  },
  inputContainer: {
    // position: "relative",
    marginBottom: 16,
  },
  input: {
    height: 50,
    width: itemWidth,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 100,
    backgroundColor: "#F6F6F6",
  },
});

export default CommentsScreen;
