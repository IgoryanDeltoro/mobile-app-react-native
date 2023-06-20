import { Image, StyleSheet, TouchableOpacity, View, Text } from "react-native";

import { Fontisto } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";

const Item = ({ navigate, item, anchor }) => {
  const location = { latitude: 38.8951, longitude: -77.0364 };
  const switchBetweenPages = anchor === "PostsScreen" ? false : true;

  return (
    <View style={styles.postItem}>
      <Image style={styles.postImage} source={item.image} />
      <Text style={styles.title}>{item.title}</Text>
      <View
        style={{
          ...styles.postTabContainer,
          justifyContent: switchBetweenPages ? "space-between" : "flex-start",
        }}
      >
        <View style={styles.tabBox}>
          <TouchableOpacity
            style={{
              ...styles.commentBtn,
              marginRight: switchBetweenPages ? 24 : 49,
            }}
            onPress={() => {
              navigate("Comments");
            }}
          >
            <Fontisto
              name="comment"
              style={{ marginRight: 6 }}
              size={24}
              fill="#FF6C00"
              color="#FF6C00"
            />
            <Text style={styles.tabText}>3</Text>
          </TouchableOpacity>
          {switchBetweenPages && (
            <TouchableOpacity style={styles.likeBtn}>
              <AntDesign
                name="like2"
                style={{ marginRight: 6 }}
                size={24}
                color="#FF6C00"
              />
              <Text style={styles.tabText}>200</Text>
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity
          style={styles.locationBtn}
          onPress={() => {
            navigate("Map", { location });
          }}
        >
          <SimpleLineIcons
            name="location-pin"
            style={{ marginRight: 6 }}
            size={24}
            color="#BDBDBD"
          />
          <Text
            style={{
              ...styles.tabText,
              textDecorationLine: "underline",
            }}
          >
            {item.country}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  postTabContainer: { flexDirection: "row" },
  tabBox: { flexDirection: "row" },
  title: { marginBottom: 8 },
  commentBtn: { flexDirection: "row", alignItems: "center" },
  tabText: {
    fontFamily: "RobotoRegular",
    fontSize: 16,
    lineHeight: 19,
  },
  likeBtn: { flexDirection: "row", alignItems: "center" },
  locationBtn: { flexDirection: "row", alignItems: "center" },
});

export default Item;
