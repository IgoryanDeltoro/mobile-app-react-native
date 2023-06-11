import React, { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Dimensions,
} from "react-native";

import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { Fontisto } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";

const { height, width } = Dimensions.get("window");
const itemWidth = width - 32;
const itemHeight = height - 147;

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

const ProfileScreen = ({ navigation }) => {
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
              <View style={styles.postItem}>
                <Image style={styles.postImage} source={item.image} />
                <Text style={styles.title}>{item.title}</Text>
                <View style={styles.postTabContainer}>
                  <View style={styles.tabBox}>
                    <View style={styles.commentBox}>
                      <TouchableOpacity
                        style={styles.commentBtn}
                        onPress={() => {
                          navigation.navigate("Comments");
                        }}
                      >
                        <Fontisto
                          name="comment"
                          style={{ marginRight: 6 }}
                          size={24}
                          fill="#FF6C00"
                          color="#FF6C00"
                        />
                      </TouchableOpacity>
                      <Text style={styles.tabText}>3</Text>
                    </View>
                    <View style={styles.likeBox}>
                      <AntDesign
                        name="like2"
                        style={{ marginRight: 6 }}
                        size={24}
                        color="#FF6C00"
                      />
                      <Text style={styles.tabText}>200</Text>
                    </View>
                  </View>
                  <View style={styles.locationBox}>
                    <TouchableOpacity
                      style={styles.locationBtn}
                      onPress={() => {}}
                    >
                      <SimpleLineIcons
                        name="location-pin"
                        style={{ marginRight: 6 }}
                        size={24}
                        color="#BDBDBD"
                      />
                    </TouchableOpacity>
                    <Text
                      style={{
                        ...styles.tabText,
                        textDecorationLine: "underline",
                      }}
                    >
                      {item.country}
                    </Text>
                  </View>
                </View>
              </View>
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
  postItem: { marginBottom: 32 },
  postImage: {
    width: "100%",
    height: 240,
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    marginBottom: 8,
  },
  postTabContainer: { flexDirection: "row", justifyContent: "space-between" },
  tabBox: { flexDirection: "row" },
  commentBox: { flexDirection: "row", marginRight: 24, alignItems: "center" },
  title: { marginBottom: 8 },
  commentBtn: {},
  tabText: {
    fontFamily: "RobotoRegular",
    fontSize: 16,
    lineHeight: 19,
  },
  locationBox: { flexDirection: "row", alignItems: "center" },
  likeBox: { flexDirection: "row", alignItems: "center" },
  locationBtn: {},
});

export default ProfileScreen;
