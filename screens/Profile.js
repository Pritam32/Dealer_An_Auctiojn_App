import { View,Text,Image,ScrollView,FlatList, TouchableOpacity,Modal,Alert} from 'react-native'
import React, { useEffect, useState } from 'react'
import { firebase } from '@react-native-firebase/firestore';
import Viewcard from '../components/Viewcard';
import Login from '../screens/Login'
import { TextInput } from 'react-native-paper';

const Profile = ({navigation}) => {
    
        const [name,setName]=useState("");
        const [email,setEmail]=useState("");
        const [address,setAddress]=useState("");
        const [modalVisible,setModalVisible]=useState(false);
        const [password,setpassword]=useState("");
        const [name1,setName1]=useState(name);
        const [email1,setEmail1]=useState(email);
        const [address1,setAddress1]=useState(address);
        
        useEffect(()=>{
            firebase.firestore().collection('Users').doc(firebase.auth().currentUser.uid)
            .onSnapshot(document=>{
                setEmail(document.data().email);
                setName(document.data().name);
                setAddress(document.data().address);
            });
        })
    const updatehandler=()=>{
      if(name=== '' || email === '' || password === '' || address ===""){
        setModalVisible(false);
      }
      else{
        firebase.firestore().collection('Users').doc(firebase.auth().currentUser.uid).update({
          name:name1,
          email:email1,
          password:password,
          address:address1,
        })
          setModalVisible(false);
          Alert.alert('Success','Profile Updated Successfully');
        
      }
    }
    const Logout=()=>{
      firebase.firestore().collection('Users').doc(firebase.auth().currentUser.uid).update({
        logged_in:false,

      }).then(()=>navigation.navigate('Login'))
    }
    return (
    <View>
      <View style={{marginTop:40,display:'flex',alignItems:'center'}}> 
      <Image source={{uri:'https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659651__340.png'}} style={{width:200,height:200}}/>
      <Text style={{color:'black',fontSize:22,fontWeight:'700'}}>{name}</Text>
      <View style={{display:'flex',alignItems:'center',marginTop:20}}>
        <Text style={{color:'black',fontSize:18,fontWeight:'700'}}>Email: {email}</Text>
        <Text style={{color:'black',fontSize:18,fontWeight:'700'}}>Address: {address}</Text>
      </View>
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          
          setModalVisible(!modalVisible);
        }} style={{display:'flex'}}>
        <View style={{flex:1,backgroundColor:'#000A'}}>
        <View style={{backgroundColor:'white',marginTop:"30%",padding:20,width:"85%",marginLeft:30,elevation:20}}>
        <View style={{marginHorizontal:30,marginVertical:10}}>
        <TextInput style={{width:"100%",height:50,fontSize:18,color:'black'}} placeholder="Username" onChangeText={(val)=>setName1(val)} value={name1} />
      </View>
      <View style={{marginHorizontal:30,marginVertical:10}}>
        <TextInput style={{width:"100%",height:50,fontSize:18}} placeholder="Email" onChangeText={(val)=>setEmail1(val)} value={email1} />
      </View>
      <View style={{marginHorizontal:30,marginVertical:10}}>
        <TextInput style={{width:"100%",height:50,fontSize:18}} placeholder="Password" onChangeText={(val)=>setpassword(val)}  value={password} secureTextEntry />
      </View>
      <View style={{marginHorizontal:30,marginVertical:10}}>
        <TextInput style={{width:"100%", height:50,fontSize:18}}
                    placeholder='Address' onChangeText={(val)=>setAddress1(val)} value={address1}/>
       </View>
       <TouchableOpacity onPress={updatehandler}>
            <Text style={{backgroundColor:"#3196c4",padding:10,marginTop:10,alignSelf:'center',fontSize:18,borderRadius:20,color:'white',paddingHorizontal:20 }}>UPDATE</Text>
          </TouchableOpacity>
      </View>
        </View>
      </Modal>
      <TouchableOpacity onPress={()=>setModalVisible(true)}>
        <Text style={{color:'white',backgroundColor:'#3196c4',padding:10,fontSize:18,marginTop:30,fontWeight:"600"}}>Edit Profile</Text>
      </TouchableOpacity>
      
      
      <TouchableOpacity onPress={Logout}>
        <Text style={{color:'white',backgroundColor:'#3196c4',padding:10,fontSize:18,marginTop:30,fontWeight:"600"}}>LOG OUT</Text>
      </TouchableOpacity>
      
      </View> 
      
    </View>
  )
}

export default Profile;