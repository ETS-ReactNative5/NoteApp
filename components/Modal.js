import { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Modal, Animated } from 'react-native';
// 
const ModalPoup = ({visible, children}) => {
  // Käyttöohje pop up screenille react nativella: 
  // 1. Lisää tää tiedosto projektiisi
  // 2. Importtaa tää tiedosto haluttuun filuun, esim app.js
  // 3. Lisää muuttuja valitsemaasi filuun: const [visible, setVisible] = useState(false);
  // 4. Lisää <ModalPoup visible={visible}> *Tänne modalin viewit ja tekstit yms* </ModalPoup visible={visible}>
  // 5. Sit halutussa buttonissa vaan: onPress={ () => setVisible(true)} niin modal pop up pomppaa näytölle.
  
    const [showModal, setShowModal] = useState(visible);
    const scaleValue = useRef(new Animated.Value(0)).current;
  
    useEffect(()=> {
      toggleModal();
    }, [visible]);
    
    const toggleModal = () =>{
      if(visible){
        setShowModal(true);
        Animated.spring(scaleValue, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }else{
        setTimeout(() => setShowModal(false), 200);
        Animated.timing(scaleValue, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }
    }
    return( 
    <Modal transparent visible={showModal}>
      <View style={styles.modalBackground}>
        <Animated.View 
          style={[styles.modalContainer, {transform: [{scale: scaleValue}]}]}>
          {/*Tää children jostain syyst saa daycomponentissa olevat napit yms näkymään, jos tän poistaa ne ei näy siellä????*/}
          {children}
        </Animated.View>
      </View>
    </Modal>
    );
  };

  export default ModalPoup

  const styles = StyleSheet.create({
    modalBackground: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContainer: {
      width: 300,
      height: 600,
      backgroundColor: '#8a64d6',
      borderRadius: 25,
      borderBottomRightRadius: 5,
      shadowRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 20,
    }
  });