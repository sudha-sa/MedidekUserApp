import { StyleSheet, Text, View, TouchableOpacity,Image, Alert } from 'react-native'
import React,{useState} from 'react'
import { useNavigation } from '@react-navigation/native'
import * as DocumentPicker from 'expo-document-picker';
import { axiosClient } from '../Api/Axios';
import { useAuthentication } from '../context/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';


const UploadRecordsPatient = () => {
    const navigation =useNavigation()
    const {user,setuser} =useAuthentication()
    const [image, setImage] = useState({
        uri:"",
        filename:"",
        type:"",
        name:"",
      });



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
          if(!image.uri){
            Alert.alert("You must upload pictures or medical History")
            return ;
          }
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
          if(res.data.statusCode == 401){
            Alert.alert("Token Expired, Pls Login")
            await AsyncStorage.clear()
            await AsyncStorage.removeItem("token")
            await AsyncStorage.removeItem("userdata")
            navigation.navigate("SigninPage")
          }

          if(res.data.statusCode == 201){
            navigation.navigate("HomePage")
          }
        } catch (error) {
            console.log(error)
            Alert.alert(error.message)
        }
      }

      const logout =async()=>{
        await AsyncStorage.clear()
        await AsyncStorage.removeItem("token")
        await AsyncStorage.removeItem("userdata")
        navigation.navigate("SigninPage")
      }

    return (
        <View style={styles.container}>
            <View style={{ paddingVertical: 16, gap: 16, }}>
                <Text style={{ color: '#263238', fontSize: 13, fontWeight: '600', }}>Have a Medical Record? Upload it here!</Text>

                <TouchableOpacity onPress={pickDocument} style={{ borderWidth: 1, borderColor: '#108ED6', borderStyle: 'dashed', borderRadius:5, backgroundColor: '#D7ECF8', justifyContent:'center', alignItems:'center', height:144 }}>
                    <Text style={{ color: '#1F51C6', fontSize: 13, fontWeight: '700', }}>Upload from files </Text>
                    <Text style={{ color: '#828489', fontSize: 13, fontWeight: '500', }}>Supported formats: pdf, jpg, png, docx, jpeg.</Text>
                </TouchableOpacity>

            </View>
                {
                    image && <Image source={{uri:image.uri}} resizeMode='contain' width={"80%"} height={300} style={{marginHorizontal:20,borderRadius:40}}/>
                }
            <TouchableOpacity onPress={uploadrecoder} style={{marginVertical:10, paddingVertical: 15, backgroundColor: '#1F51C6', borderRadius: 5,  justifyContent: 'center', alignItems: 'center', width: '100%',}}>
                <Text style={{ color: '#FFFFFF', fontSize: 13, fontWeight: '500', }}>Continue</Text>
            </TouchableOpacity>
        </View>
    )
}

export default UploadRecordsPatient

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        justifyContent:'space-between'
    },
})