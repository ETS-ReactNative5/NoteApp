import { StyleSheet, Text, TextInput, View, Image, ScrollView,KeyboardAvoidingView, Platform,TouchableOpacity,AsyncStorage} from 'react-native';
import React,  {useState, useEffect} from 'react';
import ImageBackground from 'react-native/Libraries/Image/ImageBackground';
import Note from './components/Note';

const bg = require('./assets/bg.jpg');

export default function App() {
  // Two useStates here, first handles invidual Note, second handles all Notes user has made. 
  const [task, setTask] = useState('');
  const [taskItems, setTaskItems] = useState([]);

// Adding a note to file & render
  const saveNote = async (note) => {
    setTaskItems([...taskItems, note]);
    setTask(null);
    try{
      await AsyncStorage.setItem("Notes", JSON.stringify(taskItems));
    }catch(err){
      alert(err);
    }
  }

// Delete a note from file & render
  const deleteNote = async (index) => {
    try{
      let itemsCopy = [...taskItems];
      itemsCopy.splice(index, 1);
      setTaskItems(itemsCopy);
      await AsyncStorage.setItem("Notes", JSON.stringify(itemsCopy))

    }catch(err){
      alert(err + "Moi");
    }
  }

  // Load all notes from file 
  const load = async () =>{
    try{
      // Get notes from file
      let notes = await AsyncStorage.getItem("Notes");
      alert(notes);
      if(notes !== null){
        // IF find notes then set them to taskItesms & render to screen 
        setTaskItems(JSON.parse(notes));
      }
    }catch(err){
      alert(err);
    }
  }
  // Get notes from file on app ssssssstsart
  useEffect(()=>{
    load()
    alert(taskItems.length);
  },[])

  return (
    <ImageBackground source={bg} resizeMode='cover'style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.header}>
          <Text style={{fontWeight: 'bold', fontSize: 25}}>Note</Text>
          <Text style={{fontWeight: 'bold', fontSize: 25}}>Application</Text>
        </View>
        <View style={styles.profile}>
          <View style={styles.imageContainer}>
            <Image style={{resizeMode: 'cover', width: 80, height: 80}} source={require('./minä.jpg')}></Image>
          </View>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <ScrollView style={styles.scrollView}>
          <View>
          <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap" }}>
        {
            // Map through tasks and display every task on screen. :)
            taskItems.map((item, index) => {
              return(
                <TouchableOpacity key={index} onPress={() => deleteNote(index)}>
                  <Note text={item}></Note>
                </TouchableOpacity>
                
              )
            })
          }
          </View>
          </View>
        </ScrollView>
      </View>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput style={styles.input} placeholder={'Write notes'} value={task} onChangeText={text => setTask(text)} />
        <TouchableOpacity onPress={() => saveNote(task)}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    flex: 1
  },
  topContainer: {
    height: '30%',
    width: '100%',
    top: 0,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  header: {
    fontWeight: 'bold',
    width: '50%',
    height: '50%',
    fontSize: 25,
    paddingLeft: 30,
    paddingTop: 50,
  },
  profile: {
    width: '50%',
    height: '50%',
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 50,
    borderColor: 'black',
    borderWidth: 2,
    overflow: 'hidden',
    position: 'absolute',
    right: 30,
    top: 50,

  },
  bottomContainer: {
  },
  scrollView: {
    height: '52%',
    paddingLeft: 30,
    paddingRight: 30,
  },
  writeTaskWrapper:{
    position: 'absolute',
    bottom: 30,
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input:{
    paddingVertical: 15,
    width: 250,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addWrapper:{
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText:{

  },

  });
