import { View, Text,Image, ScrollView, TouchableOpacity, Alert,ActivityIndicator,Modal} from 'react-native'
import React,{useEffect, useState} from 'react'
import { TextInput } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import Home from './Home';
import { firebase} from '@react-native-firebase/firestore';
import Login from './Login';
import StartScreen from './StartScreen';



const Register = ({navigation}) => {

  const [email,setEmail]=useState('');
  const [password,setpassword]=useState('');
  const [name,setName]=useState('');
  const [address,setAddress]=useState('');
  const [list,setList]=useState([]);
  const [show,setShow]=useState(false);
  const [result,setResult]=useState();
  const [change,setchange]=useState(true);
  const [modalVisible,setModalVisible]=useState(false);
  const [agree,setAgree]=useState(false);

  let filterdata=null;

  
  

  const Signup=async()=>{

    
      
    
    if(name=== '' || email === '' || password === '' || list.length>0) {
     if(list.length>0){
      Alert.alert('Invalid','User Already Exists');
      console.log(list);
     }
     
     else{
      Alert.alert('Invalid','Enter details to signup!')
     }
 
    }
    
    
    else{
      setShow(true);
      setchange(false);
      const result=await auth()
      .createUserWithEmailAndPassword(email.trim(),password)
      .catch(error=>{
        if (error.code === 'auth/invalid-email') {
          setshow(false);
          setchange(true);
          alert('Invalid Email or Password !');
        }
        else if(error.code === 'auth/network-request-failed'){
          setShow(false);
          setchange(true);
          alert("No Internet Connection !");
          console.log("no internet");
        }
        else if(error.code === 'auth/email-already-in-use'){
          setShow(false);
          setchange(true);
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
          Time:firebase.firestore.Timestamp.fromDate(new Date()),
          logged_in:false,
          agree:true,
      })
     
  
      .then(() => {
        firebase.firestore().collection('Users').doc(firebase.auth().currentUser.uid).update({
          logged_in:true,
        }).then(()=>{
          firebase.firestore().collection('Users_terms').doc(firebase.auth().currentUser.uid).update({
            id:firebase.auth().currentUser.uid,
          })
        }).then(()=>{
          setName("");
          setEmail("");
          setpassword("");
          setAddress("");
        }).then(()=>{
          navigation.navigate('Home');
        })
       
        
        
      })
         
    
      }
      
  }
  

  
  useEffect(
    ()=>{
        
    return firebase.firestore().collection('Users').orderBy("Time","desc").onSnapshot(querySnapshot=>{
      const list1=[];
      querySnapshot.forEach(doc=>{
        list1.push({
          name:doc.data().name,
          email:doc.data().email,
          uid:doc.data().uid,
          password:doc.data().password,
          agree:doc.data().agree,
          
        })
        
      })
      
      //  filterdata=list1.filter(item=>item.aadhar==address);
      //  setList(filterdata);
       
    },[]);
  })
  
  return (
    <View style={{flex:1,backgroundColor:'black'}}>
    <ScrollView style={{marginTop:"10%"}}>
    <View style={{display:'flex',alignItems:'center'}}>
    <Text style={{marginTop:'20%',color:'white',fontSize:25,fontWeight:'500'}}>Create An Account</Text>
    <View style={{width:'100%',marginTop:'5%'}}>
    <View style={{marginHorizontal:"8%",marginVertical:"3%",width:"85%"}}>
        <TextInput  label="Username" style={{width:"100%"}} onChangeText={(val)=>setName(val)} value={name}/>
      </View>
    <View style={{marginHorizontal:"8%",marginVertical:"3%",width:"85%"}}>
        <TextInput  label="Email" style={{width:"100%"}} onChangeText={(val)=>setEmail(val)} value={email}/>
      </View>
      <View style={{marginHorizontal:"8%",marginVertical:"3%",width:"85%"}}>
        <TextInput label='Password'  style={{width:"100%"}} onChangeText={(val)=>setpassword(val)} value={password} secureTextEntry/>
      </View>
    </View>
    
    <View style={{display:'flex',alignItems:'center',justifyContent:'center',marginTop:"10%"}}>
      <TouchableOpacity onPress={Signup}>
      <Text style={{textAlign:'center',color:'white',width:150,padding:10,fontSize:18,borderRadius:100,backgroundColor:'#349953'}}>Sign Up</Text>
      </TouchableOpacity>
      </View>
      <View style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop:"10%"}}>
      <Text style={{color:'white',fontSize:18}}>Already have an Account?</Text>
      <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
      <Text style={{color:'green',fontSize:18}}> Sign in</Text>
      </TouchableOpacity>
    </View>
    <ActivityIndicator color='green' size={40} style={{marginTop:30}} animating={show}/>
    </View>
    </ScrollView>
    </View>
  )
}

export default Register;