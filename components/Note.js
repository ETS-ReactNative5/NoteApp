
import { View, Text, StyleSheet,TouchableOpacity, ImageBackground } from "react-native";
import React,  {useState} from 'react';
// Actual component
const Note = (props) => {
    const bg = require('../images/orangBG.png');

    return (
      
      <ImageBackground source={bg} resizeMode='cover' style={{height:220,width: 150, elevation: 3,padding: 15,overflow: "hidden",borderRadius: 20,flexDirection: 'row',alignItems: 'center',justifyContent: 'space-between', marginBottom: 20,marginLeft: 20,}}>
        <View style={styles.itemLeft}>
          <Text style={styles.itemText}>{props.text}</Text>
        </View>
      </ImageBackground>
    )
  }

{/* Styles.css of the component Task.js */}
const styles = StyleSheet.create({
    itemLeft: {
        width: '100%',
        top: 10,
        position: 'absolute',
        padding: 10,
    },
    itemText: {
        maxWidth: '90%',

    },    
});

export default Note;