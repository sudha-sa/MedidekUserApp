import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useAuthentication } from '../context/UserContext'

const MainProfilePage = () => {

  const navigation = useNavigation()
  const {user,setuser}=useAuthentication()
  const logout =async()=>{
    await AsyncStorage.clear()
    await AsyncStorage.removeItem("token")
    await AsyncStorage.removeItem("userdata")
    navigation.navigate("SigninPage")
  }
  return (
    <View style={styles.container}>
      <View style={{ margin: 10 }}>
        <View style={{ alignItems: "center", marginVertical: 10 }}>
          <View  style={{ height: 80, width: 80, borderRadius: 50,borderWidth:1,borderColor:"#d9d9d9" }}>
          <Image source={{uri:user.user.imgurl}}
            resizeMode="cover"
            style={{ height: 80, width: 80, borderRadius: 50,borderWidth:2,borderColor:"#d9d9d9" }}
          />
          </View>
          <TouchableOpacity
           onPress={() => navigation.navigate('EditProfilePetient')}>
            <Image
              source={require("../../assets/Group769.png")}
              resizeMode="contain"
              style={{ height: 27, width: 27, marginTop: -20, marginLeft: 50 }}
            />
          </TouchableOpacity>
        </View>


        <View style={{ paddingHorizontal: 14, paddingVertical: 21, gap: 13 }}>
          <TouchableOpacity 
          onPress={() => navigation.navigate('EditProfilePetient')}
          style={{
            flexDirection: 'row',
            borderWidth: 1,
            borderRadius: 5,
            borderColor: "#D9D9D978",
            color: "#242323",
            fontSize: 13,
            fontWeight: "500",
            paddingVertical: 14,
            paddingHorizontal: 16,
         justifyContent:'space-between'
          }}>
            <View style={{flexDirection:'row',gap:5}}>
<MaterialIcons name='edit' color={'#108ED6'} size={20}/>
            <Text style={{color:'#383838',fontSize:15, fontWeight:'600' }}>Edit Profile</Text>
           </View>
            <MaterialIcons name='chevron-right' color={'#383838'} size={20}/>
          </TouchableOpacity>
          <TouchableOpacity 
          onPress={logout}
          style={{
            flexDirection: 'row',
            borderWidth: 1,
            borderRadius: 5,
            borderColor: "#D9D9D978",
            color: "#242323",
            fontSize: 13,
            fontWeight: "500",
            paddingVertical: 14,
            paddingHorizontal: 16,
            gap:5
          }}>
            <Image source={require('../../assets/Vectorlogout.png')} resizeMode='cover' width={18} height={20}/>
            <Text style={{color:'#383838',fontSize:15, fontWeight:'600' }}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default MainProfilePage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})