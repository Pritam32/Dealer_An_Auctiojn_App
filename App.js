import { Text, View } from 'react-native'
import React, { Component } from 'react'
import Home from './screens/Home';
import Auction from './screens/Auction';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Register from './screens/Register';
import Portals from './screens/Portals';
import Organiser from './screens/Organiser';
import SplashScreen from './screens/SplashScreen';
import Login from './screens/Login';

console.disableYellowBox = true;

const Stack=createNativeStackNavigator();

const App=()=>{

    return (
      <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen name='SplashScreen' component={SplashScreen} options={{headerShown:false}}/>
        <Stack.Screen name='Login' component={Login} options={{headerShown:false}}/> 
        <Stack.Screen name='Register' component={Register} options={{headerShown:false}}/>
          <Stack.Screen name='Home' component={Home} options={{headerShown:false}}/>
          <Stack.Screen name='Auction' component={Auction} options={{headerShown:false}}/>
          <Stack.Screen name='Portals' component={Portals} options={{headerShown:false}}/>
          <Stack.Screen name='Organiser' component={Organiser} options={{headerShown:false}}/>
        </Stack.Navigator>
      </NavigationContainer>
    )
  }


export default App;