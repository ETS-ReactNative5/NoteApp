
import { View, Text, StyleSheet,TouchableOpacity, ImageBackground } from "react-native";
import React,  {useState} from 'react';
// Actual component
const Note = (props) => {
    const bg = require('../orangBG.png');
    const [bgSet,setBgSet] = useState(true)
    const [title, setTitle] = useState(0);

    return (
      
      <ImageBackground source={bg} resizeMode='cover' style={{height:220,width: 150, elevation: 3,padding: 15,overflow: "hidden",borderRadius: 20,flexDirection: 'row',alignItems: 'center',justifyContent: 'space-between', marginBottom: 20,marginLeft: 20,}}>
        <View style={styles.itemLeft}>
          <Text style={styles.itemText}>{props.text}</Text>
        </View>
        <View style={styles.bottomContainer}>
          <TouchableOpacity style={styles.btn}>

          </TouchableOpacity>
          <TouchableOpacity style={styles.btn}>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    )
  }

{/* Styles.css of the component Task.js */}
const styles = StyleSheet.create({
    itemLeft: {
        width: '100%',
        top: 10,
        position: 'absolute'
    },
    itemText: {
        maxWidth: '90%',

    },    
    bottomContainer: {
      flex:1,
      flexDirection: 'row',
      position: 'absolute',
      bottom: 0,
      width: '95%',
      height: '10%',
    },
    btn: {
      width: 30,
      height: 30,
      borderRadius: 20,
      backgroundColor: 'cyan',
      marginLeft: 30,
      bottom: 30,
    },
});

export default Note;