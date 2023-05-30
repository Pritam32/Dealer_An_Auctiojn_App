import { View, Text,ScrollView,Image,TouchableOpacity,Alert,Asy} from 'react-native'
import React,{useEffect, useState} from 'react'
import { ActivityIndicator, TextInput } from 'react-native-paper';
import Register from './Register';
import { useNavigation } from '@react-navigation/native';
import Portals from './Portals';
import auth from '@react-native-firebase/auth';
import {firebase} from '@react-native-firebase/firestore';

const Login = () => {
    const [email,setEmail]=useState("");
    const [password,setpassword]=useState("");
    const [show,setShow]=useState(false);
    const navigation=useNavigation();

    
    const login=()=>{
       
        if(email === '' || password === '') {
            Alert.alert('Enter details to signin!')
          } else {
            setShow(true);
            auth()
            .signInWithEmailAndPassword(email.trim(),password)
            
             .then(()=>{
              console.log('User signed in Successfully!');
              setShow(false);
              setEmail("");
              setpassword("");
              firebase.firestore().collection('Users').doc(firebase.auth().currentUser.uid).update({
                logged_in:true,
              }).then(()=>{
                navigation.navigate('Portals');
              })
              
          })
            .catch(error=>{
              if (error.code === 'auth/invalid-email' || error.code==='auth/wrong-password') {
                setShow(false);
                Alert.alert('Query','Invalid Email or Password !');
              }
              else if(error.code === 'auth/network-request-failed'){
                setShow(false);
                Alert.alert('Issue','No Internet Connection')
              }
              else if(error.code === 'auth/email-already-in-use'){
                setShow(false);
                alert(" User Already Exists !");
                console.log("User already exists");
              }
              else if(error.code === 'auth/user-not-found'){
                setShow(false);
                alert(" User doesn't Exists !");
                console.log("User doesn't exists");
              }
          
              console.error(error);
            });      
          };
    }
  return (
    <View style={{flex:1,backgroundColor:'white'}}>
    <ScrollView>
    <View style={{display:'flex',alignItems:'center'}}>
      <Image source={require('../screens/logo.jpg')} style={{width:200,height:100,alignSelf:'center',marginTop:30}}/>
      <Text style={{color:'black',marginTop:20,fontSize:30,fontWeight:'600'}}>Login To Account</Text>
      </View>
      <View style={{marginTop:20}}>
     
      <View style={{marginHorizontal:30,marginVertical:10}}>
        <TextInput style={{width:350,height:50,fontSize:18}} placeholder="Email" onChangeText={(val)=>setEmail(val)} value={email}/>
      </View>
      <View style={{marginHorizontal:30,marginVertical:10}}>
        <TextInput style={{width:350,height:50,fontSize:18}} placeholder="Password" onChangeText={(val)=>setpassword(val)} value={password} secureTextEntry/>
      </View>
      
      <View style={{display:'flex',alignItems:'center',justifyContent:'center',marginTop:10}}>
      <TouchableOpacity onPress={login}>
      <Text style={{textAlign:'center',color:'white',width:150,padding:10,fontSize:18,borderRadius:100,backgroundColor:'#3196c4'}}>Sign In</Text>
      </TouchableOpacity>
      </View>
    </View>
    <View style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop:20}}>
      <Text style={{color:'black',fontSize:18}}>New User?</Text>
      <TouchableOpacity onPress={()=>navigation.navigate('Register')}>
      <Text style={{color:'blue',fontSize:18}}> Create New Account</Text>
      </TouchableOpacity>
    </View>
    <ActivityIndicator color='#3196c4' size={40} style={{marginTop:30}} animating={show}/>
    </ScrollView>
    </View>
  )
}

export default Login;