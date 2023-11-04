import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const del = require("../../assets/delete.png");

const Card = ({ title, handleDelete, color }) => {
  const getTitle = () => {
    if (title && title.length > 60) {
      return title.slice(0, 60) + "...";
    } else {
      return title;
    }
  };

  return (
    <View style={[{ backgroundColor: color }, styles.card]}>
      <Text style={styles.text}>{getTitle()}</Text>
      <TouchableOpacity style={styles.delBtn} onPress={handleDelete}>
        <Image source={del} style={styles.del} />
      </TouchableOpacity>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
    paddingHorizontal: 16,
    paddingVertical: 26,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    flex: 1,
    fontWeight: "600",
    // backgroundColor: "red",
  },
  delBtn: {
    // backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  del: {
    resizeMode: "contain",
    width: 30,
    height: 30,
  },
});
