import React from "react";

import { FlatList, Image, StyleSheet, View, Text } from "react-native";

import Item from "../../components/Item";

const PostsScreen = ({ navigation, route }) => {
  const userPosts = [
    {
      id: "1",
      title: "Закат на Черном море",
      country: "Ukraine",
      image: require("../../assets/images/img-sunset.jpg"),
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.userBox}>
        <Image
          style={styles.image}
          source={require("../../assets/images/user.jpg")}
        />
        <View style={styles.titleBox}>
          <Text style={styles.nameTitle}>Natali Romanova</Text>
          <Text style={styles.emailTitle}>email@example.com</Text>
        </View>
      </View>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 32,
    backgroundColor: "#FFFFFF",
  },
  userBox: {
    flexDirection: "row",
    width: 171,
    alignItems: "center",
    marginBottom: 32,
  },
  image: { width: 60, height: 60, borderRadius: 16 },
  titleBox: { marginLeft: 8 },
  nameTitle: {
    fontFamily: "RobotoBold",
    fontWeight: 700,
    fontSize: 13,
    lineHeight: 15,
  },
  emailTitle: {
    fontFamily: "RobotoRegular",
    fontSize: 11,
    lineHeight: 13,
  },
});

export default PostsScreen;
