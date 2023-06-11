import { StatusBar } from "expo-status-bar";

import { NavigationContainer } from "@react-navigation/native";
import { useRoute } from "./router";
import { useState } from "react";

export default function App({ navigation }) {
  const route = useRoute(true);
  return <NavigationContainer>{route}</NavigationContainer>;
}
