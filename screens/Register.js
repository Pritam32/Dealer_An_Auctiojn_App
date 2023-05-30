import { View, Text,Image, ScrollView, TouchableOpacity, Alert,ActivityIndicator} from 'react-native'
import React,{useState} from 'react'
import { TextInput } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import Home from './Home';
import { firebase } from '@react-native-firebase/firestore';
import Login from './Login';
import Portals from './Portals';

const Register = ({navigation}) => {

  const [email,setEmail]=useState('');
  const [password,setpassword]=useState('');
  const [name,setName]=useState('');
  const [address,setAddress]=useState('');
  const [show,setShow]=useState(false);
  const [result,setResult]=useState();

  const Signup=async()=>{
    if(name=== '' || email === '' || password === '' || address ==="") {
      Alert.alert('Invalid','Enter details to signup!')
    }
    else{
      setShow(true);
      const result=await auth()
      .createUserWithEmailAndPassword(email.trim(),password)
      .catch(error=>{
        if (error.code === 'auth/invalid-email') {
          setshow(false);
          alert('Invalid Email or Password !');
        }
        else if(error.code === 'auth/network-request-failed'){
          setShow(false);
          alert("No Internet Connection !");
          console.log("no internet");
        }
        else if(error.code === 'auth/email-already-in-use'){
          setShow(false);
          alert(" User Already Exists !");
          console.log("User already exists");
        }
    
        console.error(error);
      })
        setResult(result);
        firebase.firestore().collection('Users').doc(result.user.uid).set({
          name:name,
          email:result.user.email,
          uid:result.user.uid,
          password:password,
          address:address,
          logged_in:false,
      })
     
  
      .then(() => {
        firebase.firestore().collection('Users').doc(firebase.auth().currentUser.uid).update({
          logged_in:true,
        })
        setName("");
        setEmail("");
        setpassword("");
        setAddress("");
        navigation.navigate("Portals");
        
      })
         
    
      }
      
  }
  
  return (
    <View style={{flex:1,backgroundColor:'white'}}>
    <ScrollView>
    <View style={{display:'flex',alignItems:'center'}}>
      <Image source={require('../screens/logo.jpg')} style={{width:200,height:100,alignSelf:'center',marginTop:30}}/>
      <Text style={{color:'black',marginTop:20,fontSize:30,fontWeight:'600'}}>Create New Account</Text>
      </View>
      <View style={{marginTop:20}}>
      <View style={{marginHorizontal:30,marginVertical:10}}>
        <TextInput style={{width:350,height:50,fontSize:18}} placeholder="Username" onChangeText={(val)=>setName(val)} value={name} />
      </View>
      <View style={{marginHorizontal:30,marginVertical:10}}>
        <TextInput style={{width:350,height:50,fontSize:18}} placeholder="Email" onChangeText={(val)=>setEmail(val)} value={email} />
      </View>
      <View style={{marginHorizontal:30,marginVertical:10}}>
        <TextInput style={{width:350,height:50,fontSize:18}} placeholder="Password" onChangeText={(val)=>setpassword(val)}  value={password} secureTextEntry />
      </View>
      <View style={{marginHorizontal:30,marginVertical:10}}>
        <TextInput style={{width:350, height:50,fontSize:18}}
                    placeholder='Address' onChangeText={(val)=>setAddress(val)} value={address}/>
                    
      </View>
      <View style={{display:'flex',alignItems:'center',justifyContent:'center',marginTop:10}}>
      <TouchableOpacity onPress={Signup}>
      <Text style={{textAlign:'center',color:'white',width:150,padding:10,fontSize:18,borderRadius:100,backgroundColor:'#3196c4'}}>Sign Up</Text>
      </TouchableOpacity>
      </View>
    </View>
    <View style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop:20}}>
      <Text style={{color:'black',fontSize:18}}>Already have an Account?</Text>
      <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
      <Text style={{color:'blue',fontSize:18}}> Sign in</Text>
      </TouchableOpacity>
    </View>
    <ActivityIndicator color='#3196c4' size={40} style={{marginTop:30}} animating={show}/>
    </ScrollView>
    </View>
  )
}

export default Register;