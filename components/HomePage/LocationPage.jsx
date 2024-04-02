import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, } from 'react-native'
import React, { useState } from 'react'
import Feather from '@expo/vector-icons/Feather'
import LocationConfirmPopup from './LocationConfirmPopup'

const LocationPage = () => {
const [locationconfirm, Setlocationconfirm] = useState(false)

    return (
        <View style={styles.container}>
            <View style={{ margin: 10, gap:16 }}>
                <View style={{ flexDirection: 'row', borderWidth: 1, borderRadius: 68, borderColor: '#0000001F', paddingHorizontal: 10, paddingVertical: 10, gap: 5, alignItems: 'center' }}>
                    <Feather name='search' color={'#108ED6'} size={19} />
                    <TextInput  placeholder='Search for Doctors, Hospitals, Medicines,etc' placeholderTextColor={"#939191"} style={{ color: '#939191', fontSize: 13, fontWeight: '500', width: '100%' }} />
                </View>

                <TouchableOpacity style={{ flexDirection: 'row', gap: 8, alignItems: 'center',paddingHorizontal:10 }}>
                    <Image source={require("../../assets/Vector.png")} style={{ height: 21, width: 21, objectFit: 'contain' }} />
                    <Text style={{ color: '#108ED6', fontSize: 13, fontWeight: '600', }}>Use Current Location</Text>
                </TouchableOpacity>
            </View>
            {
                locationconfirm && <LocationConfirmPopup locationconfirm={locationconfirm} Setlocationconfirm={Setlocationconfirm}/>
            }
        </View>
    )
}

export default LocationPage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
})