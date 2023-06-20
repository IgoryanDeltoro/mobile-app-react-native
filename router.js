import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import RegistrationScreen from "./screens/auth/RegistrationScreen";
import LoginScreen from "./screens/auth/LoginScreen";
import HomeScreen from "./screens/mainScreen/Home";
import ProfileScreen from "./screens/mainScreen/ProfileScreen";
import CreatePostsScreen from "./screens/mainScreen/CreatePostsScreen";

import { AntDesign } from "@expo/vector-icons";

const MainStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

const headerShown = { headerShown: false };
const headerStyle = {
  height: 88,
  borderBottomWidth: 1,
  borderBottomColor: "#b3b3b3",
};
const tabBarStyle = {
  height: 83,
  paddingTop: 9,
  paddingHorizontal: 95,
};

export const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <MainStack.Navigator>
        <MainStack.Screen
          options={headerShown}
          name="Registration"
          component={RegistrationScreen}
        />
        <MainStack.Screen
          options={headerShown}
          name="Login"
          component={LoginScreen}
        />
      </MainStack.Navigator>
    );
  } else {
    return (
      <MainTab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          tabBarHideOnKeyboard: true,
          tabBarStyle,
          tabBarItemStyle: {
            width: 70,
            height: 40,
            borderRadius: 20,
          },
          tabBarActiveBackgroundColor: "#FF6C00",
        }}
        backBehavior="history"
      >
        <MainTab.Screen
          options={({ navigation }) => ({
            ...headerShown,
            tabBarIcon: ({ focused }) => (
              <AntDesign
                name="appstore-o"
                size={24}
                color={focused && "#fff"}
              />
            ),
            tabBarStyle: !navigation.getState().routes[0].state
              ? tabBarStyle
              : navigation
                  .getState()
                  .routes[0].state.routes.map((el) =>
                    el.name === "Comments" ? { display: "none" } : tabBarStyle
                  ),
          })}
          name="Home"
          component={HomeScreen}
        />
        <MainTab.Screen
          options={({ navigation }) => ({
            title: "Создать публикацию",
            headerStyle,
            headerTitleStyle: {
              textAlign: "center",
              fontSize: 17,
              lineHeight: 22,
              paddingVertical: 11,
              marginLeft: 58,
            },
            tabBarIcon: ({ focused }) => (
              <AntDesign name="plus" size={24} color={focused && "#fff"} />
            ),
            tabBarStyle: { display: "none" },
            headerLeft: () => (
              <TouchableOpacity
                style={{ width: 24, height: 24, marginLeft: 16 }}
                onPress={() => {
                  navigation.navigate("PostsScreen");
                }}
              >
                <AntDesign name="arrowleft" size={24} color="#212121" />
              </TouchableOpacity>
            ),
          })}
          name="CreatePosts"
          component={CreatePostsScreen}
        />
        <MainTab.Screen
          options={{
            ...headerShown,
            tabBarIcon: ({ focused, size, color }) => (
              <AntDesign name="user" size={24} color={focused && "#fff"} />
            ),
          }}
          name="Profile"
          component={ProfileScreen}
        />
      </MainTab.Navigator>
    );
  }
};
