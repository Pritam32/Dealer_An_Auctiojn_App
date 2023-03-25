import { View, Text,Image, ScrollView, TouchableOpacity, Alert } from 'react-native'
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

  const Signup=()=>{
    if(email!='' && password!='' && name!='' && address!=''){
      auth()
      .createUserWithEmailAndPassword(email.trim(),password)
      .then(async() => {
        await firebase.firestore().collection('Users').add({
          
          name:name,
          email:email,
          password:password,
          address:address,
      })
      })
      .then(async()=>{
        
        navigation.navigate('Portals');
      })
      
    }
    else{
      Alert.alert('Invalid',"All Fields are required !")
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
        <TextInput style={{width:350,height:50,fontSize:18}} placeholder="Username" onChangeText={(val)=>setName(val)} />
      </View>
      <View style={{marginHorizontal:30,marginVertical:10}}>
        <TextInput style={{width:350,height:50,fontSize:18}} placeholder="Email" onChangeText={(val)=>setEmail(val)} />
      </View>
      <View style={{marginHorizontal:30,marginVertical:10}}>
        <TextInput style={{width:350,height:50,fontSize:18}} placeholder="Password" onChangeText={(val)=>setpassword(val)} secureTextEntry />
      </View>
      <View style={{marginHorizontal:30,marginVertical:10}}>
        <TextInput style={{width:350, height:50,fontSize:18}}
                    placeholder='Address' onChangeText={(val)=>setAddress(val)}/>
                    
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
    </ScrollView>
    </View>
  )
}

export default Register;