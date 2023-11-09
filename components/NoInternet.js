import { View, Text ,Image} from 'react-native'
import React, { useEffect } from 'react'
import  NetInfoState  from '@react-native-community/netinfo'

const NoInternet = ({isConnected,setIsConnected}) => {

  

    useEffect(()=>{
        const unsubscribe=NetInfoState.addEventListener(state=>{
            console.log("Connection type", state.type);
          console.log("Is connected?", state.isConnected);
          setIsConnected(state.isConnected);
        });
          return()=>{
            unsubscribe();
          };
    },[])
  return (
    <View style={{display:'flex',height:700,alignItems:'center'}}>
      {isConnected==true?null:(<><View style={{backgroundColor:'white',flex:1,width:'100%',display:'flex',alignItems:'center',justifyContent:'center'}}><Image source={require('../screens/images.png')} style={{width:200,height:200,marginTop:100}}/>
      <Text style={{color:'black',backgroundColor:'white',textAlign:'center',fontSize:25}}>No Internet Connection !</Text></View></>)}
    </View>
  )
}

export default NoInternet