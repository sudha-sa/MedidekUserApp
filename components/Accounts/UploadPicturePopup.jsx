import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import Feather from '@expo/vector-icons/Feather'
import Fontisto from '@expo/vector-icons/Fontisto'

const UploadPicturePopup = ({ isupload, setisupload ,SelectPicTure}) => {
  return (
    <View style={{ backgroundColor: "#00000099", height: "100%", width: "100%", position: "absolute", display: "flex", justifyContent: "flex-end", alignItems: "center", }}>
      <View>
        <TouchableOpacity onPress={() => setisupload(!isupload)}>
          <Image source={require('../../assets/Group921.png')} />
        </TouchableOpacity>
      </View>

      <View style={{ backgroundColor: '#FFFFFF', borderRadius: 5, padding: 16, justifyContent: 'center',  gap:24 , marginVertical:10, marginHorizontal:15, width:'90%'}}>
 <Text style={{ color: '#4B4A4A', fontSize: 18, fontWeight: '600' }}>Upload Picture</Text>

        <View style={{ flexDirection: 'row', gap: 16 }}>
          <TouchableOpacity style={{ width: 56, height: 56, borderWidth: 1, borderColor: '#D1D1D6', borderRadius: 50, justifyContent: 'center', alignItems: 'center' }}>
            <Fontisto name='camera' size={28} color={'#108ED6'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={SelectPicTure} style={{ width: 56, height: 56, borderWidth: 1, borderColor: '#D1D1D6', borderRadius: 50, justifyContent: 'center', alignItems: 'center' }}>
            <Feather name='upload' size={28} color={'#108ED6'} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default UploadPicturePopup

const styles = StyleSheet.create({

})