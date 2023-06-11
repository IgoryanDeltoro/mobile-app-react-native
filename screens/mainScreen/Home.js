import React from "react";
import { TouchableOpacity, StyleSheet, Image } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import PostsScreen from "../nestedScreens/PostsScreen";
import CommentsScreen from "../nestedScreens/CommentsScreen";
import MapScreen from "../nestedScreens/MapScreen";

const NestedScreen = createStackNavigator();

const headerShown = { headerShown: false };
const headerStyle = {
  height: 88,
  borderBottomWidth: 1,
  borderBottomColor: "#b3b3b3",
};
const headerTitle = {
  textAlign: "center",
  fontSize: 17,
  lineHeight: 22,
  paddingVertical: 11,
};

const HomeScreen = () => {
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        options={{
          title: "Публикации",
          headerStyle,
          headerTitleStyle: {
            ...headerTitle,
            marginLeft: 140,
          },
          headerRight: () => (
            <TouchableOpacity
              style={styles.logoutBtn}
              // onPress={onPress}
            >
              <Image
                style={styles.logoutIcon}
                source={require("../../assets/images/log-out.png")}
              />
            </TouchableOpacity>
          ),
        }}
        name="PostsScreen"
        component={PostsScreen}
      />
      <NestedScreen.Screen
        options={{
          title: "Комментарии",
          headerStyle,
          headerTitleStyle: {
            ...headerTitle,
            marginLeft: 75,
          },
          tabBarStyle: { display: "none" },
        }}
        name="Comments"
        component={CommentsScreen}
      />
      <NestedScreen.Screen
        options={headerShown}
        name="Map"
        component={MapScreen}
      />
    </NestedScreen.Navigator>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  logoutBtn: { width: 24, height: 24, marginRight: 16 },
  logoutIcon: {
    width: 24,
    height: 24,
  },
});
