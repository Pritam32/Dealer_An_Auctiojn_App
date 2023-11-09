import { View, Text ,Image} from 'react-native'
import React, { useEffect,useState } from 'react'
import Portals from './Portals'
import Home from './Home'
import { useNavigation } from '@react-navigation/native'
import Login from './Login'
import auth from '@react-native-firebase/auth';
import {firebase} from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage'
import StartScreen from './StartScreen'

const SplashScreen = () => {
 
    const Navigation=useNavigation();
    useEffect(()=>{
      
      setTimeout(()=>{
        Navigation.navigate('StartScreen');
    },5000)
      
       
    })

  return (
    
    <View style={{flex:1,backgroundColor:'black',display:'flex',alignItems:'center',justifyContent:'center'}}>
      <Image source={require('../screens/Dealer_logo.png')} style={{width:250,height:180}}/>
    </View>
  )
}

export default SplashScreen;