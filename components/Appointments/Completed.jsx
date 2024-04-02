import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Feather from '@expo/vector-icons/Feather'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import { useNavigation } from '@react-navigation/native'
import moment from 'moment'

const Completed = ({completedappointments}) => {
const navigation = useNavigation()
    return (
        <ScrollView style={{ marginHorizontal: 10, }}>
        <View style={{ borderWidth: 1, borderColor: '#D9D9D961', borderRadius: 5, padding: 16 }}>
        {
           completedappointments.length > 0 ?  completedappointments.map((item)=>(
             <View key={item} style={{ gap: 16 }}>
                <View style={{ flexDirection: 'row', gap: 15 }}>
                    <Image source={require("../../assets/Ellipse30.png")} resizeMode='cover' style={{ width: 68, height: 68 }} />
                    <View style={{ gap: 3, width:'70%' }}>
                        <Text style={{ color: '#1F51C6', fontSize: 10, fontWeight: '600', backgroundColor: '#108ED647', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 5 ,width:'40%'}}>{item?.doctorid?.acceptAppointments}</Text>
                        <Text style={{ color: '#353535', fontSize: 16, fontWeight: '500' }}>{item?.doctorid?.nameOfTheDoctor}</Text>
                        <View style={{ flexDirection: 'row', gap: 15 }}>
                            <Text style={{ color: '#263238', fontSize: 13, fontWeight: '500' }}><Feather name='calendar' color={"#108ED6"} size={13} />
                             {moment(item?.appointmentDate).format("DD MMM dddd")}
                             </Text>
                            <Text style={{ color: '#263238', fontSize: 13, fontWeight: '500' }}><FontAwesome6 name='clock-rotate-left' color={"#108ED6"} size={13} /> {item?.AppointmentTime}</Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity onPress={()=>navigation.navigate('CompletedPage',{item:item})} style={{ backgroundColor: '#1F51C6', borderRadius: 74, width: '100%', paddingVertical: 15, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: '#FFFFFF', fontSize: 13, fontWeight: '600' }} >View</Text>
                </TouchableOpacity>
            <View style={{ borderWidth: 0.5, borderColor: '#D9D9D980', marginBottom:15, borderStyle: 'dashed' }}></View>
            </View>
            )) 
            : <View>
                <Text>No Completed Appointments</Text>
            </View>
        }
        </View>
         



    </ScrollView>
    )
}

export default Completed

const styles = StyleSheet.create({})