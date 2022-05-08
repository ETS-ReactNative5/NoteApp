import { StyleSheet, Text, TextInput, View, Image, ScrollView,KeyboardAvoidingView, Platform,TouchableOpacity,AsyncStorage} from 'react-native';
import React,  {useState, useEffect} from 'react';
import ImageBackground from 'react-native/Libraries/Image/ImageBackground';
import Note from './components/Note';
import ModalPoup from './components/Modal';
const bg = require('./assets/bg.jpg');

export default function App() {
  // TODO: Organize codebase better. Make it more readable & mantainable (Separate files for components)

  // Two useStates here, first handles invidual Note, second handles all Notes user has made. 
  const [task, setTask] = useState('');
  const [task2, setTask2] = useState('');
  const [taskItems, setTaskItems] = useState([]);
  const [visible, setVisible] = useState(false);
  const [tempIndex, setTempIndex] = useState(0);
  const [language, setLanguage] = useState(true);

// Adding a note to file & render
  const saveNote = async (note) => {
    const newNotes = [...taskItems, note]
    setTaskItems(newNotes);
    setTask(null);
    try{
      await AsyncStorage.setItem("Notes", JSON.stringify(newNotes));
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
      //alert(notes);
      if(notes !== null){
        // IF find notes then set them to taskItesms & render to screen 
        setTaskItems(JSON.parse(notes));
      }
    }catch(err){
      alert(err);
    }
  }
  // For updating notes that are stored in the AsyncStorage
  const updateStoredArray = async (array) =>{
    //const newNotes = [...taskItems, note]
    //setTaskItems(newNotes);
    //setTask(null);
    try{
      await AsyncStorage.setItem("Notes", JSON.stringify(array));
    }catch(err){
      alert(err);
    }
  }

  // Function get called when user presses pop up windows button to submit edited text.
  function editNote(){
    //PopUp visibility off as new note is saved.
    setVisible(false);
    // Find note that has to be edited
    let selected = taskItems[tempIndex];
    // New note
    let newNote = task2;
    // Get old array
    let itemsCopy = [...taskItems];

    if (selected !== -1) {
      itemsCopy[tempIndex] = newNote;
    }

    // Set new array of notes with modified element to local & file
    setTaskItems(itemsCopy);
    updateStoredArray(itemsCopy);
    // Clean temporary states
    setTempIndex(null);
    setTask2(null);
  }

  function openModal(index){
    // store index of opened note and then open modal popup.
    setTempIndex(index);
    setVisible(true);
  }
  const saveConfig = async () => {
    try{
      await AsyncStorage.setItem("Language", language);
    }catch(err){
      alert(err);
    }
  }
  // Get notes from file on app start
  useEffect(()=>{
    load()
  },[])

  return (
    <ImageBackground source={bg} resizeMode='cover'style={styles.container}>
      <ModalPoup visible={visible}>
      <TextInput multiline={true} placeholder={language ? 'New text here' : 'Uusi teksti tähän'} numberOfLines={4} value={task2} onChangeText={text => setTask2(text)} />
        <TouchableOpacity onPress={()=>{editNote(tempIndex)}} style={{width: 100, height: 40, borderRadius: 25, backgroundColor: 'white', bottom: -230,elevation: 3}}>
          <Text style={{alignSelf: 'center', padding: 10,fontSize: 15}}>Save</Text>
        </TouchableOpacity>
      </ModalPoup>

      <View style={styles.topContainer}>
        <View style={styles.header}>
          <Text style={{fontWeight: 'bold', fontSize: 25}}>{language ? 'Note' : 'Muistiinpano'}</Text>
          <Text style={{fontWeight: 'bold', fontSize: 25}}>{language ? 'Application' : 'Aplikaatio'}</Text>
        </View>
        <View style={styles.profile}>
          <View style={styles.imageContainer}>
            <Image style={{resizeMode: 'cover', width: 80, height: 80}} source={require('./images/minä.jpg')}></Image>
          </View>
          <View style={{flexDirection: 'row', left: 75,}}>
            <TouchableOpacity onPress={()=>{setLanguage(true)}} style={{width: 30, height: 30, backgroundColor: 'white', marginLeft: 20,marginTop:10, borderRadius: 20, overflow: 'hidden'}}>
              <Image style={{resizeMode: 'cover', width: 30, height: 30}} source={require('./images/usa.png')}></Image>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{setLanguage(false)}} style={{width: 30, height: 30, backgroundColor: 'white',marginLeft: 20,marginTop:10, borderRadius: 20, overflow: 'hidden'}}>
              <Image style={{resizeMode: 'cover', width: 30, height: 30}} source={require('./images/finland.png')}></Image>
            </TouchableOpacity>
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
                  <Note text={item}>
                  </Note>
                  <TouchableOpacity  onPress={() => openModal(index)} style={{width: 150, height: 30, backgroundColor: 'black', alignSelf:'center', bottom: 35,marginLeft: 20, borderBottomLeftRadius: 20,borderBottomRightRadius: 20, backgroundColor: '#FFA500'}}>
                    <Text style={{color: 'black', bottom: -13, alignSelf: 'center', fontWeight: 'bold'}}>{language ? 'Edit note' : 'Muokkaa'}</Text>
                  </TouchableOpacity>
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
        <TextInput style={styles.input} placeholder={language ? 'Write notes' : 'Kirjoita muistiinpano'} value={task} onChangeText={text => setTask(text)} />
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
