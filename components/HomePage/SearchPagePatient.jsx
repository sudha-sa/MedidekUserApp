import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import Feather from '@expo/vector-icons/Feather'
const SearchPagePatient = () => {
  return (
    <View style={styles.container}>

     <View style={{ flexDirection: 'row', borderWidth: 1, borderRadius: 68, borderColor: '#0000001F', paddingHorizontal:10,paddingVertical:10, gap: 5, alignItems: 'center' }}>
        <Feather name='search' color={'#108ED6'} size={19} />
        <TextInput placeholder='Search for Doctors, Hospitals, Medicines,etc' placeholderTextColor={"#939191"} style={{ color: '#939191', fontSize: 13, fontWeight: '500', width:'100%' }} />
      </View>
    </View>
  )
}

export default SearchPagePatient

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
      },
})