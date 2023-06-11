import React, { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TextInput,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";

import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";

const initialState = {
  login: "",
  email: "",
  password: "",
};

export default function RegistrationScreen({ navigation }) {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(true);
  const [state, setState] = useState(initialState);
  const [isReady, setIsReady] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          RobotoMedium: require("../../assets/fonts/Roboto-Medium.ttf"),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setIsShowKeyboard(false);
    });

    return () => {
      hideSubscription.remove();
    };
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

  const handleShowingPassword = () => {
    if (isShowPassword) {
      return setIsShowPassword(false);
    }
    return setIsShowPassword(true);
  };

  const handleFocus = (event) => {
    setIsFocused(event);
    setIsShowKeyboard(true);
  };

  const keyboardHide = () => {
    Keyboard.dismiss();
    const timerId = setTimeout(() => setIsShowKeyboard(false), 50);
    clearTimeout(timerId);
  };

  const reset = () => {
    setState(initialState);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          resizeMode="cover"
          style={styles.image}
          source={require("../../assets/images/nature.jpg")}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1, justifyContent: "flex-end" }}
          >
            <View onLayout={onLayoutRootView} style={styles.registerBox}>
              <View style={styles.photoBox}>
                <TouchableOpacity
                  style={styles.photoBtn}
                  // onPress={onPress}
                >
                  <Image
                    style={styles.photo}
                    source={require("../../assets/images/add-img.png")}
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.registerTitle}>Регистрация</Text>
              <View style={styles.form}>
                <View style={styles.inputBox}>
                  <TextInput
                    style={{
                      ...styles.input,
                      borderColor:
                        isFocused !== "login" ? "#E8E8E8" : "#FF6C00",
                    }}
                    onFocus={() => handleFocus("login")}
                    onBlur={() => setIsFocused("")}
                    placeholder="Логин"
                    value={state.login}
                    onChangeText={(value) =>
                      setState((prevState) => ({ ...prevState, login: value }))
                    }
                  />
                </View>
                <View style={styles.inputBox}>
                  <TextInput
                    style={{
                      ...styles.input,
                      borderColor:
                        isFocused !== "email" ? "#E8E8E8" : "#FF6C00",
                    }}
                    onFocus={() => handleFocus("email")}
                    onBlur={() => setIsFocused("")}
                    placeholder="Адрес электронной почты"
                    value={state.email}
                    onChangeText={(value) =>
                      setState((prevState) => ({ ...prevState, email: value }))
                    }
                  />
                </View>
                <View style={{ marginBottom: isShowKeyboard ? 32 : 43 }}>
                  <TextInput
                    style={{
                      ...styles.input,
                      borderColor:
                        isFocused !== "password" ? "#E8E8E8" : "#FF6C00",
                    }}
                    onFocus={() => handleFocus("password")}
                    onBlur={() => setIsFocused("")}
                    placeholder="Пароль"
                    secureTextEntry={isShowPassword}
                    value={state.password}
                    onChangeText={(value) =>
                      setState((prevState) => ({
                        ...prevState,
                        password: value,
                      }))
                    }
                  />
                  <TouchableOpacity
                    style={styles.passwordBtn}
                    onPress={() => handleShowingPassword()}
                  >
                    <Text style={styles.passwordText}>
                      {!isShowPassword ? "Скрыть" : "Показать"}
                    </Text>
                  </TouchableOpacity>
                </View>
                {!isShowKeyboard && (
                  <>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={handleOnSubmit}
                    >
                      <Text style={styles.btnText}>Зарегистрироваться</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => navigation.navigate("Login")}
                    >
                      <Text style={styles.loginText}>
                        Уже есть аккаунт? Войти
                      </Text>
                    </TouchableOpacity>
                  </>
                )}
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  registerBox: {
    position: "relative",
    paddingTop: 92,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#fff",
  },
  inputBox: {
    marginBottom: 16,
  },
  image: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  photoBox: {
    position: "absolute",
    width: 120,
    height: 120,
    left: 128,
    top: -60,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  photoBtn: {
    width: 25,
    height: 25,
    left: 107,
    top: 80,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 50,
    borderColor: "#FF6C00",
  },
  photo: {
    width: 13,
    height: 13,
  },
  input: {
    borderWidth: 1,
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    borderColor: "#E8E8E8",
    padding: 16,
    height: 50,
    borderRadius: 6,
    color: "#212121",
  },
  form: {
    marginHorizontal: 16,
  },
  registerTitle: {
    fontFamily: "RobotoMedium",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    letterSpacing: 0.01,
    color: "#212121",
    marginBottom: 32,
  },
  button: {
    marginBottom: 16,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 100,
    backgroundColor: "#FF6C00",
  },
  passwordBtn: {
    position: "absolute",
    right: 16,
    top: 16,
  },
  passwordText: {
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
  btnText: {
    textAlign: "center",
    color: "#FFFFFF",
    fontSize: 16,
    lineHeight: 19,
  },
  loginText: {
    marginBottom: 45,
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "#1B4371",
  },
});
