import { View, Text,ScrollView,Image,TouchableOpacity,Alert} from 'react-native'
import React,{useEffect, useState} from 'react'
import { ActivityIndicator, TextInput } from 'react-native-paper';
import Register from './Register';
import { useNavigation } from '@react-navigation/native';
import Portals from './Portals';
import auth from '@react-native-firebase/auth';
import {firebase} from '@react-native-firebase/firestore';
import Home from './Home';




const Login = () => {
    const [email,setEmail]=useState("");
    const [password,setpassword]=useState("");
    const [show,setShow]=useState(false);
    const navigation=useNavigation();
    const [change,setchange]=useState(true);

    useEffect(()=>{
      setEmail("");
      setpassword("");
    },[])
    
    const login=()=>{
       
        if(email === '' || password === '') {
            Alert.alert('Enter details to signin!')
          } else {
            setShow(true);
            setchange(false);
            auth()
            .signInWithEmailAndPassword(email.trim(),password)
            
             .then(()=>{
              console.log('User signed in Successfully!');
              
              setShow(false);
              setchange(true);
              setEmail("");
              setpassword("");
             
              firebase.firestore().collection('Users').doc(firebase.auth().currentUser.uid).update({
               logged_in:true,
              }).then(()=>{
                navigation.navigate('Home');
              })
              
          })
            .catch(error=>{
              if (error.code === 'auth/invalid-email' || error.code==='auth/wrong-password') {
                setchange(true);
                setShow(false);
                Alert.alert('Query','Invalid Email or Password !');
              }
              else if(error.code === 'auth/network-request-failed'){
                setchange(true);
                setShow(false);
                Alert.alert('Issue','No Internet Connection')
              }
              else if(error.code === 'auth/email-already-in-use'){
                setchange(true);
                setShow(false);
                alert(" User Already Exists !");
                console.log("User already exists");
              }
              else if(error.code === 'auth/user-not-found'){
                setchange(true);
                setShow(false);
                alert(" User doesn't Exists !");
                console.log("User doesn't exists");
              }
              else{
                console.error(error);
              }
            });      
          };
    }
    

    

  return (
    <View style={{flex:1,backgroundColor:'black'}}>
      <ScrollView style={{marginTop:"10%"}}>
    <View style={{display:'flex',alignItems:'center'}}>
    <Text style={{marginTop:'20%',color:'white',fontSize:25,fontWeight:'500'}}>Login To Account</Text>
    <View style={{marginTop:"10%",width:"100%"}}>
    <View style={{marginHorizontal:"8%",marginVertical:"3%",width:"85%"}}>
        <TextInput  label="Email" style={{width:"100%"}} onChangeText={(val)=>setEmail(val)} value={email}/>
      </View>
      <View style={{marginHorizontal:"8%",marginVertical:"3%",width:"85%"}}>
        <TextInput label='Password'  style={{width:"100%"}} onChangeText={(val)=>setpassword(val)} value={password} secureTextEntry/>
      </View>
      </View>
    <View style={{display:'flex',alignItems:'center',justifyContent:'center',marginTop:"10%"}}>
      <TouchableOpacity onPress={login}>
      <Text style={{textAlign:'center',color:'white',width:150,padding:10,fontSize:18,borderRadius:100,backgroundColor:'#349953'}}>Sign In</Text>
      </TouchableOpacity>
      </View>
      <View style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop:"10%"}}>
      <Text style={{color:'white',fontSize:18}}>New BidRise User?</Text>
      <TouchableOpacity onPress={()=>navigation.navigate('Register')}>
      <Text style={{color:'green',fontSize:18}}> Register Now</Text>
      </TouchableOpacity>
    </View>
    <ActivityIndicator color='green' size={40} style={{marginTop:30}} animating={show}/>
    </View>
    </ScrollView>
    </View>
  )
}

export default Login;