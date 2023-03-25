import { View, Text ,Image} from 'react-native'
import React, { useEffect } from 'react'
import Portals from './Portals'
import { useNavigation } from '@react-navigation/native'
import Login from './Login'

const SplashScreen = () => {
    
    const Navigation=useNavigation();
    useEffect(()=>{
        setTimeout(()=>{
            Navigation.navigate('Login');
        },5000)
    })
  return (
    
    <View style={{flex:1,backgroundColor:'white',display:'flex',alignItems:'center',justifyContent:'center'}}>
      <Image source={require('../screens/logo.jpg')} style={{width:250,height:180}}/>
    </View>
  )
}

export default SplashScreen;