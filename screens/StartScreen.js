import { StyleSheet,Image ,Text, TouchableOpacity, View,Modal,Alert } from 'react-native'
import React,{useState,useEffect} from 'react'
import { useNavigation } from '@react-navigation/native'
import Login from './Login'
import auth from '@react-native-firebase/auth';
import {firebase} from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Home from './Home';

const StartScreen = () => {
  const navigator=useNavigation();
  const [modalVisible,setModalVisible]=useState(false);
  const [isloggedin,setloggedin]=useState(false);
  const [agree,setAgree]=useState(false);

  const handleModal=()=>{
    
    
      setAgree(true);
      setModalVisible(false);
    
      navigator.navigate('Login');
    
   
  }

  useEffect(()=>{
    if(firebase.auth().currentUser!=null){
      firebase.firestore().collection('Users').doc(firebase.auth().currentUser.uid).get()
    .then(documentSnapshot=>{
        if(documentSnapshot.exists){
          setloggedin(documentSnapshot.data().logged_in);
          
        }
    })
    }})

  return (
    <View style={styles.mainscreen} >
      <Image source={require('./images/auction.png')} style={{width:"100%",height:"35%",marginTop:"10%"}}/>
      <Text style={styles.text}>Enjoy Your Live Auctions with Dealer</Text>
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          
          setModalVisible(!modalVisible);
        }} style={{display:'flex'}}>
        <View style={{flex:1,backgroundColor:'#000A'}}>
        <View style={{backgroundColor:'white',marginTop:"50%",padding:20,width:"85%",marginLeft:30,elevation:20}}>
          
          <TouchableOpacity onPress={handleModal} >
            <Text style={{backgroundColor:"black",padding:10,marginTop:10,alignSelf:'center',fontSize:18,borderRadius:20,color:'white',paddingHorizontal:20 }} 
            >OK</Text>
          </TouchableOpacity>
        </View>
        </View>
      </Modal>
      <Text style={{marginTop:20,fontSize:18,color:'gray'}}>Explore unique collection- bid,buy or sell your favourite items</Text>
      <TouchableOpacity onPress={()=>isloggedin? navigator.navigate('Home'):setModalVisible(true)}>
        <Text style={styles.button}> Get Started</Text>
      </TouchableOpacity>
    </View>
  )
}

export default StartScreen;

const styles = {
  mainscreen:{
    width:"100%",
    backgroundColor:'black',
    height:"100%",
    padding:40,
    flex:1,
  },
  text:{
    fontSize:40,
    fontWeight:'600',
    color:'white',
    marginTop:"10%",
  },
  button:{
    backgroundColor:'#349953',
    width:'50%',
    textAlign:'center',
    marginTop:"10%",
    padding:15,
    fontSize:18,
    borderRadius:25,
    color:'white',
    fontWeight:'500'
  }

}