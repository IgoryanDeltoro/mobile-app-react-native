import React, { useCallback, useEffect, useState } from "react";

import {
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";

import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { AntDesign } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";

const { height, width } = Dimensions.get("window");
const itemWidth = width - 32;

const initialState = {
  name: "",
  location: "",
};

const CreatePostsScreen = ({ navigation }) => {
  const [state, setState] = useState(initialState);
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

  const handleOnSubmit = () => {
    console.log(state);
    reset();
  };

  const reset = () => {
    setState(initialState);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View onLayout={onLayoutRootView} style={styles.container}>
        <Image style={styles.image} />
        <Text style={styles.actionTitle}>Загрузите фото</Text>
        <View>
          <View>
            <TextInput
              style={{ ...styles.input, marginBottom: 16 }}
              onChangeText={(value) =>
                setState((prevState) => ({ ...prevState, name: value }))
              }
              value={state.name}
              placeholder="Название..."
            />
            <View style={{ position: "relative" }}>
              <TextInput
                style={{ ...styles.input, marginBottom: 32, paddingLeft: 28 }}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, location: value }))
                }
                value={state.location}
                placeholder="Местность..."
              />
              <TouchableOpacity
                style={styles.locationBtn}
                onPress={() => {
                  navigation.navigate("Map");
                }}
              >
                <SimpleLineIcons
                  name="location-pin"
                  size={24}
                  color="#BDBDBD"
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={{
                ...styles.button,
                backgroundColor:
                  state.name && state.location ? "#FF6C00" : "#F6F6F6",
              }}
              disabled={state.name && state.location ? false : true}
              onPress={handleOnSubmit}
            >
              <Text
                style={{
                  ...styles.btnText,
                  color: state.name && state.location ? "#ffffff" : "#BDBDBD",
                }}
              >
                Опубликовать
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.bottomView}>
          <TouchableOpacity
            style={styles.deleteBtn}
            // onPress={() => }
          >
            <AntDesign name="delete" size={24} color="#BDBDBD" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",

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
    marginBottom: 8,
  },
  actionTitle: {
    fontFamily: "RobotoRegular",
    fontSize: 16,
    lineHeight: 19,
    marginBottom: 32,
    color: "#BDBDBD",
  },
  input: {
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
  },
  locationBtn: {
    position: "absolute",
    top: 10,
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 100,
  },
  btnText: {
    textAlign: "center",
    fontSize: 16,
    lineHeight: 19,
  },
  emailTitle: {
    fontFamily: "RobotoRegular",
    fontSize: 11,
    lineHeight: 13,
  },
  bottomView: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 0,
    height: 83,
    width: itemWidth,
  },
  deleteBtn: {
    marginRight: "auto",
    marginLeft: "auto",
    marginTop: 9,
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F6F6F6",
  },
});

export default CreatePostsScreen;
