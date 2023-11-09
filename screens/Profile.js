import { View,Text,Image,ScrollView,FlatList, TouchableOpacity,Modal,Alert} from 'react-native'
import React, { useEffect, useState } from 'react'
import { firebase } from '@react-native-firebase/firestore';
import Viewcard from '../components/Viewcard';
import Login from '../screens/Login'
import { TextInput } from 'react-native-paper';
import NoInternet from '../components/NoInternet';
import Icon from 'react-native-vector-icons/Entypo'
import MyAuc from './MyAuc';
import WonAuc from './WonAuc';

const Profile = ({navigation}) => {
    
        const [name,setName]=useState("");
        const [email,setEmail]=useState("");
        const [address,setAddress]=useState("");
        const [modalVisible,setModalVisible]=useState(false);
        const [password,setpassword]=useState("");
        const [name1,setName1]=useState(name);
        const [email1,setEmail1]=useState(email);
        const [address1,setAddress1]=useState(address);

        const [isConnected,setIsConnected]=useState(false);
        
        useEffect(()=>{
            firebase.firestore().collection('Users').doc(firebase.auth().currentUser.uid)
            .onSnapshot(document=>{
               if(document.data.email!=null && document.data().name!=null)
                setEmail(document.data().email);
                setName(document.data().name);
             
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
      {isConnected==true?(
      <>
      <View style={{display:'flex',alignItems:'center',height:"100%",backgroundColor:"black"}}> 
      <Image source={{uri:'https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659651__340.png'}} style={{width:"50%",height:"15%",marginTop:"10%"}}/>
      <Text style={{color:'#349953',fontSize:22,fontWeight:'700'}}>{name}</Text>
      <View style={{display:'flex',alignItems:'center',marginTop:20}}>
        <Text style={{color:'white',fontSize:18,fontWeight:'700'}}>Email: {email}</Text>
        <Text style={{color:'white',fontSize:18,fontWeight:'700'}}>Address : {address?address:"Not Entered"}</Text>
      </View>
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          
          setModalVisible(!modalVisible);
        }} style={{display:'flex'}}>
        <View style={{flex:1,backgroundColor:'#000A'}}>
        
        <View style={{backgroundColor:'white',marginTop:"30%",padding:0,width:"85%",marginLeft:30,elevation:20,paddingBottom:20}}>
        <Text style={{backgroundColor:'#4830D3',color:'white',padding:18,marginBottom:20,fontSize:20,fontWeight:"600"}}>Edit Profile</Text>
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
      <View style={{marginTop:50,width:300,borderWidth:2,borderColor:'gray',borderRadius:20,display:'flex',alignItems:'center',justifyContent:'space-between',flexDirection:'row'}}>
      <Text style={{color:'#646566',padding:10,fontSize:18,fontWeight:"600"}}>Edit Profile</Text>
      <Icon name='chevron-thin-right' size={20} color="gray" style={{marginRight:20}}/>
      </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>navigation.navigate('MyAuc')}>
      <View style={{marginTop:10,width:300,borderWidth:2,borderColor:'gray',borderRadius:20,display:'flex',alignItems:'center',justifyContent:'space-between',flexDirection:'row'}}>
      <Text style={{color:'#646566',padding:10,fontSize:18,fontWeight:"600"}}>My Auctions</Text>
      <Icon name='chevron-thin-right' size={20} color="gray" style={{marginRight:20}}/>
      </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>navigation.navigate('WonAuc')}>
      <View style={{marginTop:10,width:300,borderWidth:2,borderColor:'gray',borderRadius:20,display:'flex',alignItems:'center',justifyContent:'space-between',flexDirection:'row'}}>
      <Text style={{color:'#646566',padding:10,fontSize:18,fontWeight:"600"}}>Won Auctions</Text>
      <Icon name='chevron-thin-right' size={20} color="gray" style={{marginRight:20}}/>
      </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={Logout}>
      <View style={{marginTop:10,width:300,borderWidth:2,borderColor:'gray',borderRadius:20,display:'flex',alignItems:'center',justifyContent:'space-between',flexDirection:'row'}}>
      <Text style={{color:'#646566',padding:10,fontSize:18,fontWeight:"600"}}>Log out</Text>
      <Icon name='chevron-thin-right' size={20} color="gray" style={{marginRight:20}}/>
      </View>
      </TouchableOpacity>
      
      </View>
      </>):null}
      <NoInternet
    isConnected={isConnected}
    setIsConnected={setIsConnected}/>
    </View>
  )
}

export default Profile;