import { View, Text ,ScrollView,FlatList, LogBox} from 'react-native'
import React,{useState,useEffect} from 'react'
import AuctionCard from '../components/AuctionCard'
import { firebase } from '@react-native-firebase/firestore';
import Viewcard from '../components/Viewcard';


const MyAuc = () => {
    
  const [list,setList]=useState([]);
  const ref=firebase.firestore().collection('Auctions');
  const [End,setEnd]=useState();
  let filterdata=null;
  useEffect(
    ()=>{
        
    return ref.orderBy("Time","desc").onSnapshot(querySnapshot=>{
      const list1=[];
      querySnapshot.forEach(doc=>{
        list1.push({
          userid:doc.data().Userid,
          id:doc.id,
          Item:doc.data().Item_Name,
          image:doc.data().Img,
          desc:doc.data().desc,
          time:doc.data().Time,
          value:doc.data().value,
          date:doc.data().date,
          winner:doc.data().winner,
          upi:doc.data().upi,
        })
        
      })
      
       filterdata=list1.filter(item=>item.winner==firebase.auth().currentUser.uid);
       setList(filterdata);
    },[])
    
    
    
  })
  return (
    <View style={{marginBottom:80}}> 
    <View style={{display:'flex',alignItems:'center',justifyContent:'center',padding:15,backgroundColor:'#4830D3',marginBottom:20}}>
      <Text style={{textAlign:'center',fontSize:25,color:'white',fontWeight:'500',fontStyle:'italic'}}> My Auctions</Text>
    </View>
   
    {list!=''?
    
        <FlatList
          data={list} 
          renderItem={({item})=>(
            <ScrollView scrollEnabled>
             
              <Viewcard item={item}/>

            </ScrollView>
          )}/>:
             <View style={{display:'flex',alignItems:'center',justifyContent:'center',marginTop:'50%'}}>
            <Text style={{color:'black',alignSelf:'center',fontSize:20}}>No Auctions Available</Text>
            </View>
          }
    
    </View>
  )
}

export default MyAuc;