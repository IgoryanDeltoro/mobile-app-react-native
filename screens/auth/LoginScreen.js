import React, { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";

const initialState = {
  email: "",
  password: "",
};

export default function LoginScreen({ navigation }) {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [isShowPassword, setIsShowPassword] = useState(true);
  const [isFocused, setIsFocused] = useState("");

  useEffect(() => {
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setIsShowKeyboard(false);
    });

    return () => {
      hideSubscription.remove();
    };
  }, []);

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
    setIsShowKeyboard(false);
  };

  const reset = () => {
    setState(initialState);
  };

  return (
    <TouchableWithoutFeedback>
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
            <View style={styles.registerBox}>
              <Text style={styles.registerTitle}>Войти</Text>
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
                    value={state.email}
                    onChangeText={(value) =>
                      setState((prevState) => ({ ...prevState, email: value }))
                    }
                    placeholder="Адрес электронной почты"
                  />
                </View>
                <View
                  style={{
                    position: "relative",
                    marginBottom: isShowKeyboard ? 32 : 43,
                  }}
                >
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
                      <Text style={styles.btnText}>Войти</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => navigation.navigate("Registration")}
                    >
                      <Text style={styles.loginText}>
                        Нет аккаунта? Зарегистрироваться
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
    paddingTop: 32,
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
  btnText: {
    textAlign: "center",
    color: "#FFFFFF",
    fontSize: 16,
    lineHeight: 19,
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
  loginText: {
    marginBottom: 111,
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "#1B4371",
  },
});
