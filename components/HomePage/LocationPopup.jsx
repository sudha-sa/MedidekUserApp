import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

export default function LocationPopup({locationenable, setlocationenable,Inputlocation,loaction,setloaction}) {
const navigation = useNavigation()

  return (
    
    <View style={{ backgroundColor: "#00000099", height: "100%", width: "100%", position: "absolute", display: "flex", justifyContent: "flex-end", alignItems: "center",}}>
      <View>
        <TouchableOpacity onPress={()=>setlocationenable(!locationenable)}>
          <Image source={require('../../assets/Group921.png')}/>
        </TouchableOpacity>
      </View>
    <View style={{ backgroundColor: '#FFFFFF', borderRadius: 5, padding: 16, justifyContent: 'center', alignItems: 'center', gap:16 , marginVertical:10, marginHorizontal:16, width:'90%'}}>
        <Image source={require("../../assets/Group1021.png")} resizeMode='contain' style={{ height: 102, width: 103 }} />
        <View style={{justifyContent:'center', alignItems:'center'}}>
        <Text style={{ color: '#383838', fontSize: 16, fontWeight: '600' }}>Enable Location?</Text>
        <Text style={{ color: '#706D6D', fontSize: 13, fontWeight: '500' }}>Please Grant us access to your location for </Text>
        <Text style={{ color: '#706D6D', fontSize: 13, fontWeight: '500' }}>accurate & hassle-free services</Text>
        </View>
   <View style={{flexDirection:'row', gap:8}}>
    <TouchableOpacity onPress={()=>navigation.navigate("LocationPage")} style={{backgroundColor:'#EDF1F9', borderRadius:5, paddingHorizontal:25, paddingVertical:15}}>
      <Text style={{ color: '#5D5E61BD', fontSize: 16, fontWeight: '600' }}>Enter Location</Text>
      {/* <TextInput placeholder='Enter Location' value={ loaction ? loaction.substring(10,28): loaction} onChangeText={(text)=>setloaction(text)}/> */}
    </TouchableOpacity>
    <TouchableOpacity onPress={Inputlocation} style={{backgroundColor:'#1F51C6', borderRadius:5, paddingHorizontal:25, paddingVertical:15}}>
      <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '600' }}>Enable Location</Text>
    </TouchableOpacity>
   
    </View>
    </View>
</View>
  )
}