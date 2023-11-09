import { View, Text,Image,TouchableOpacity, ScrollView,StyleSheet,LogBox } from 'react-native'
import React, { Component, useEffect, useState } from 'react'
import Auction from '../screens/Auction'
import {firebase} from '@react-native-firebase/auth'
import { useNavigation } from '@react-navigation/native'
import { firestore } from '@react-native-firebase/firestore'


LogBox.ignoreAllLogs(true);

const AuctionCard =({item}) => {
  const navigation=useNavigation();
  const [organiser,setorganiser]=useState(true);
  const [show,setshow]=useState(false);

  useEffect(()=>{
    if(firebase.auth().currentUser.uid!=item.organiser){
      setorganiser(false);
      console.log('not organiser');
    }
   
  })
  
  
  
 setTimeout(()=>{
    
  
     firebase.firestore().collection('Users').doc(item.winner).collection('Won_Auctions').add({
        ItemId:item.id,
        Item_Name:item.Item,
          
          Img: item.image,
          value:item.value,
          organiser:item.organiser,
          winner:item.winner,
        
      }).then(()=>{
        firebase.firestore().collection('Users').doc(item.organiser).collection('My_Auctions').add({
          ItemId:item.id,
          Item_Name:item.Item,
            
            Img: item.image,
            value:item.value,
            organiser:item.organiser,
            winner:item.winner,
          
        })
          .then(()=>{
            firebase.firestore().collection('Auctions').doc(item.id).delete();
         })
        })
     
    }
  
    
     
    
  ,1000);

  const Addparticipant=()=>{
    
    firebase.firestore().collection('Auctions').doc(item.id).collection('participants').add({
      name:"",
      id:item.id,
      Item:item.Item,
      amount:item.value,
      
  }).then(()=>{
      navigation.navigate('Auction',{img:item.image,item:item});
    })

  }

  
  
  return (
   
   <View style={{marginBottom:50,display:'flex',alignItems:'center',justifyContent:'center'}}>
   <ScrollView scrollEnabled>
   <View style={[styles.card, styles.elevation]}>
        
       
     
          <TouchableOpacity onPress={()=>setshow(!show)}>
          <View>
        <Image source={{uri:item.image}} style={{width:250,height:250}} resizeMode="cover"/>
        {show?
        <View style={{backgroundColor:'rgba(0,0,0,0.7)',width:'100%',height:250,position:'absolute'}}>
         {organiser?
          <Text style={{color:'white',textAlign:'center',top:'40%',fontSize:18}}>{item.Item}</Text>:
          <>
          <View>
          <Text style={{color:'white',textAlign:'center',top:'40%',fontSize:18}}>{item.Item}</Text>
          
          <View style={{width:'100%',display:'flex',alignItems:'center',top:'40%'}}>
          
          <TouchableOpacity onPress={Addparticipant}>
          <Text style={{color:'white',textAlign:'center',fontSize:18,backgroundColor:'#349953',padding:"3%",borderRadius:10,marginVertical:'5%'}}>Bid Now</Text>
          </TouchableOpacity>
          </View>
          </View>
          </>
         }
          
        </View>:null}
        </View>
        </TouchableOpacity>
       
        </View>
    </ScrollView>
   </View>
  )
}

export default AuctionCard;

const styles = StyleSheet.create({
  heading: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 13,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal:5,
    paddingVertical:5,
    width: '100%',
    
  },
  elevation: {
    elevation: 20,
    shadowColor: '#52006A',
  },
});