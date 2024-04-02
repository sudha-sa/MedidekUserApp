import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View,Alert } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { axiosClient } from '../Api/Axios';


const EnterOTPPage = ({ route }) => {
  const email =route.params.email;
  const navigation = useNavigation()
  const [otp, setotp] = useState("");

  const OTPVERIFY =async()=>{
    try {
    const res = await axiosClient.post("/v2/otpverify",{email,otp})
    console.log(res.data)
    if(res.data.statusCode == 200){
      Alert.alert(res.data.result);
      setotp("")
      navigation.navigate("EnterPasswordPage",{
        email:email
      })
    }
  } catch (error) {
      console.log("Error in Otp Verification",error)
      Alert.alert("Error in OTP Verifcation",error.message)
  }

  }

  return (
    <LinearGradient
      style={{ flex: 1, backgroundColor: "#FFFFFF" }}
      colors=
      {["#1F51C66B", "#108ED66B", 'transparent']}
      start={{ x: 2, y: 2.3 }}
      end={{ x: 3, y: 0.3 }}
    >
      <View style={{ marginHorizontal: 22, height: '75%' }}>
        <View style={{ marginVertical: 45, alignItems: 'center', flex: 6 }}>
          <Image source={require("../../assets/medidek-logo.png")} resizeMode='contain' style={{ width: 141, height: 44 }} />
        </View>

        <View style={{ marginTop: 70, }}>
          <Image source={require('../../assets/Group960.png')} resizeMode='contain' style={{ width: 188, height: 57 }} />
        </View>
        <View style={{ marginVertical: 35, alignItems: 'flex-end', }}>
          <Image source={require('../../assets/Group959.png')} resizeMode='contain' style={{ width: 188, height: 57 }} />
        </View>
        <View style={{ flexDirection: 'row', width: '100%', }} resizeMode='cover'>
          <View style={{ width: '10%,', marginVertical: 25, }}>
            <Image source={require('../../assets/Group961.png')} resizeMode='contain' style={{ width: 155, height: 57 }} />
          </View>
          <View style={{ alignItems: 'flex-end', width: '50%' }}>
            <Image source={require('../../assets/OBJECTS.png')} resizeMode='contain' style={{ width: 240, height: 208 }} />
          </View>
        </View>

      </View>

      <View style={{ backgroundColor: '#FFFFFF', paddingHorizontal: 32, paddingVertical: 16, borderTopLeftRadius: 20, borderTopRightRadius: 20, gap: 16,  height:'30%' , marginTop:-5}}>
        <Text style={{ textAlign: 'center', color: '#000000', fontSize: 24, fontWeight: '600' }}>Enter OTP</Text>
        <Text style={{ textAlign: 'center', color: '#706D6D', fontSize: 13, fontWeight: '600' }}>Enter OTP sent on {email} to Sign In </Text>

        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
          <TextInput placeholder='ENTER OTP' keyboardType='number-pad'
            // value={otp}
            onChangeText={(text) => setotp(text)} 
            style={{borderBottomWidth:1, width:'100%', borderBottomColor:'#D9D9D9'}}
            // style={{ borderColor:'#D9D9D9', borderWidth:1,borderRadius:5, width:'100%', paddingVertical:5,paddingHorizontal:16}}
            />
        </View>

        <TouchableOpacity 
          onPress={OTPVERIFY}
          style={{ backgroundColor: otp ? "#1F51C6" : '#1F51C6AD', borderRadius: 5, paddingVertical: 15, }}>
          <Text style={{ color: '#FFFFFF', fontSize: 13, fontWeight: '500', textAlign: 'center' }}>Continue</Text>
        </TouchableOpacity>
      </View>

      <StatusBar style='auto' />
    </LinearGradient>
  )
}

export default EnterOTPPage

const styles = StyleSheet.create({})