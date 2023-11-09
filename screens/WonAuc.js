import { View, Text ,ScrollView,FlatList, LogBox, TouchableOpacity} from 'react-native'
import React,{useState,useEffect} from 'react'
import AuctionCard from '../components/AuctionCard'
import { firebase } from '@react-native-firebase/firestore';
import Viewcard from '../components/Viewcard';
import NoInternet from '../components/NoInternet';
import Profile from './Profile';
import Icon from 'react-native-vector-icons/AntDesign'

const WonAuc = ({navigation}) => {
  
  const [isConnected,setIsConnected]=useState(false);
  const [list,setList]=useState([]);
  const ref=firebase.firestore().collection('Users').doc(firebase.auth().currentUser.uid).collection('Won_Auctions');
  const [End,setEnd]=useState();
  
  useEffect(
    ()=>{
        
    return ref.onSnapshot(querySnapshot=>{
      const list1=[];
      querySnapshot.forEach(doc=>{
        list1.push({
          uid:doc.data().ItemId,
          Item:doc.data().Item_Name,
          
        
          image:doc.data().Img,
          value:doc.data().value,
          organiser:doc.data().organiser,
          winner:doc.data().winner,

        })
        
      })
      
       setList(list1);
      
    
  })
  console.log(list);
});
  return (
    <View style={{backgroundColor:'black'}}> 
    {isConnected==true?(<>
    <View style={{display:'flex',alignItems:'center',justifyContent:'center',padding:15,backgroundColor:'green',marginBottom:20,flexDirection:'row'}}>
      <TouchableOpacity onPress={()=>navigation.navigate('Profile')} style={{marginLeft:'10%'}}>
      <Icon name='arrowleft' size={30}  color="white" />
      </TouchableOpacity>
      <Text style={{textAlign:'center',fontSize:25,color:'white',fontWeight:'500',fontStyle:'italic',width:'100%'}}>Auctions Won</Text>
    </View>
   
    {list!=''?
    
        <FlatList
          data={list} 
          renderItem={({item})=>(
            <ScrollView scrollEnabled>
             
              <AuctionCard item={item}/>

            </ScrollView>
          )}/>:
             <View style={{display:'flex',alignItems:'center',justifyContent:'center',marginTop:'50%'}}>
            <Text style={{color:'gray',alignSelf:'center',fontSize:23}}>No Auctions Won</Text>
            </View>
          }
    
    
    </>):null}
    <NoInternet
    isConnected={isConnected}
    setIsConnected={setIsConnected}/>
    </View>
  )
}

export default WonAuc;