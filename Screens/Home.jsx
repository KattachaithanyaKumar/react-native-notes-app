import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Image,
  Modal,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const info = require("../assets/info_outline.png");
const add = require("../assets/add.png");

import TempData from "../TempData";
import Card from "./components/Card";
import Blank from "./components/Blank";

import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Home = () => {
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();

  const getNotes = async () => {
    try {
      const notes = await AsyncStorage.getItem("notes");
      if (notes) {
        setData(JSON.parse(notes));
      }
    } catch (e) {
      console.error(e);
    }
  };
  getNotes();

  useEffect(() => {
    getNotes();
  }, []);

  const handleDelete = async (index) => {
    try {
      const newData = [...data];
      newData.splice(index, 1);
      setData(newData);
      console.log("Delete");
      await AsyncStorage.setItem("notes", JSON.stringify(newData));
    } catch (e) {
      console.error(e);
    }
  };

  const getItemBackgroundColor = (index) => {
    const colors = [
      "#FD99FF",
      "#FF9E9E",
      "#91F48F",
      "#FFF599",
      "#9EFFFF",
      "#B69CFF",
    ]; // Define your list of colors
    return colors[index % colors.length]; // Use modulus to cycle through the colors
  };

  const handleClearStorage = async () => {
    try {
      await AsyncStorage.clear();
      console.log("Storage cleared successfully");
    } catch (error) {
      console.error("Error clearing storage:", error);
    }
  };

  const gotoNotes = () => {
    // console.log("Button clicked");
    navigation.navigate("Note");
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.title}>Notes</Text>
        <TouchableOpacity
          style={styles.info}
          activeOpacity={0.6}
          onPress={() => setModalVisible(!modalVisible)}
        >
          <Image source={info} style={styles.infoImg} />
        </TouchableOpacity>
      </View>

      {data.length > 0 ? (
        <ScrollView>
          {data.map((data, index) => (
            <TouchableOpacity
              key={index}
              activeOpacity={0.8}
              onPress={() => navigation.navigate("Note", { data })}
            >
              <Card
                title={data.title}
                handleDelete={() => handleDelete(index)}
                color={getItemBackgroundColor(index)}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        <Blank />
      )}

      <TouchableOpacity
        style={styles.addBtn}
        activeOpacity={0.8}
        onPress={gotoNotes}
      >
        <Image source={add} style={styles.add} />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent
        backgroundColor={"red"}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          handleClearStorage();
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              <Text style={styles.bold}>Developed:</Text> Chaithanya Kumar
            </Text>
            <Text style={styles.modalText}>
              <Text style={styles.bold}>Figma design:</Text> Divya Kelaskar
            </Text>
            <Text style={styles.modalText}>
              <Text style={styles.bold}>Illustrations:</Text> AlexManokhi from
              Ouch!
            </Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#252525",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 26,
    paddingVertical: 20,
  },
  title: {
    color: "#fff",
    fontSize: 36,
    fontWeight: "400",
  },
  info: {
    backgroundColor: "#3B3B3B",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 12,
  },
  bold: {
    fontWeight: "bold",
    // fontSize: 16,
  },
  infoImg: {
    resizeMode: "contain",
  },
  addBtn: {
    // backgroundColor: "#fff",
    position: "absolute",
    bottom: 30,
    right: 20,
  },
  add: {
    backgroundColor: "#3B3B3B",
    borderRadius: 12,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "#3B3B3B",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#fff",
  },
  textStyle: {
    fontWeight: "bold",
    textAlign: "center",
    paddingHorizontal: 30,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color: "white",
  },
});
