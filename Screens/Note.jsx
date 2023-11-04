import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";

import { useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Note = () => {
  const route = useRoute();
  const [title, setTitle] = useState(route.params?.data.title);
  const [desc, setDesc] = useState(route.params?.data.desc);
  const [editing, setEditing] = useState(false);
  const [originalTitle, setOriginalTitle] = useState(route.params?.data.title);

  useEffect(() => {
    if (route.params?.data) {
      setEditing(true);
      // console.log(true);
    } else {
      console.log(false);
      // setEditing(false);
    }
  }, []);

  const navigation = useNavigation();

  const handleTitleChange = (text) => {
    setTitle(text);
  };

  const handleDescChange = (text) => {
    setDesc(text);
  };

  const saveNote = async () => {
    console.log(title);
    if (title == null) {
      Alert.alert("Invalid Input", "Title must be filled.");
      return;
    }

    try {
      const savedNotes = await AsyncStorage.getItem("notes");
      const newNote = { title, desc };

      if (!editing) {
        if (savedNotes == null) {
          await AsyncStorage.setItem("notes", JSON.stringify([newNote]));
        } else {
          const prev = JSON.parse(savedNotes);
          const updatedNotes = [...prev, newNote];
          await AsyncStorage.setItem("notes", JSON.stringify(updatedNotes));
        }
      } else {
        if (savedNotes !== null) {
          const notes = JSON.parse(savedNotes);
          const index = notes.findIndex((note) => note.title === originalTitle);

          if (index !== -1) {
            notes[index] = newNote;
            console.log("Updated", notes);
            await AsyncStorage.setItem("notes", JSON.stringify(notes));
          }
        }
      }

      navigation.navigate("Home");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <TextInput
        placeholder="Title"
        style={styles.title}
        value={title}
        onChangeText={handleTitleChange}
        multiline
        placeholderTextColor="#737373"
      />
      <TextInput
        placeholder="Description"
        style={styles.desc}
        value={desc}
        onChangeText={handleDescChange}
        multiline
        placeholderTextColor="#737373"
      />

      <TouchableOpacity
        style={styles.saveButton}
        onPress={saveNote}
        activeOpacity={0.8}
      >
        <Text style={{ fontWeight: "bold" }}>Save</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Note;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#252525",
  },
  title: {
    fontSize: 38,
    padding: 16,
    paddingLeft: 16,
    color: "#FFFFFF",
    // backgroundColor: "red",
  },
  desc: {
    fontSize: 24,
    padding: 16,
    paddingLeft: 16,
    color: "#FFFFFF",
    // backgroundColor: "blue",
  },
  saveButton: {
    backgroundColor: "#FFFFFF",
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    position: "absolute",
    bottom: 30,
    right: 20,
  },
});
