import { View, Text,TouchableOpacity,ScrollView,Alert,Image,PermissionsAndroid,ActivityIndicator,Modal,Button } from 'react-native'
import React, { useState,useEffect} from 'react'
import { TextInput } from 'react-native-paper'
import { firebase } from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import ImageCropPicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage'
import Home from './Home'
import { useNavigation } from '@react-navigation/native'
import NoInternet from '../components/NoInternet'
import ComboBox from '../components/Combobox'


const Organiser = () => {

  const [change,setchange]=useState(true);
  const [isConnected,setIsConnected]=useState(false);
  const [image, setImage] = useState(null);
  const [itemname,setitem]=useState();
  const [final,setFinal]=useState();
  
  const [isloading,setisLonding]=useState(false);
  const user=firebase.auth().currentUser;
  const navigation=useNavigation();  
  const[show,setShow]=useState(false);
  const[minamount,setMin]=useState();
  const [modalVisible,setModalVisible]=useState(false);

  const [selectedValue, setSelectedValue] = useState('option1');

  const options = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ];
  
  
  const takePhotoFromCamera = () => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA) ;
      ImageCropPicker.openCamera({
        width: 1200,
        height: 780,
        
      }).then((image) => {
        console.log(image);
        const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
        setImage(imageUri);
        setModalVisible(true);
      });
    };
  
    const choosePhotoFromLibrary = () => {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE)
      ImageCropPicker.openPicker({
        width: 750,
        height: 500,
        
      }).then((image) => {
        console.log(image);
        const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
        setImage(imageUri);
        setModalVisible(true);
      });
    };
  
    const submitPost = async () => {
      setShow(true);
      setchange(false);
      const imageUrl = await uploadImage();
      console.log('Image Url: ', imageUrl);
      console.log('Post: ', itemname);
      
      const date=new Date();

   
      
        firestore().collection('Auctions').add({
        
        Item_Name:itemname,
        
        Img: imageUrl,
        value:minamount,
        Time:firestore.Timestamp.fromDate(new Date()),
        date:Date.now(),
        winner:null,
        organiser:firebase.auth().currentUser.uid,

        
      }).then(()=>{
        
        setitem("");
        setMin("");
        setShow(false);
        setchange(true);
        setImage(null);
        navigation.navigate('Home');
        
      })
      
      
    }
  
      
      const uploadImage = async () => {
        if( image == null ) {
          return null;
        }
        const uploadUri = image;
        let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
    
        // Add timestamp to File Name
        const extension = filename.split('.').pop(); 
        const name = filename.split('.').slice(0, -1).join('.');
        filename = name + Date.now() + '.' + extension;
    
      
    
        const storageRef =storage().ref(`photos/${filename}`);
        const task=storageRef.putFile(uploadUri);
    
        // Set transferred state
        task.on('state_changed', (taskSnapshot) => {
          console.log(
            `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
          );
    
          
        });
    
        try {
          await task;
    
          const url = await storageRef.getDownloadURL();
          setFinal(url);
          setisLonding(true);
          return url;
    
        } catch (e) {
          console.log(e);
          return null;
        }
    
      };
    


  return (
    <View style={{backgroundColor:'black'}}>
      {isConnected==true?(<>
      <ScrollView>
      
    <View style={{display:'flex',alignItems:'center'}}>
      
      <Text style={{color:'white',marginTop:"20%",fontSize:30,fontWeight:'600'}}>Add Your Auction</Text>
      </View>
      <View style={{marginTop:"10%"}}>
      <View style={{marginHorizontal:"8%",marginVertical:"3%"}}>
        <TextInput  label="Item name" onChangeText={(val)=>setitem(val)} value={itemname} editable={change}/>
      </View>
      <View style={{marginHorizontal:"8%",marginVertical:"3%"}}>
        <TextInput label='Min Amount'  underlineColor='white' activeUnderlineColor='green' onChangeText={(val)=>setMin(val)} value={minamount} editable={change} keyboardType='numeric'/>
      </View>
      
     
    </View>
    <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          
          setModalVisible(!modalVisible);
        }} style={{display:'flex'}}>
        <View style={{flex:1,backgroundColor:'#000A'}}>
        <View style={{backgroundColor:'white',marginTop:"50%",padding:20,width:"85%",marginLeft:30,elevation:20}}>
          <Image source={{uri:image}} style={{width:300,height:300}}/>
          <TouchableOpacity>
            <Text style={{backgroundColor:"black",padding:10,marginTop:10,alignSelf:'center',fontSize:18,borderRadius:20,color:'white',paddingHorizontal:20 }} onPress={()=>{
              setModalVisible(false),
              Alert.alert("Success","Image Uploaded Successfully !")
              }}
            >OK</Text>
          </TouchableOpacity>
        </View>
        </View>
      </Modal>
    <View style={{display:'flex',flexDirection:'row',marginTop:20, alignItems:'center',justifyContent:'center'}}>
    <TouchableOpacity onPress={choosePhotoFromLibrary }>
      <Text style={{textAlign:'center',color:'white',width:150,padding:10,fontSize:18,backgroundColor:'#349953',borderRadius:20}}>Upload Image</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={takePhotoFromCamera}>
      <Text style={{marginLeft:20,textAlign:'center',color:'white',width:150,padding:10,fontSize:18,backgroundColor:'#349953',borderRadius:20}}>Camera</Text>
      </TouchableOpacity>
    </View>
    
    
    <View style={{display:'flex',alignItems:'center',marginTop:20,marginBottom:20}}>
    <TouchableOpacity onPress={submitPost}>
      <Text style={{textAlign:'center',color:'white',width:150,padding:10,fontSize:18,backgroundColor:'#349953',borderRadius:100}}>ADD</Text>
      </TouchableOpacity>
    {show? <ActivityIndicator size="large" color="green" style={{marginTop:20}} />:null}
    </View>
   </ScrollView></>):null}

   <NoInternet
    isConnected={isConnected}
    setIsConnected={setIsConnected}/>
    </View>
    
  )
}

export default Organiser;