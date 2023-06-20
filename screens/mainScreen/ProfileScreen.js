import React, { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";

import Item from "../../components/Item";

const userPosts = [
  {
    id: "1",
    title: "Закат на Черном море",
    country: "Ukraine",
    image: require("../../assets/images/img-sunset.jpg"),
  },
  {
    id: "2",
    title: "Лес",
    country: "Ukraine",
    image: require("../../assets/images/img-mountains.jpg"),
  },
  {
    id: "3",
    title: "Лес",
    country: "Ukraine",
    image: require("../../assets/images/img-mountains.jpg"),
  },
];

const ProfileScreen = ({ navigation, route }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="cover"
        style={styles.image}
        source={require("../../assets/images/nature.jpg")}
      >
        <View style={styles.profileBox}>
          <TouchableOpacity
            style={styles.logoutBtn}
            // onPress={onPress}
          >
            <Image
              style={styles.logoutIcon}
              source={require("../../assets/images/log-out.png")}
            />
          </TouchableOpacity>
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
          <Text style={styles.userTitle}>Natali Romanova</Text>
          <FlatList
            data={userPosts}
            renderItem={({ item }) => (
              <Item
                item={item}
                navigate={navigation.navigate}
                anchor={route.name}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  profileBox: {
    flex: 1,
    marginTop: 147,
    position: "relative",
    paddingTop: 92,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  inputBox: {
    marginBottom: 16,
  },
  image: {
    flex: 1,
    justifyContent: "flex-end",
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
  logoutBtn: {
    width: 24,
    height: 24,
    position: "absolute",
    top: 22,
    right: 16,
  },
  logoutIcon: {
    width: 24,
    height: 24,
  },
  userTitle: {
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
});

export default ProfileScreen;
