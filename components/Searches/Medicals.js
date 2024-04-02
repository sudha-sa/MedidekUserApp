import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import Feather from '@expo/vector-icons/Feather'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { useNavigation } from '@react-navigation/native'

const Medicals = () => {
    const [selectBiotee, setSelectBiotee] = useState([1, 2, 3, 4, 5, 6])
    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            <View style={{ margin: 10, gap: 16 }}>

                <View style={{ flexDirection: 'row', borderWidth: 1, borderRadius: 68, borderColor: '#0000001F', paddingHorizontal: 10, paddingVertical: 10, gap: 5, alignItems: 'center' }}>
                    <Feather name='search' color={'#108ED6'} size={19} />
                    <TextInput placeholder='Search for Doctors, Hospitals, Medicines,etc' placeholderTextColor={"#939191"} style={{ color: '#939191', fontSize: 13, fontWeight: '500', width: '100%' }} />
                </View>


                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ color: '#383838', fontSize: 13, fontWeight: '600', }}>15 Searches for biotee</Text>
                    <TouchableOpacity style={{ borderColor: '#D9D9D96E', borderWidth: 1, borderRadius: 50, paddingVertical: 5, paddingHorizontal: 12, flexDirection: 'row' }}>
                        <MaterialCommunityIcons name='filter' color={'#383838'} size={15} />
                        <Text style={{ color: '#383838', fontSize: 13, fontWeight: '600', }}>Sort/filter</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView style={{}}>
                    {
                        selectBiotee.map((item) => (
                            <TouchableOpacity onPress={()=>navigation.navigate('MedicalsInfo')} key={item} style={{ gap: 16, marginBottom: 12, }}>
                                <View style={{ borderWidth: 0.5, borderColor: '#D9D9D980', borderStyle: 'dashed' }}></View>

                                <View style={{ flexDirection: 'row', gap: 15, }}>
                                    <Image source={require("../../assets/Rectangle1758.png")} resizeMode='cover' style={{ width: 70, height: 70, borderRadius:5, borderColor:'#D9D9D9', borderWidth:1 }} />
                                    <View style={{ gap: 3 }}>
                                        <Text style={{ color: '#353535', fontSize: 16, fontWeight: '600' }}>Biotee Forte Tablet 10</Text>
                                     <Text style={{ color: '#706D6D', fontSize: 13, fontWeight: '600' }}>Seller: Om Medicals </Text>
                                        <Text style={{ color: '#706D6D', fontSize: 13, fontWeight: '600' }}><FontAwesome name='rupee' size={11} color={"#706D6D"} /> 500  (₹520) 20% off</Text>
                                        <Text style={{ color: '#706D6D', fontSize: 13, fontWeight: '600' }}><FontAwesome name='location-arrow' size={11} color={"#108ED6"} /> Wokhardt hospital, near LAD College, Nagpur.</Text>
                                       </View>
                                </View>
                            </TouchableOpacity>

                        ))
                    }
                </ScrollView>
            </View>
        </View>
    )
}

export default Medicals

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
})