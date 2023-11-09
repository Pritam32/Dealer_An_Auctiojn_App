import { View, Text,ScrollView,FlatList,LogBox,BackHandler,TouchableOpacity} from 'react-native'
import React,{useState,useEffect} from 'react'
import AuctionCard from '../components/AuctionCard';
import { firebase } from '@react-native-firebase/firestore';
import NoInternet from '../components/NoInternet';
import { useNavigation } from '@react-navigation/native';
import Organiser from './Organiser';
import Profile from './Profile';

LogBox.ignoreAllLogs(true);

const Home = () => {
  const navigator=useNavigation();
  const [list,setList]=useState(["jiw"]);
  const ref=firebase.firestore().collection('Auctions');
  
  const [isConnected,setIsConnected]=useState(false);

  const [isAuc,setAuc]=useState(true);
    const [item,setitem]=useState(true);
    const [item1,setitem1]=useState(false);
    const [item2,setitem2]=useState(false);
    const [item3,setitem3]=useState(false);
    const [item4,setitem4]=useState(false);

    const handleclick1=()=>{
        setAuc(!isAuc);
    }
    const handleclick6=()=>{
        setitem(true);
        setitem1(false);
        setitem2(false);
        setitem3(false);
        setitem4(false);
    }
    const handleclick2=()=>{
        setitem(false);
        setitem1(true);
        setitem2(false);
        setitem3(false);
        setitem4(false);
    }
    const handleclick3=()=>{
        setitem(false);
        setitem1(false);
        setitem2(true);
        setitem3(false);
        setitem4(false);
    }
    const handleclick4=()=>{
        setitem(false);
        setitem1(false);
        setitem2(false);
        setitem3(true);
        setitem4(false);
    }
    const handleclick5=()=>{
        setitem(false);
        setitem1(false);
        setitem2(false);
        setitem3(false);
        setitem4(true);
    }
    


 
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
          value:doc.data().value,
          date:doc.data().date,
          winner:doc.data().winner,
          organiser:doc.data().organiser,
        })
        
      })
      setList(list);
    
      
    
      
    },[])
   
      
  })  
  
  return (
    <View style={{backgroundColor:'black',flex:1}}> 
    {isConnected==true?(
    <>
    <View style={{padding:30,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
    <View style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:'100%'}}>
    <TouchableOpacity onPress={()=>navigator.navigate('Organiser')}>
    <Text style={{color:'white',fontSize:18}}>Create +</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={()=>navigator.navigate('Profile')}>
    <Text style={{color:'white',fontSize:18}}>Profile</Text>
    </TouchableOpacity>
    </View>
    
    <View style={{display:'flex',flexDirection:'row',alignItems:'center',width:"100%",marginTop:'10%'}}>
    <ScrollView scrollEnabled horizontal={true}>
    <TouchableOpacity>
    <Text style={{color:'white',fontSize:18,backgroundColor:item?'#349953':'#4b4d4b',textAlign:'center',padding:9,borderRadius:10,marginHorizontal:5}} onPress={handleclick6}>All</Text>
    </TouchableOpacity>
    <TouchableOpacity>
    <Text style={{color:'white',fontSize:18,backgroundColor:item1?'#349953':'#4b4d4b',textAlign:'center',padding:9,borderRadius:10,marginHorizontal:5}} onPress={handleclick2}>Antique</Text>
    </TouchableOpacity>
    <TouchableOpacity>
    <Text style={{color:'white',fontSize:18,backgroundColor:item2?'#349953':'#4b4d4b',textAlign:'center',padding:9,borderRadius:10,marginHorizontal:5}} onPress={handleclick3}>Automobiles</Text>
    </TouchableOpacity>
    <TouchableOpacity>
    <Text style={{color:'white',fontSize:18,backgroundColor:item3?'#349953':'#4b4d4b',textAlign:'center',padding:9,borderRadius:10,marginHorizontal:5}} onPress={handleclick4}>Arts</Text>
    </TouchableOpacity>
    <TouchableOpacity>
    <Text style={{color:'white',fontSize:18,backgroundColor:item4?'#349953':'#4b4d4b',textAlign:'center',padding:9,borderRadius:10,marginHorizontal:5,marginRight:40}} onPress={handleclick5}>Jwellery</Text>
    </TouchableOpacity>
    </ScrollView>
    </View>
    
    
    <View style={{marginVertical:'10%',marginBottom:'50%'}}>
        
    
    
    
    {list.length!=0?
    
        <FlatList
          data={list} 
          renderItem={({item})=>(
            <ScrollView scrollEnabled>
              <View>
              <AuctionCard item={item}/>
              </View>
            </ScrollView>
          )}/>:
             <View style={{display:'flex',alignItems:'center',justifyContent:'center',marginTop:'50%',}}>
            <Text style={{color:'gray',alignSelf:'center',fontSize:20}}>No Auction is going on</Text>
            </View>
    }
    </View>
    </View>
    </>
    
    ):null}
    <NoInternet
    isConnected={isConnected}
    setIsConnected={setIsConnected}/>
    
    </View>
  )
}

export default Home;