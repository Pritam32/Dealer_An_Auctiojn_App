import React, { useState, useCallback, useEffect } from 'react'
import { View,Image,Text,TouchableOpacity} from 'react-native';
import { GiftedChat,Bubble,InputToolbar } from 'react-native-gifted-chat'
import { useRoute } from '@react-navigation/native'
import { firebase } from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/AntDesign'
import Profile from './Profile';

const ChatScreen = ({navigation}) => {
    const [messages, setMessages] = useState([]);
    const route=useRoute();
    const {item} = route.params;
     const getAllMessages = async ()=>{
        const docid  = item.organiser > item.winner? item.organiser+ "-" + item.winner: item.winner+"-"+item.organiser;
        const querySanp = await firebase.firestore().collection('chatrooms')
        .doc(item.uid)
        .collection('messages')
        .orderBy('createdAt',"desc")
        .get()
       const allmsg =   querySanp.docs.map(docSanp=>{
            return {
                ...docSanp.data(),
                createdAt:docSanp.data().createdAt.toDate()
            }
        })
        setMessages(allmsg)
      }
      useEffect(() => {
        // getAllMessages()
        console.log(item);
        const docid  = item.organiser > item.winner? item.organiser+ "-" + item.winner: item.winner+"-"+item.organiser;
          const messageRef = firebase.firestore().collection('chatrooms')
          .doc(item.uid)
          .collection('messages')
          .orderBy('createdAt',"desc")
  
        const unSubscribe =  messageRef.onSnapshot((querySnap)=>{
              const allmsg =   querySnap.docs.map(docSanp=>{
               const data = docSanp.data()
               if(data.createdAt){
                   return {
                      ...docSanp.data(),
                      createdAt:docSanp.data().createdAt.toDate()
                  }
               }else {
                  return {
                      ...docSanp.data(),
                      createdAt:new Date()
                  }
               }
                  
              })
              setMessages(allmsg)
          })
          return ()=>{
            unSubscribe()
          }
  
          
        }, [])
    

        const onSend =(messageArray) => {
          const msg = messageArray[0]
          const mymsg = {
              ...msg,
              sentBy:firebase.auth().currentUser.uid, 
              sentTo:item.winner==firebase.auth().currentUser.uid?item.organiser:item.winner,
              createdAt:new Date()
          }

          setMessages(previousMessages => GiftedChat.append(previousMessages,mymsg))
          const docid  = item.organiser > item.winner? item.organiser+ "-" + item.winner: item.winner+"-"+item.organiser
 
       firebase.firestore().collection('chatrooms')
       .doc(item.uid)
       .collection('messages')
       .add({...mymsg,createdAt:firebase.firestore.FieldValue.serverTimestamp()})
        }

  return (
    <View style={{flex:1,backgroundColor:"#f5f5f5"}}>
      <View style={{padding:20,backgroundColor:'#4830D3',display:'flex',flexDirection:'row',alignItems:'center',width:'100%'}}>
      <TouchableOpacity onPress={()=>navigation.navigate('Profile')}>
      <Icon name='arrowleft' size={30}  color="white"/>
      </TouchableOpacity>
      <Image source={{uri:item.image}} style={{width:50,height:50,borderRadius:30,marginLeft:20}}/>
        <Text style={{fontSize:20,color:'white',marginLeft:20,fontWeight:"500"}}>{item.Item}</Text>
      </View>
      
              <GiftedChat
                messages={messages}
                onSend={text =>{ 
                  onSend(text);
                  
                }}
                user={{
                    _id: firebase.auth().currentUser.uid,
                }}
                renderBubble={(props)=>{
                    return <Bubble
                    {...props}
                    wrapperStyle={{
                      right: {
                        backgroundColor:"green",

                      },
                      left:{
                        backgroundColor:"#0D4C92",
                        }
                      
                    }}
                    
                    textStyle={{
        left: {
          color: '#fff',
        },
        
      }}

                  />
                }}

                renderInputToolbar={(props)=>{
                    return <InputToolbar {...props}
                    containerStyle={{borderTopWidth: 1.5, borderTopColor: 'blue'}}
                     textInputStyle={{ color: "black" }}
                     />
                }}
                
                />
    </View>

  )
}

export default ChatScreen;