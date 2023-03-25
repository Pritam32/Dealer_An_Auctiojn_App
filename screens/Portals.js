import { View, Text,TouchableOpacity } from 'react-native'
import React, { useEffect,useState } from 'react'
import Home from './Home'
import Organiser from './Organiser'
import { firebase } from '@react-native-firebase/firestore';

const Portals = ({navigation}) => {

  

  
  return (
    <View style={{display:'flex',alignItems:'center',justifyContent:'center',backgroundColor:'white',flex:1}}>
         <Text style={{color:'black',fontSize:25,fontWeight:'bold'}}>Choose Your Category:</Text>
         <TouchableOpacity onPress={()=>navigation.navigate('Organiser')}>
         <View style={{marginTop:30,backgroundColor:'#f56e64',borderWidth:2,borderColor:'black',width:200,height:150,display:'flex',alignItems:'center',justifyContent:'center'}}>
            <Text style={{color:'white',fontSize:20}}>Organiser</Text>
        </View>
        </TouchableOpacity>   
        <TouchableOpacity onPress={()=>navigation.navigate('Home')}>   
        <View style={{backgroundColor:'#256330',borderWidth:2,borderColor:'black',width:200,height:150,marginTop:30,display:'flex',alignItems:'center',justifyContent:'center'}}>
            <Text style={{color:'white',fontSize:20}}>Participant</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity>   
        <View style={{backgroundColor:'#30418a',borderWidth:2,borderColor:'black',marginTop:30,width:200,height:150,display:'flex',alignItems:'center',justifyContent:'center'}}>
            <Text style={{color:'white',fontSize:20}}>My Profile</Text>
        </View>
        </TouchableOpacity>   
    </View>
  )
}

export default Portals;