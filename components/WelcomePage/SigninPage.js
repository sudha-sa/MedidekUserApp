
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, ScrollView } from 'react-native'
import React, { useCallback, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { axiosClient } from '../Api/Axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthentication } from '../context/UserContext';



const SigninPage = () => {
  const { signselect, setsignselect } = useAuthentication()
  const navigation = useNavigation()
  const [email, setemail] = useState("")
  const [error, seterror] = useState(false)
  const [errmsg, seterrmsg] = useState("");
  const [loading, setloading] = useState(false);

  const EmailVerify = async () => {
    setloading(true)
    try {
      if (!email || !email.includes("@")) {
        seterror("true")
        setloading(false)
        return seterrmsg("pls enter email or enter email is not valid")
      }
      if (signselect == 0) {
        // login vaali api call ho rhi h yhan

        const res = await axiosClient.post("/v2/isUserEmailExist", { email })
        if (res?.data?.statusCode == 403) {
          setloading(false)
          seterror(true)
          seterrmsg(res.data.message)
        }
        if (res.data.statusCode == 200) {
          setloading(false)
          navigation.navigate("EnterPasswordPage", { email: email })
        }
      }
      else {
        try {
          setloading(true)
          const res = await axiosClient.post("/v2/otpVerificatorForMobileApp", { email: email })
          if (res.data.statusCode == 403) {
            setloading(false)
            seterror(true)
            seterrmsg(res.data.message)
          }
          if (res.data.statusCode == 200) {
            setloading(false)
            Alert.alert("OTP Send Sucessfuly on email", email)
            navigation.navigate("EnterOTPPage", {
              email: email
            })
          }
        }
        catch (error) {
          console.log(error)
          Alert.alert(error.message)
        }
      }
    }
    catch (error) {
      setloading(false)
    }
  }

  const Isuserexist = async () => {
    const token = await AsyncStorage.getItem('token')
    const userdata = await AsyncStorage.getItem('userdata')
    if (token && userdata) {
      navigation.navigate('HomePage')
    }
  }

  useFocusEffect(
    useCallback(() => {
      Isuserexist()
    }, [])
  )
  const onchangedata = (text) => {
    setemail(text)
    seterror(false)
  }
  return (

    <LinearGradient
      style={{ flex: 1, backgroundColor: "#FFFFFF" }}
      colors=
      {["#1F51C66B", "#108ED66B", 'transparent']}
      start={{ x: 2, y: 2.3 }}
      end={{ x: 3, y: 0.3 }}
    >
      <View style={{ marginHorizontal: 22, }}>
        <View style={{ marginVertical: 45, alignItems: 'center', flex: 6 }}>
          <Image source={require("../../assets/medidek-logo.png")} resizeMode='contain' style={{ width: 141, height: 44 }} />
        </View>

        <View style={{ marginTop: 70,}}>
          <View style={{ backgroundColor: '#FFFFFF', paddingHorizontal: 16, paddingVertical: 16, borderRadius: 5, width: '60%', }}>
            <Text style={{ color: '#1F51C6', fontSize: 16, fontWeight: '500', textAlign: 'center' }}>Track Appointment</Text>
          </View>
          {/* <Image source={require('../../assets/Group960.png')} resizeMode='contain' style={{ width: 188, height: 57 }} /> */}
        </View>
        <View style={{ marginVertical: 40, alignItems: 'flex-end', }}>
          <View style={{ backgroundColor: '#FFFFFF', paddingHorizontal: 16, paddingVertical: 16, borderRadius: 5, width: '60%', }}>
            <Text style={{ color: '#1F51C6', fontSize: 16, fontWeight: '500', textAlign: 'center' }}>Track Appointment</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', width: '100%',gap:30 }} resizeMode='cover'>
          <View style={{ width: '15%,', marginVertical: 25, }}>
            <View style={{ backgroundColor: '#FFFFFF', paddingHorizontal: 16, paddingVertical: 16, borderRadius: 5, }}>
              <Text style={{ color: '#1F51C6', fontSize: 16, fontWeight: '500', textAlign: 'center' }}>Upload Records</Text>
            </View>
          </View>
          <View style={{ alignItems: 'flex-end', width: '50%' }}>
            <Image source={require('../../assets/OBJECTS.png')} resizeMode='contain' style={{ width: 240, height: 208 }} />
          </View>
        </View>

      </View>
      <View style={{ backgroundColor: '#FFFFFF', paddingHorizontal: 32, paddingVertical: 16, borderTopLeftRadius: 20, borderTopRightRadius: 20, gap: 16, bottom: 0, position: 'absolute' }}>
        <Text style={{ textAlign: 'center', color: '#000000', fontSize: 24, fontWeight: '600' }}>Hi, Welcome 👋</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'center', gap: -20 }}>
          <TouchableOpacity onPress={() => setsignselect(0)} style={{ backgroundColor: signselect == 0 ? '#1F51C6' : '#D9D9D95C', paddingVertical: 16, paddingHorizontal: 65, borderTopRightRadius: signselect == 0 ? 50 : 0, borderBottomRightRadius: signselect == 0 ? 50 : 0, borderRadius: 50, zIndex: signselect == 0 ? 1 : 0 }}>
            <Text style={{ textAlign: 'center', color: signselect == 0 ? '#FFFFFF' : '#000000', fontSize: 13, fontWeight: '600' }}>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setsignselect(1)} style={{ backgroundColor: signselect == 1 ? '#1F51C6' : '#D9D9D95C', paddingVertical: 16, paddingHorizontal: 65, borderBottomLeftRadius: signselect == 1 ? 50 : 0, borderTopLeftRadius: signselect == 1 ? 50 : 0, borderRadius: 50, zIndex: signselect == 1 ? 1 : 0 }}>
            <Text style={{ textAlign: 'center', color: signselect == 1 ? '#FFFFFF' : '#000000', fontSize: 13, fontWeight: '600' }}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          value={email}
          onChangeText={(text) => onchangedata(text)}
          placeholder={"Enter Email"}
          placeholderTextColor={'#706D6D'} style={{ color: '#706D6D', fontSize: 13, fontWeight: '500', borderWidth: 1, borderColor: '#ECECEC', borderRadius: 5, paddingHorizontal: 16, paddingVertical: 8 }}
        />
        {error && <Text style={{ color: "red" }}>{errmsg}</Text>}
        <TouchableOpacity disabled={loading ? true : false} onPress={EmailVerify}
          style={{ backgroundColor: email ? "#1F51C6" : '#1F51C6AD', borderRadius: 5, paddingVertical: 15, }}>
          <Text style={{ color: '#FFFFFF', fontSize: 13, fontWeight: '500', textAlign: 'center' }}>{loading ? "loading..." : "Continue"}</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style='auto' />

    </LinearGradient>
  )
}

export default SigninPage

const styles = StyleSheet.create({

})