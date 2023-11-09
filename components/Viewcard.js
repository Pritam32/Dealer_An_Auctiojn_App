import { View, Text,Image,TouchableOpacity,ScrollView,StyleSheet } from 'react-native'
import React from 'react'
import ChatScreen from '../screens/ChatScreen'

import { useLinkProps, useNavigation } from '@react-navigation/native'

const Viewcard = ({item}) => {
  const navigator=useNavigation();
  return (
    <View style={{marginBottom:"5%",display:'flex',alignItems:'center',justifyContent:'center'}}>
   <ScrollView scrollEnabled>
   <View style={[styles.card, styles.elevation]}>
        
        <View style={{paddingVertical:5}}>
        <View style={{display:'flex',alignItems:'center',flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={{color:'white',fontSize:20,marginBottom:10,fontWeight:'bold'}}>{item.Item}</Text>
        <Text style={{fontSize:20,marginBottom:10,fontWeight:'bold',color:'#59d43d'}}> ₹ {item.value}</Text>
        </View>
       
        
        </View>
       
</View>
    </ScrollView>
   </View>
  )
}

      
    
  



const styles = StyleSheet.create({
  heading: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 13,
  },
  card: {
    backgroundColor: '#4b4d4b',
    borderRadius: 8,
    paddingVertical: 20,
    paddingHorizontal: 25,
    width: 350,
    marginVertical:5,
  },
  elevation: {
    elevation: 20,
    shadowColor: 'white',
  },
});


export default Viewcard;