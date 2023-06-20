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
  KeyboardAvoidingView,
  Dimensions,
} from "react-native";

import * as Location from "expo-location";
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { useHeaderHeight } from "@react-navigation/elements";
import getCoordinateAddress from "../../services/api/convertAddress";

import { AntDesign } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

const { height, width } = Dimensions.get("window");
const itemWidth = width - 32;

const initialState = {
  name: "",
  location: "",
};

const CreatePostsScreen = ({ navigation, route }) => {
  const [state, setState] = useState(initialState);
  const [location, setLocation] = useState(null);
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [status, requestPermission] = Camera.useCameraPermissions();
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  useEffect(() => {
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setIsShowKeyboard(false);
    });

    return () => {
      hideSubscription.remove();
    };
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync({});
      const coords = {
        longitude: location.coords.longitude,
        latitude: location.coords.latitude,
      };
      setLocation(coords);
    })();
  }, []);

  const takePhoto = async () => {
    const { uri } = await camera.takePictureAsync();
    setPhoto(uri);
    getAddress();
  };

  const getAddress = async () => {
    const address = await getCoordinateAddress(location);
    const country = address.split(",").splice(-1).join("");

    setState((prevState) => ({
      ...prevState,
      location: country,
    }));
  };

  const handleOnSubmit = () => {
    navigation.navigate("PostsScreen", { ...state, photo, location });
    reset();
  };

  const reset = () => {
    setPhoto(false);
    setState(initialState);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={
            isShowKeyboard && {
              flex: 1,
              width: itemWidth,
              position: "absolute",
              right: 16,
              left: 16,
              top: 0,
            }
          }
        >
          <View style={styles.cameraBox}>
            <Camera
              type={CameraType.back}
              style={styles.camera}
              ref={setCamera}
            >
              <TouchableOpacity
                onPress={takePhoto}
                style={styles.snapContainer}
              >
                <FontAwesome name="camera" size={24} color="#BDBDBD" />
              </TouchableOpacity>
              {photo && <Image style={styles.image} source={{ uri: photo }} />}
            </Camera>
          </View>
          <Text style={styles.actionTitle}>Загрузите фото</Text>
          <TextInput
            style={{ ...styles.input, marginBottom: 16 }}
            onChangeText={(value) =>
              setState((prevState) => ({ ...prevState, name: value }))
            }
            value={state.name}
            placeholder="Название..."
            onFocus={() => setIsShowKeyboard(true)}
          />
          <View style={{ position: "relative" }}>
            <TextInput
              style={{ ...styles.input, marginBottom: 32, paddingLeft: 28 }}
              onChangeText={(value) =>
                setState((prevState) => ({ ...prevState, location: value }))
              }
              value={state.location}
              placeholder="Местность..."
              onFocus={() => setIsShowKeyboard(true)}
            />
            <TouchableOpacity
              style={styles.locationBtn}
              onPress={() => {
                navigation.navigate("Map", { location });
              }}
            >
              <SimpleLineIcons name="location-pin" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          </View>
          {!isShowKeyboard && (
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
          )}
        </KeyboardAvoidingView>
        {!isShowKeyboard && (
          <View style={styles.bottomView}>
            <TouchableOpacity style={styles.deleteBtn} onPress={reset}>
              <AntDesign name="delete" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          </View>
        )}
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
  cameraBox: {
    width: itemWidth,
    height: 240,
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    // borderWidth: 1,
    borderColor: "#E8E8E8",
    marginBottom: 8,
    overflow: "hidden",
  },
  camera: { flex: 1 },
  image: {
    width: itemWidth,
    height: 240,
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    // borderWidth: 1,
    borderColor: "#E8E8E8",
    marginBottom: 8,
  },
  snapContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: (itemWidth - 60) / 2,
    right: (itemWidth - 60) / 2,
    zIndex: 10,
    marginTop: 90,
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
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
