import { BackHandler, StatusBar, Text, View,Image } from 'react-native'
import React, { useState ,useEffect} from 'react'
import Home from './screens/Home';
import Auction from './screens/Auction';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Register from './screens/Register';
import Portals from './screens/Portals';
import Organiser from './screens/Organiser';
import SplashScreen from './screens/SplashScreen';
import Login from './screens/Login';
import auth from '@react-native-firebase/auth';
import {firebase} from '@react-native-firebase/firestore';
import MyAuc from './screens/MyAuc';
import WonAuc from './screens/WonAuc';
import ChatScreen from './screens/ChatScreen';
import { useRoute } from '@react-navigation/native';
import Profile from './screens/Profile';
import StartScreen from './screens/StartScreen';
import Participants from './components/Participants';

console.disableYellowBox = true;

const Stack=createNativeStackNavigator();


const App=()=>{
  const [isLoggedin,setlogged]=useState('false');
  
    
    useEffect(()=>{
      StatusBar.setHidden(true);

      
      

    },[])


    return (
      <NavigationContainer>
        <Stack.Navigator>

        
      <Stack.Screen name='SplashScreen' component={SplashScreen} options={{headerShown:false}}/>
      <Stack.Screen name='StartScreen' component={StartScreen} options={{headerShown:false}}/>
        <Stack.Screen name='Login' component={Login} options={{headerShown:false}}/> 
        <Stack.Screen name='Register' component={Register} options={{headerShown:false}}/>
        
        <Stack.Screen name='Home' component={Home} options={{headerShown:false}}/>
        <Stack.Screen name='Auction' component={Auction} options={{headerShown:false}}/>
        <Stack.Screen name='Participants' component={Participants} options={{headerShown:false}}/>
        <Stack.Screen name='Organiser' component={Organiser} options={{headerShown:false}}/>
        <Stack.Screen name='Profile' component={Profile} options={{headerShown:false}}/>
        <Stack.Screen name='MyAuc' component={MyAuc} options={{headerShown:false}}/>
        <Stack.Screen name='WonAuc' component={WonAuc} options={{headerShown:false}}/>
        <Stack.Screen name='ChatScreen' component={ChatScreen} options={{headerShown:false}}/>
        
          
        </Stack.Navigator>
      </NavigationContainer>
    )
  }


export default App;