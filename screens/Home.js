import { View, Text,ScrollView,FlatList} from 'react-native'
import React,{useState,useEffect} from 'react'
import AuctionCard from '../components/AuctionCard';
import { firebase } from '@react-native-firebase/firestore';

const Home = () => {
  const [list,setList]=useState([]);
  const ref=firebase.firestore().collection('Auctions');
  const [End,setEnd]=useState();

  useEffect(
    ()=>{
    return ref.orderBy("Time","desc").onSnapshot(querySnapshot=>{
      const list=[]
      querySnapshot.forEach(doc=>{
        list.push({
          userid:doc.data().Userid,
          id:doc.id,
          Item:doc.data().Item_Name,
          image:doc.data().Img,
          desc:doc.data().desc,
          time:doc.data().Time,
          value:doc.data().value,
          date:doc.data().Date,
        })
        
      })
      setList(list)
    },[])
  })

  

  return (
    <View> 
    <View style={{display:'flex',alignItems:'center',justifyContent:'center',padding:15,backgroundColor:'#4830D3',marginBottom:20}}>
      <Text style={{textAlign:'center',fontSize:25,color:'white',fontWeight:'500',fontStyle:'italic'}}>Auctions</Text>
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
            <Text style={{color:'black',alignSelf:'center',fontSize:20}}>No Auction is going on</Text>
            </View>
          }
    
    </View>
  )
}

export default Home;