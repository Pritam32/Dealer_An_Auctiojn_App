import { View, Text,Image,FlatList,ScrollView, TouchableOpacity,RefreshControl,TextInput,StyleSheet} from 'react-native'
import React, { useState , useEffect} from 'react'
import { Divider } from 'react-native-elements'
import { firebase } from '@react-native-firebase/firestore'
import { useNavigation } from '@react-navigation/native';
import  Home from './Home';

const Auction = ({route}) => {
    const navigation=useNavigation();
    const img=route.params.img;
    const item=route.params.item;
    const [isfocus,setFocus]=useState(false);
    const [amount,setamount]=useState();
    const [final,setfinal]=useState(0);
    const[ending,setEnd]=useState();
    const month=new Date().getMonth()+1;
    const year=new Date().getFullYear();

    useEffect(()=>{
      
      const ref=firebase.firestore().collection('Auctions').doc(item.id);
      ref.onSnapshot((doc)=>{
        const num=doc.data().Date;
        const val=""+num;
         setEnd(Number(val.substring(0,2))+2) 
      })
      
     
    })

    
      
      
    

    const handlevalue=()=>{
       const ref=firebase.firestore().collection('Auctions').doc(item.id);
       ref.update(
        {
          value:Math.max(amount,final),
        }
       ).then(()=>{
        ref.onSnapshot((doc)=>{
          setfinal(doc.data().value);
          
        })
       })
      }
    
     
    return (
    <View>
    <ScrollView scrollEnabled>
      
    <Image source={{uri:img}}
      style={{width:'100%',height:250}} resizeMode="stretch"/>
    <Divider style={{borderWidth:2,borderColor:'black'}}/>
    <View style={{marginLeft:20,marginTop:20}}>
      <Text style={{color:'#535754',fontSize:20,fontWeight:'bold'}}>End Date: {ending}/{month.toLocaleString()}/{year.toLocaleString()} </Text>
    </View>
   
    <View>
      <Text style={{color:'#A84448',fontSize:22,marginLeft:20,paddingVertical:10,fontWeight:'bold'}}>Min Amount: Rs {final}</Text>
    </View>
    <Divider style={{borderColor:'black',backgroundColor:'black',height:2}}/>
    <View style={{marginHorizontal:20}}>
     <Text style={{color:'black',fontSize:20,marginTop:30}}>Enter Your Amount:</Text>
      <TextInput style={isfocus?styles.inputfocus:styles.input} onFocus={()=>setFocus(true)} onChangeText={(val)=>setamount(val)}/>
    </View>
   </ScrollView>
   <TouchableOpacity onPress={handlevalue}>
  <Text style={{marginTop:20,padding:12,fontSize:18,borderRadius:10,textAlign:'center',color:'white',backgroundColor:'#7A3E65',width:"90%",marginHorizontal:20}}>Submit</Text>
  </TouchableOpacity>
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
borderColor:'black',
padding:15,
color:'black',
borderRadius:10.
},
inputfocus:{
  marginTop:10,
  fontSize:20,
  width:'100%',
  borderWidth:2,
  borderColor:'blue',
  padding:15,
  color:'black',
  borderRadius:10.
  }


});