import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'

const img = require("../../assets/image.gif");

const Blank = () => {
  return (
    <View style={styles.screen}>
        <Image source={img} style={styles.image} />
        <Text style={styles.text}>Nothing to see yet</Text>
    </View>
  )
}

export default Blank

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        resizeMode: "contain",
        width: "50%",
        height: "30%",
        aspectRatio: 1,
    },
    text: {
        color: "white",
        fontSize: 16,
    }
})