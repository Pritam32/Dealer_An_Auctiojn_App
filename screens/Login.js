import { View, Text,ScrollView,Image,TouchableOpacity,Alert } from 'react-native'
import React,{useState} from 'react'
import { TextInput } from 'react-native-paper';
import Register from './Register';
import { useNavigation } from '@react-navigation/native';
import Portals from './Portals';
import auth from '@react-native-firebase/auth';

const Login = () => {
    const [email,setEmail]=useState('');
    const [password,setpassword]=useState('');
    const navigation=useNavigation();
    const login=()=>{
        if(email === '' && password === '') {
            Alert.alert('Enter details to signin!')
          } else {
           
            auth()
            .signInWithEmailAndPassword(email.trim(),password)
            .then(()=>{
              
              Alert.alert("Query",'User logged-in successfully!')
              
              setEmail('');
              setpassword('');
              
              console.log('User signed in Successfully!');
              navigation.navigate('Portals');
            })
            .catch(error=>{
              if (error.code === 'auth/invalid-email' || error.code==='auth/wrong-password') {
                Alert.alert('Query','Invalid Email or Password !');
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
        <TextInput style={{width:350,height:50,fontSize:18}} placeholder="Email" onChangeText={(val)=>setEmail(val)} />
      </View>
      <View style={{marginHorizontal:30,marginVertical:10}}>
        <TextInput style={{width:350,height:50,fontSize:18}} placeholder="Password" onChangeText={(val)=>setpassword(val)} secureTextEntry/>
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
    </ScrollView>
    </View>
  )
}

export default Login;