import { View, Text,TouchableOpacity } from 'react-native'
import React, { useEffect,useState } from 'react'
import Home from './Home'
import Organiser from './Organiser'
import { firebase } from '@react-native-firebase/firestore';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from './Profile';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Entypo';
import Icon1 from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';
import MyAuc from './MyAuc';

  const Tab=createBottomTabNavigator();

const Portals = () => {
  const navigation=useNavigation();
return (
    <Tab.Navigator initialRouteName='Home' screenOptions={{headerShown:false,tabBarShowLabel:false,tabBarStyle:{backgroundColor:'#4830D3',height:60}}}>
      <Tab.Screen name='Home' component={Home} options={{
        tabBarIcon:()=>(
          <Icon name='home' size={35} color='white'/>
        )
      }}/>
      <Tab.Screen name='Organiser' component={Organiser}  options={{
        tabBarIcon:()=>(
          <Icon1 name='pluscircleo' size={35} color='white'/>
        )
      }}/>
      <Tab.Screen name='My Auc' component={MyAuc} options={{
        tabBarIcon:()=>(
          <Icon3 name='post-outline' size={35} color='white'/>
        )
      }}/>
      <Tab.Screen name='Profile' component={Profile}  options={{
        tabBarIcon:()=>(
          <Icon2 name='person-circle-outline' size={35} color='white'/>
        )
      }}/>
    </Tab.Navigator>
    
)}

export default Portals;