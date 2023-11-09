import { View, Text ,ScrollView,FlatList, LogBox, TouchableOpacity} from 'react-native'
import React,{useState,useEffect} from 'react'
import AuctionCard from '../components/AuctionCard'
import { firebase } from '@react-native-firebase/firestore';
import Viewcard from '../components/Viewcard';
import NoInternet from '../components/NoInternet';
import Home from '../screens/Home';
import { useNavigation } from '@react-navigation/native'

import Icon from 'react-native-vector-icons/AntDesign'

const Participants = ({navigation,route}) => {
  
  const [isConnected,setIsConnected]=useState(false);
  const [list,setList]=useState([]);
 
  const [End,setEnd]=useState();
  const item=route.params.item;
  const ref=firebase.firestore().collection('Auctions').doc(item.id).collection('participants');
  
  useEffect(
    ()=>{
        
    return ref.onSnapshot(querySnapshot=>{
      const list1=[];
      querySnapshot.forEach(doc=>{
        list1.push({
          Item:doc.data().Item,
          value:doc.data().amount,
          Bidder:doc.data().name,
        })
        
      })
      
       setList(list1);
      console.log(list);
    
    
  })
},[]);
  return (
    <View style={{backgroundColor:'black'}}> 
    {isConnected==true?(<>
    <View style={{display:'flex',alignItems:'center',justifyContent:'center',padding:15,backgroundColor:'green',marginBottom:20,flexDirection:'row'}}>
      <TouchableOpacity onPress={()=>navigation.navigate('Home')} style={{marginLeft:'10%'}}>
      <Icon name='arrowleft' size={30}  color="white"/>
      </TouchableOpacity>
      <Text style={{textAlign:'center',fontSize:25,color:'white',fontWeight:'500',fontStyle:'italic',width:"100%"}}> All Bids </Text>
    </View>
   
    {list!=''?
 
    <FlatList
          data={list} 
          renderItem={({item})=>(
            <ScrollView scrollEnabled>
             
              <Viewcard item={item}/>

            </ScrollView>
          )} style={{marginBottom:"30%"}}/>
      :
             <View style={{display:'flex',alignItems:'center',justifyContent:'center',marginTop:'50%'}}>
            <Text style={{color:'gray',alignSelf:'center',fontSize:23}}>No Bids Yet</Text>
            </View>
          }
    
    
    </>):null}
    <NoInternet
    isConnected={isConnected}
    setIsConnected={setIsConnected}/>
    </View>
  )
}

export default Participants;