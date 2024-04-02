import { StyleSheet, Text, View, TouchableOpacity , Image} from 'react-native'
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePagePatients from './HomePagePatients';
import AppointmentsOfPatient from './AppointmentsOfPatient';
import FindDoctorsByPatient from './FindDoctorsByPatient';
import RecordsPetient from './RecordsPetient';
import { useNavigation } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const HomePage = () => {
  const navigation = useNavigation()
  return (
    <Tab.Navigator initialRouteName='Home'>
      <Tab.Screen name="Home" component={HomePagePatients} options={{
        headerShown: false,
        tabBarIcon: ({ color, size, focused }) => (
          focused ?
            <View style={{ width: 32, height: 32, borderRadius: 50, backgroundColor: '#1F51C6', justifyContent:'center', alignItems:'center' }}>
              <Image source={require('../../assets/home.png')} style={{ width: 14, height: 14, resizeMode: 'contain' }} />
            </View>
            :
            <View style={{ width: 32, height: 32, borderRadius: 50, backgroundColor: '#D9D9D9',justifyContent:'center', alignItems:'center'  }}>
              <Image source={require('../../assets/home.png')} style={{ width: 14, height: 14, resizeMode: 'contain' }} />
            </View>
        )
      }} />
      <Tab.Screen name="Doctors" component={FindDoctorsByPatient} options={{
        headerTitleAlign: 'center',
        headerTitle: 'Find Doctors',
        tabBarIcon: ({ color, size, focused }) => (
          focused ?
            <View style={{ width: 32, height: 32, borderRadius: 50, backgroundColor: '#1F51C6', justifyContent:'center', alignItems:'center' }}>
              <Image source={require('../../assets/stethoscope.png')} style={{ width: 14, height: 14, resizeMode: 'contain' }} />
            </View>
            :
            <View style={{ width: 32, height: 32, borderRadius: 50, backgroundColor: '#D9D9D9',justifyContent:'center', alignItems:'center'  }}>
              <Image source={require('../../assets/stethoscope.png')} style={{ width: 14, height: 14, resizeMode: 'contain' }} />
            </View>
        ),
        headerLeft: (props) => <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name='left' size={15} style={{ paddingHorizontal: 10 }} />
        </TouchableOpacity>,
        headerTitleStyle: { color: '#404040', fontSize: 16, fontWeight: '600' }
      }} />
      <Tab.Screen name="Appointments" component={AppointmentsOfPatient} options={{
        headerTitleAlign: 'center',
        tabBarIcon: ({ color, size, focused }) => (
          focused ?
            <View style={{ width: 32, height: 32, borderRadius: 50, backgroundColor: '#1F51C6', justifyContent:'center', alignItems:'center' }}>
              <Image source={require('../../assets/calendar.png')} style={{ width: 14, height: 14, resizeMode: 'contain' }} />
            </View>
            :
            <View style={{ width: 32, height: 32, borderRadius: 50, backgroundColor: '#D9D9D9',justifyContent:'center', alignItems:'center'  }}>
              <Image source={require('../../assets/calendar.png')} style={{ width: 14, height: 14, resizeMode: 'contain' }} />
            </View>
        ),
        headerLeft: (props) => <TouchableOpacity onPress={() => navigation.goBack()} >
          <AntDesign name='left' size={15} style={{ paddingHorizontal: 10 }} />
        </TouchableOpacity>,
        headerTitleStyle: { color: '#404040', fontSize: 16, fontWeight: '600' }
      }} />
      <Tab.Screen name="Records" component={RecordsPetient} options={{
        headerTitleAlign: 'center',
        headerTitle: 'Medical Records',
        tabBarIcon: ({ color, size, focused }) => (
          focused ?
            <View style={{ width: 32, height: 32, borderRadius: 50, backgroundColor: '#1F51C6', justifyContent:'center', alignItems:'center' }}>
              <Image source={require('../../assets/file.png')} style={{ width: 14, height: 14, resizeMode: 'contain' }} />
            </View>
            :
            <View style={{ width: 32, height: 32, borderRadius: 50, backgroundColor: '#D9D9D9',justifyContent:'center', alignItems:'center'  }}>
              <Image source={require('../../assets/file.png')} style={{ width: 14, height: 14, resizeMode: 'contain' }} />
            </View>
        ),
        headerLeft: (props) => <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name='left' size={15} style={{ paddingHorizontal: 10 }} />
        </TouchableOpacity>,
        headerTitleStyle: { color: '#404040', fontSize: 16, fontWeight: '600' }
      }} />
    </Tab.Navigator>
  )
}

export default HomePage

const styles = StyleSheet.create({})