import { View, Text,Image,FlatList,ScrollView,TouchableOpacity,TextInput,StyleSheet, LogBox, Alert} from 'react-native'
import React, { useState , useEffect} from 'react'
import { firebase } from '@react-native-firebase/firestore'
import { useNavigation } from '@react-navigation/native';
import  Home from './Home';
import Icon from 'react-native-vector-icons/AntDesign'
import Participants from '../components/Participants';


LogBox.ignoreAllLogs(true);

const Auction = ({route}) => {
    const navigation=useNavigation();
    const img=route.params.img;
    const item=route.params.item;
    const [isfocus,setFocus]=useState(false);
    const [amount,setamount]=useState();
    
    

    

    
    const [final,setfinal]=useState(item.value);
      
    

    const handlevalue=()=>{
      if(!amount){
        Alert.alert('Invalid Input',"Please Enter A Valid Input")

      }
      else if(amount<final){
        Alert.alert('Invalid Input',"Please enter the value more than the min amount! ")
      }
      else{
       const ref=firebase.firestore().collection('Auctions').doc(item.id);
       
       ref.update(
        {
          value:Math.max(amount,final),
          winner:firebase.auth().currentUser.uid,
        }
       ).then(()=>{
        
          setfinal(Math.max(amount,final))
         
          
        }).then(()=>{
          setamount(null);
          console.log(amount);

        })
      }
       
      }
    
     
    return (
    <View style={{flex:1,backgroundColor:'#349953'}}>
    <TouchableOpacity onPress={()=>navigation.navigate('Home')}>
      <Icon name='arrowleft' size={30}  color="white" style={{width:'10%',marginTop:20,marginLeft:15}}/>
      </TouchableOpacity>
    <ScrollView scrollEnabled>
      <View style={{width:'100%',display:'flex',alignItems:'center'}}>
      <Image source={{uri:item.image}} style={{width:'80%',height:300}} resizeMode='contain'/>
      </View>
      <View style={{marginTop:'5%',borderTopColor:'black',borderWidth:2,height:470,borderTopLeftRadius:30,borderTopRightRadius:30,backgroundColor:'black'}}>
    <View style={{display:'flex',alignItems:'center',justifyContent:'center',marginTop:10}}>
      <Text style={{color:'#349953',fontSize:22,paddingVertical:10,fontWeight:'bold'}}>Min Amount: Rs {final}</Text>
    </View>
    
    <View style={{marginHorizontal:20}}>
     <Text style={{color:'white',fontSize:20,marginTop:30}}>Enter Your Amount:</Text>
      <TextInput keyboardType='numeric' style={isfocus?styles.inputfocus:styles.input}    onFocus={()=>setFocus(true)} onChangeText={(val)=>setamount(val)} />
    </View>
   
   <TouchableOpacity onPress={handlevalue}>
  <Text style={{marginTop:20,padding:12,fontSize:18,borderRadius:10,textAlign:'center',color:'white',backgroundColor:'#349953',width:"90%",marginHorizontal:20}}>Submit</Text>
  </TouchableOpacity>
  <TouchableOpacity onPress={()=>navigation.navigate('Participants',{item:item})}>
  <Text style={{marginTop:15,padding:12,fontSize:18,borderRadius:10,textAlign:'center',color:'white',backgroundColor:'#349953',width:"90%",marginHorizontal:20}}>Show All Bids</Text>
  </TouchableOpacity>
    </View> 
    </ScrollView>
    </View>
    
  )
}

export default Auction;

const styles=StyleSheet.create({

input:{
marginTop:10,
fontSize:20,
width:'100%',
borderWidth:2,
borderColor:'gray',
padding:15,
color:'black',
borderRadius:10.
},
inputfocus:{
  marginTop:10,
  fontSize:20,
  width:'100%',
  borderWidth:2,
  borderColor:'gray',
  padding:15,
  color:'white',
  borderRadius:10.
  }


});