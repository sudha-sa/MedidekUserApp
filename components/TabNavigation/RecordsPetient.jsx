import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, Alert } from 'react-native'
import React, { useCallback, useState } from 'react'
import Entypo from '@expo/vector-icons/Entypo'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { axiosClient } from '../Api/Axios'
import { useAuthentication } from '../context/UserContext'
import * as DocumentPicker from 'expo-document-picker';

export let output = []
const RecordsPetient = () => {
  const [images, setimages] = useState([])
  const {user,setuser} =useAuthentication()
  const navigation =useNavigation()
    const [image, setImage] = useState({
        uri:"",
        filename:"",
        type:"",
        name:"",
      });
// console.log(setImage)
      async function pickDocument() {
        try {
          let result = await DocumentPicker.getDocumentAsync({multiple:false});
          console.log(result);
          let fileType = result.assets[0].name.split('.').pop().toLowerCase();
          console.log(fileType)
          const imageTypes = ['jpg', 'jpeg', 'png', 'bmp', 'gif', 'webp'];
          if(!result.canceled && imageTypes.includes(fileType)){
            setImage({
              ...image,
              uri: result.assets[0].uri,
              name:result.assets[0].name,
              filename: result.assets[0].name,
              type: result.assets[0].mimeType
            })
          }
          else{
            Alert.alert("Sorry , we only accept images");
            setImage({
              ...image,
              uri: "",
              name:"",
              filename: "",
              type: ""
            })
          }
          // Yahaan aap result ko handle kar sakte hain, jaise ki upload karna etc.
        } catch (error) {
          console.error(error);
        }
      }

      const uploadrecoder =async()=>{
        try {
        console.log(user.user._id)
        const formdata = new FormData()
        formdata.append("image",image)
        const res = await axiosClient.post(`/v2/uploadRecord/${user.user._id}`,formdata,{
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'multipart/form-data'
            }
          }
          )

          if(res.data.statusCode == 201){
            navigation.navigate("HomePage")
          }
        } catch (error) {
            console.log(error)
            Alert.alert(error.message)
        }
      }


  const getallrecords =async()=>{
    try {
      
    const res = await axiosClient.get(`/v2/getRecordOfPatient/${user.user._id}`)
    console.log(res)
    console.log(res.data.result)
    setimages(res.data.result)
    console.log(res.data.statusCode)
  } catch (error) {
      console.log(error)
      Alert.alert(error.message)
  }
  }

  useFocusEffect( 
    useCallback(()=>{
      getallrecords()
    },[user.user._id])
  )

  output = images?.map((item, index) => (
    {
      url: item.imgurl,
      id: index
    }
  ))


 
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ marginHorizontal: 10, marginVertical: 16, gap: 16 }}>
          <Text style={{ color: '#263238', fontSize: 13, fontWeight: '600', }}>Have a Medical Record? Upload it here!</Text>

          <TouchableOpacity onPress={()=>navigation.navigate("UploadRecordsPatient")} style={{ borderWidth: 1, borderColor: '#108ED6', borderStyle: 'dashed', borderRadius: 5, backgroundColor: '#D7ECF8', justifyContent: 'center', alignItems: 'center', height: 144 }}>
            <Text style={{ color: '#1F51C6', fontSize: 13, fontWeight: '700', }}>Upload from files </Text>
            <Text style={{ color: '#828489', fontSize: 13, fontWeight: '500', }}>Supported formats: pdf, jpg, png, docx, jpeg.</Text>
          </TouchableOpacity>

          <Text style={{ color: '#263238', fontSize: 13, fontWeight: '600', }}>Your Records</Text>

          <View style={{flexDirection:'row', gap:8, flexWrap:'wrap',}}> 
            {
              images && images.map((item,i)=>(
            <TouchableOpacity 
             key={item._id}
             onPress={()=> navigation.navigate('ShowImage', {
              index: i,
              state: true,
            })}
            style={{ borderRadius: 5, borderWidth: 1, borderColor: '#D9D9D982', width: 105, }}>
              <Image source={{uri:item.imgurl}} resizeMode='cover' style={{ width: 105, height: 80 }} />
              <View style={{ flexDirection: 'row', paddingVertical: 8, paddingHorizontal: 5, justifyContent: 'space-between',}}>
                {/* <View>
                  <Text style={{ color: '#000000', fontSize: 8, fontWeight: '500', }}>Record 1</Text>
                  <Text style={{ color: '#706D6D', fontSize: 8, fontWeight: '500', }}>{item.imgsize}</Text>
                </View> */}
                {/* <Entypo name='dots-three-vertical' color={'#108ED6'} /> */}
              </View>
            </TouchableOpacity>
              ))
            }

          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default RecordsPetient

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})