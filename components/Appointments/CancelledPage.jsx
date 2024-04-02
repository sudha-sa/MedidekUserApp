import { StyleSheet, Text, View, TextInput, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Feather from '@expo/vector-icons/Feather'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import Ionicons from '@expo/vector-icons/Ionicons'
import CancelPopup from './CancelPopup'
import { useNavigation } from '@react-navigation/native'
import moment from 'moment'

const CancelledPage = ({route}) => {
  console.log(route?.params)
  const item = route?.params?.item;
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <View style={{ margin: 10, gap: 16 }}>
        <View style={{ flexDirection: 'row', borderWidth: 1, borderRadius: 68, borderColor: '#0000001F', paddingHorizontal: 16, paddingVertical: 10, marginHorizontal: 10, gap: 5, alignItems: 'center', justifyContent: 'space-between' }}>
          <TextInput placeholder='Search Appointment' placeholderTextColor={"#5D5E61BD"} style={{ color: '#5D5E61BD', fontSize: 13, fontWeight: '500', width: '90%' }} />
          <Feather name='search' color={'#108ED6'} size={19} />
        </View>
        <ScrollView>
          <View style={{ borderWidth: 1, borderColor: '#D9D9D961', borderRadius: 5, padding: 16, gap: 16 }}>
            <View style={{ flexDirection: 'row', gap: 15 }}>
              <Image source={require("../../assets/Ellipse30.png")} resizeMode='cover' style={{ width: 68, height: 68 }} />
              <View style={{ gap: 3, width: '90%' }}>
                <Text style={{ color: '#1F51C6', fontSize: 10, fontWeight: '600', backgroundColor: '#108ED647', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 5, width: '40%' }}>Appointment {item?.doctorid?.acceptAppointments}</Text>
                <Text style={{ color: '#353535', fontSize: 16, fontWeight: '500' }}>{item?.doctorid?.nameOfTheDoctor}</Text>
                <View style={{ flexDirection: 'row', gap: 15 }}>
                  <Text style={{ color: '#263238', fontSize: 13, fontWeight: '500' }}><Feather name='calendar' color={"#108ED6"} size={13} /> {moment(item?.appointmentDate).format("DD MMM dddd")}</Text>
                  <Text style={{ color: '#263238', fontSize: 13, fontWeight: '500' }}><FontAwesome6 name='clock-rotate-left' color={"#108ED6"} size={13} /> {item.AppointmentTime}</Text>
                </View>
                <Text style={{ color: '#706D6D', fontSize: 13, fontWeight: '600' }}><FontAwesome name='location-arrow' size={11} color={"#108ED6"} />{item.doctorid.location}</Text>
                <Text style={{ color: '#FFFFFF', fontSize: 10, fontWeight: '600', backgroundColor: '#EA43359C', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 5, width: '50%' }}><Image source={require('../../assets/icons_cross.png')} resizeMode='contain' /> Appointment Cancelled</Text>
              </View>
            </View>

            <View style={{ borderWidth: 0.5, borderColor: '#D9D9D980', marginBottom: 15, borderStyle: 'dashed' }}></View>

            <View style={{ flexDirection: 'row', gap: 16 }}>
              <Text style={{ color: '#263238', fontSize: 13, fontWeight: '600' }}>#Appointment ID: <Text style={{ fontWeight: '500' }}>2204654</Text></Text>
              <Text style={{ color: '#263238', fontSize: 13, fontWeight: '600' }}>Estimated Time: <Text style={{ fontWeight: '500' }}>2 hours left</Text></Text>
            </View>

            <View style={{ borderWidth: 0.5, borderColor: '#D9D9D980', marginBottom: 15, borderStyle: 'dashed' }}></View>


            <View>
              <View style={{ flexDirection: "row", gap: 10 }}>
                <View>
                  <View
                    style={{
                      height: 30,
                      width: 30,
                      backgroundColor: "#EA4335",
                      borderRadius: 50,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Ionicons name="close" size={20} color="#FFFFFF" />
                    </View>

                  <View style={{ alignItems: "center" }}>
                    <View
                      style={{
                        height: 5,
                        width: 2,
                        backgroundColor: "#EA4335",
                      }}
                    ></View>
                    <View
                      style={{
                        height: 5,
                        width: 2,
                        backgroundColor: "#EA4335",
                      }}
                    ></View>
                    <View
                      style={{
                        height: 5,
                        width: 2,
                        backgroundColor: "#EA4335",
                      }}
                    ></View>
                    <View
                      style={{
                        height: 5,
                        width: 2,
                        backgroundColor: "#EA4335",
                      }}
                    ></View>
                    <View
                      style={{
                        height: 5,
                        width: 2,
                        backgroundColor: "#EA4335",
                      }}
                    ></View>
                    <View
                      style={{
                        height: 5,
                        width: 2,
                        backgroundColor: "#EA4335",
                      }}
                    ></View>
                    <View
                      style={{
                        height: 5,
                        width: 2,
                        backgroundColor: "#EA4335",
                      }}
                    ></View>
                    <View
                      style={{
                        height: 5,
                        width: 2,
                        backgroundColor: "#EA4335",
                      }}
                    ></View>
                    <View
                      style={{
                        height: 5,
                        width: 2,
                        backgroundColor: "#EA4335",
                      }}
                    ></View>
                    <View
                      style={{
                        height: 5,
                        width: 2,
                        backgroundColor: "#EA4335",
                      }}
                    ></View>
                  </View>
                </View>
                <View >
                  <Text
                    style={{
                      color: "#263238",
                      fontSize: 13,
                      fontWeight: "600",
                      marginTop:5
                    }}
                  >
                    Appointment Confirmed
                  </Text>
                </View>
              </View>

              <View style={{ flexDirection: "row", gap: 9 }}>
                <View>
                  <View
                    style={{
                      height: 30,
                      width: 30,
                      borderRadius: 50,
                      backgroundColor: "#EA4335",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Ionicons name="close" size={20} color="#FFFFFF" />
                  </View>
                  <View style={{ alignItems: "center", }}>
                  <View
                      style={{
                        height: 5,
                        width: 2,
                        backgroundColor: "#EA4335",
                      }}
                    ></View>
                  <View
                      style={{
                        height: 5,
                        width: 2,
                        backgroundColor: "#EA4335",
                      }}
                    ></View>
                  <View
                      style={{
                        height: 5,
                        width: 2,
                        backgroundColor: "#EA4335",
                      }}
                    ></View>
                  <View
                      style={{
                        height: 5,
                        width: 2,
                        backgroundColor: "#EA4335",
                      }}
                    ></View>
                  <View
                      style={{
                        height: 5,
                        width: 2,
                        backgroundColor: "#EA4335",
                      }}
                    ></View>
                  <View
                      style={{
                        height: 5,
                        width: 2,
                        backgroundColor: "#EA4335",
                      }}
                    ></View>
                  <View
                      style={{
                        height: 5,
                        width: 2,
                        backgroundColor: "#EA4335",
                      }}
                    ></View>
                  <View
                      style={{
                        height: 5,
                        width: 2,
                        backgroundColor: "#EA4335",
                      }}
                    ></View>
                  <View
                      style={{
                        height: 5,
                        width: 2,
                        backgroundColor: "#EA4335",
                      }}
                    ></View>
                  <View
                      style={{
                        height: 5,
                        width: 2,
                        backgroundColor: "#EA4335",
                      }}
                    ></View>
                  </View>
                </View>
                <View>
                  <Text
                     style={{
                      color: "#263238",
                      fontSize: 13,
                      fontWeight: "600",
                      marginTop:5
                     }}
                  >
                   Appointment Cancelled by you
                  </Text>
                </View>
              </View>

              <View style={{ flexDirection: "row", gap: 9 }}>
                <View>
                  <View
                    style={{
                      height: 30,
                      width: 30,
                      borderRadius: 50,
                      backgroundColor: "#EA4335",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Ionicons name="close" size={20} color="#FFFFFF" />

                  </View>
                </View>
                <View>
                  <Text
                    style={{
                      color: "#263238",
                      fontSize: 13,
                      fontWeight: "600",
                      marginTop:5
                    }}
                  >
                    Appointment Completed
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <TouchableOpacity onPress={() =>navigation.navigate('Doctors')} style={{ backgroundColor: '#1F51C6', justifyContent: 'center', alignSelf: 'center', paddingHorizontal: 53, paddingVertical: 16, borderRadius: 50, width: '60%', marginVertical: 16 }}>
            <Text style={{ color: '#FFFFFF', fontSize: 13, fontWeight: '500' , textAlign:'center'}}>Book Again</Text>
          </TouchableOpacity>

        </ScrollView>
      </View>
    </View>
  )
}

export default CancelledPage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})