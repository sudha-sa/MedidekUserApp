import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, { useCallback, useState } from 'react'
import Feather from '@expo/vector-icons/Feather'
import Upcoming from '../Appointments/Upcoming'
import Completed from '../Appointments/Completed'
import Cancelled from '../Appointments/Cancelled'
import { axiosClient } from '../Api/Axios'
import { useAuthentication } from '../context/UserContext'
import { useFocusEffect } from '@react-navigation/native'



const AppointmentsOfPatient = () => {
  const [select, setSelect] = useState(0)
  const {user,setuser}=useAuthentication();
  const [upcomingappointments ,setupcomingappointments] =useState([])
  const [completedappointments ,setcompletedappointments] =useState([])
  const [missedappointments ,setmissedappointments] =useState([])

  const getappointments  =async() =>{
    const upcoming = await axiosClient.get(`/v2/getPendingAppointmentForPatient/${user.user._id}`)
    if(upcoming.data.statusCode == 401){
      Alert.alert("Token Expired, Pls Login")
      await AsyncStorage.clear()
      await AsyncStorage.removeItem("token")
      await AsyncStorage.removeItem("userdata")
      navigation.navigate("SigninPage")
    }
    if(upcoming.data.statusCode == 200){
        setupcomingappointments(upcoming.data.result)
    }
    
    const completed = await axiosClient.get(`/v2/getCompletedAppointment/${user.user._id}`)
    if(completed.data.statusCode == 401){
      Alert.alert("Token Expired, Pls Login")
      await AsyncStorage.clear()
      await AsyncStorage.removeItem("token")
      await AsyncStorage.removeItem("userdata")
      navigation.navigate("SigninPage")
    }
    if(completed.data.statusCode == 200){
     setcompletedappointments(completed.data.result)
    }
    const missed = await axiosClient.get(`/v2/getMissedAppointment/${user.user._id}`)
    if(missed.data.statusCode == 401){
      Alert.alert("Token Expired, Pls Login")
      await AsyncStorage.clear()
      await AsyncStorage.removeItem("token")
      await AsyncStorage.removeItem("userdata")
      navigation.navigate("SigninPage")
    }

    if(missed.data.statusCode == 200){
      setmissedappointments(missed.data.result)
    }
  }
useFocusEffect(useCallback(()=>{
  getappointments()
},[]))
  function SelectTab(i){
    setSelect(i)
  }
  return (
    <View style={styles.container}>
     <View style={{ flexDirection: 'row', borderWidth: 1, borderRadius: 68, borderColor: '#0000001F', paddingHorizontal:16,paddingVertical:10, marginHorizontal:10, gap: 5, alignItems: 'center', justifyContent:'space-between' }}>
        <TextInput placeholder='Search Appointment' placeholderTextColor={"#5D5E61BD"} style={{ color: '#5D5E61BD', fontSize: 13, fontWeight: '500', width:'90%' }} />
        <Feather name='search' color={'#108ED6'} size={19} />
      </View>

<View style={{flexDirection:'row', gap:8, justifyContent:'space-between', marginVertical:15,marginHorizontal:10,}}>
<TouchableOpacity onPress={()=>SelectTab(0)} style={{backgroundColor:select == 0 ? '#1F51C6' : '#FFFFFF',paddingHorizontal:28, paddingVertical:16, borderWidth:1, borderColor:'#D9D9D961', borderRadius:125}}>
  <Text  style={{ color: select == 0 ? '#FFFFFF': '#5D5E61BD', fontSize: 13, fontWeight: '600' }}>Upcoming</Text>
</TouchableOpacity>
<TouchableOpacity onPress={()=>SelectTab(1)} style={{backgroundColor:select == 1 ? '#1F51C6' : '#FFFFFF',paddingHorizontal:28, paddingVertical:16, borderWidth:1, borderColor:'#D9D9D961', borderRadius:125}}>
  <Text  style={{ color: select == 1 ? '#FFFFFF': '#5D5E61BD', fontSize: 13, fontWeight: '600' }}>Completed</Text>
</TouchableOpacity>
<TouchableOpacity onPress={()=>SelectTab(2)} style={{backgroundColor:select == 2 ? '#1F51C6' : '#FFFFFF',paddingHorizontal:28, paddingVertical:16, borderWidth:1, borderColor:'#D9D9D961', borderRadius:125}}>
  <Text  style={{ color: select == 2 ? '#FFFFFF': '#5D5E61BD', fontSize: 13, fontWeight: '600' }}>Cancelled</Text>
</TouchableOpacity>
</View>


{
 select == 0 && <Upcoming upcomingappointments={upcomingappointments} getappointments={getappointments}/>
}
{
 select == 1 && <Completed completedappointments={completedappointments}/>
}
{
 select == 2 && <Cancelled missedappointments={missedappointments}/>
}

    </View>
  )
}

export default AppointmentsOfPatient

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})