import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { axiosClient } from '../Api/Axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthentication } from '../context/UserContext';

const EnterPasswordPage = ({route}) => {
  const navigation = useNavigation()
  const {user, setuser, signselect, setsignselect} = useAuthentication()

  const email =route.params.email;
  console.log(email)
  const [password,setpassword]=useState("");


  
  const userSignup =async() =>{
    if(!password){
     return  Alert.alert("Password must ")
    }
    try {
      const res = await axiosClient.post("/v2/userSignUp",{email,password})
      console.log(res.data)
      if(res.data.statusCode ==200){
        setuser({...user,
           token: res?.data?.result?.accessToken,
          user: res?.data?.result?.ispatient
          })
          await AsyncStorage.setItem('token', res?.data?.result?.accessToken)
          await AsyncStorage.setItem('userdata', JSON.stringify(res?.data?.result?.ispatient))
          if(signselect == 0 ){
            navigation.navigate('HomePage')
          }else{
            navigation.navigate('CreateProfilePatient')
          }
      }
    } catch (error) {
      console.log(error)
      Alert.alert(error)
    }
  }

  const Isuserexist = async() =>{
    const token = await AsyncStorage.getItem('token')
    const userdata = await AsyncStorage.getItem('userdata')
  
    if(token && userdata){
      navigation.navigate('HomePage')
    }
   }
  
   useFocusEffect(
    useCallback(()=>{
  Isuserexist()
    },[])
   )

  return (
    <LinearGradient
    style={{ flex: 1, backgroundColor: "#FFFFFF" }}
    colors=
    {["#1F51C66B", "#108ED66B", 'transparent']}
    start={{ x: 2, y: 2.3 }}
    end={{ x: 3, y: 0.3 }}
  >
    <View style={{ marginHorizontal: 22,  height:'77%'}}>
      <View style={{ marginVertical: 45, alignItems: 'center', flex: 6 }}>
        <Image source={require("../../assets/medidek-logo.png")} resizeMode='contain' style={{ width: 141, height: 44 }} />
      </View>

      <View style={{ marginTop: 70, }}>
        <Image source={require('../../assets/Group960.png')} resizeMode='contain' style={{ width: 188, height: 57 }} />
      </View>
      <View style={{ marginVertical: 35, alignItems: 'flex-end', }}>
        <Image source={require('../../assets/Group959.png')} resizeMode='contain' style={{ width: 188, height: 57 }} />
      </View>
      <View style={{ flexDirection: 'row', width: '100%',}} resizeMode='cover'>
        <View style={{ width: '10%,', marginVertical: 25, }}>
          <Image source={require('../../assets/Group961.png')} resizeMode='contain' style={{ width: 155, height: 57 }} />
        </View>
        <View style={{ alignItems: 'flex-end', width: '50%' }}>
          <Image source={require('../../assets/OBJECTS.png')} resizeMode='contain' style={{ width: 240, height: 208 }} />
        </View>
      </View>

    </View>

    <View style={{ backgroundColor: '#FFFFFF', paddingHorizontal: 32, paddingVertical: 16, borderTopLeftRadius: 20, borderTopRightRadius: 20, gap: 16, height:'25%' , marginTop:-5}}>
      <Text style={{ textAlign: 'center', color: '#000000', fontSize: 24, fontWeight: '600' }}>Enter Password</Text>
     
     <TextInput 
     value={password} onChangeText={(text)=>setpassword(text)} 
     placeholder='Enter Password' placeholderTextColor={'#706D6D'} style={{color:'#706D6D', fontSize:13, fontWeight:'500',borderWidth: 1, borderColor: '#ECECEC', borderRadius: 5, paddingHorizontal: 16, paddingVertical: 8 }}/>

     <TouchableOpacity 
     onPress={userSignup}
      style={{ backgroundColor: '#1F51C6AD', borderRadius: 5, paddingVertical: 15, }}>
        <Text style={{ color: '#FFFFFF', fontSize: 13, fontWeight: '500', textAlign: 'center' }}>Continue</Text>
      </TouchableOpacity>
    </View>
    <StatusBar style='auto' />
  </LinearGradient>
  )
}

export default EnterPasswordPage

const styles = StyleSheet.create({})