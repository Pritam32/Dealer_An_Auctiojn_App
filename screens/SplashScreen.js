import { View, Text ,Image} from 'react-native'
import React, { useEffect,useState } from 'react'
import Portals from './Portals'
import { useNavigation } from '@react-navigation/native'
import Login from './Login'
import auth from '@react-native-firebase/auth';
import {firebase} from '@react-native-firebase/firestore';

const SplashScreen = () => {
  const [isloggedin,setloggedin]=useState(false);
    const Navigation=useNavigation();
    useEffect(()=>{
      if(firebase.auth().currentUser!=null){
        firebase.firestore().collection('Users').doc(firebase.auth().currentUser.uid).get()
      .then(documentSnapshot=>{
          if(documentSnapshot.exists){
            setloggedin(documentSnapshot.data().logged_in);
          }
      })
      }
      setTimeout(()=>{
        isloggedin?Navigation.navigate('Portals'):Navigation.navigate('Login');
    },5000)
      
       
    })
  return (
    
    <View style={{flex:1,backgroundColor:'white',display:'flex',alignItems:'center',justifyContent:'center'}}>
      <Image source={require('../screens/logo.jpg')} style={{width:250,height:180}}/>
    </View>
  )
}

export default SplashScreen;