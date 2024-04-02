import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const LocationConfirmPopup = () => {
    const navigation = useNavigation()
  return (
    <View style={{ backgroundColor: "#00000099", height: "100%", width: "100%", position: "absolute", display: "flex", justifyContent: "flex-end", alignItems: "center",}}>
    <View>
      <TouchableOpacity onPress={()=>setlocationenable(!locationenable)}>
        <Image source={require('../../assets/Group921.png')}/>
      </TouchableOpacity>
    </View>
  <View style={{ backgroundColor: '#FFFFFF', borderRadius: 5, padding: 16, justifyContent: 'center', alignItems: 'center', gap:16 , marginVertical:10, marginHorizontal:16, width:'90%'}}>
      <Image source={require("../../assets/Group1053.png")} resizeMode='contain' style={{ height: 102, width: 103 }} />
      <View style={{justifyContent:'center', alignItems:'center'}}>
      <Text style={{ color: '#383838', fontSize: 16, fontWeight: '600' }}>Confirm Address?</Text>
      <Text style={{ color: '#706D6D', fontSize: 13, fontWeight: '500' }}>Are you sure you want to proceed?</Text>
      </View>
 <View style={{flexDirection:'row', gap:8}}>
  <TouchableOpacity onPress={()=>setlocationenable(!locationenable)} style={{backgroundColor:'#EDF1F9', borderRadius:5, paddingHorizontal:25, paddingVertical:15}}>
    <Text style={{ color: '#5D5E61BD', fontSize: 16, fontWeight: '600' }}>Cancel</Text>
  </TouchableOpacity>
  <TouchableOpacity style={{backgroundColor:'#1F51C6', borderRadius:5, paddingHorizontal:25, paddingVertical:15}}>
    <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '600' }}>Confirm</Text>
  </TouchableOpacity>
 
  </View>
  </View>
</View>
  )
}

export default LocationConfirmPopup

const styles = StyleSheet.create({})

