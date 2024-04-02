import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, ScrollView, ImageBackground } from 'react-native';
import React, { useCallback, useState } from 'react'
import Feather from '@expo/vector-icons/Feather'
import Ionicons from '@expo/vector-icons/Ionicons'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import * as Location from "expo-location";
import LocationPopup from '../HomePage/LocationPopup';
import { axiosClient } from '../Api/Axios';
import { useAuthentication } from '../context/UserContext';





const HomePagePatients = () => {
const navigation = useNavigation()
const [locationenable, setlocationenable] = useState(false)
const [loaction,setloaction]=useState("")
const [doctors,setdoctors]=useState([]);
const {user}=useAuthentication()


const getalldoctors =async()=>{
  const res = await axiosClient.get("/v2/getusergetalldoctors")
  setdoctors(res.data.result)
}

useFocusEffect(
  useCallback(()=>{
    getalldoctors()
},[]))

const getmapresults = async (latitude, longitude) => {
  if (latitude && longitude) {
    const result = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyAqwfQ8_72yf13zLwiFI5c9ftGG1xNXC_0`
    );
    const data = await result.json();
    setloaction(data.results[1].formatted_address)
    setlocationenable(false)
   console.log(data.results[1].formatted_address)
  } else {
    alert("Please provide latitude and longitude");
  }
};

const Inputlocation = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    setErrorMsg("Permission to access location was denied");
    return;
  }

  let location = await Location.getCurrentPositionAsync({});
  console.log("locationnnn",location)
  getmapresults(location?.coords?.latitude, location?.coords?.longitude);
};

useFocusEffect(
  useCallback(()=>{
       setlocationenable(true)
  }, [])
)
  return (
    <View style={styles.container}>

      <View style={{ flexDirection: 'row', marginVertical: 15, justifyContent: 'space-between' , marginHorizontal:10, marginTop:45, alignItems:'center'}}>
        <TouchableOpacity onPress={()=>navigation.navigate("Doctors")}>
          <Text style={{ color: '#000000', fontSize: 16, fontWeight: '700', }}>22,301,</Text>

          <Text style={{ color: '#5D5E61BD', fontSize: 12, fontWeight: '500', }}>{loaction ? loaction : "nagpur"}<Feather name='chevron-down' color={'#108ED6'} size={15} /></Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', gap: 15,alignItems:'center' }}>
          <TouchableOpacity>
            <Ionicons name='notifications' color={'#108ED6'} size={23}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>navigation.navigate('MainProfilePage')}>
              <Image source={require("../../assets/profile.png")} resizeMode='cover' /> 
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity onPress={()=>navigation.navigate("Doctors")} style={{ flexDirection: 'row', borderWidth: 1, borderRadius: 68, borderColor: '#0000001F', padding:10, gap: 5, alignItems: 'center',marginHorizontal:10, }}>
        <Feather name='search' color={'#108ED6'} size={19} />
        <Text style={{ color: '#939191', fontSize: 13, fontWeight: '500' }} >Search for doctos, hospitals, medicines or Pathlabs</Text>
      </TouchableOpacity>
      <ScrollView>
        <View style={{ marginVertical: 24, gap: 16,marginHorizontal:10, }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View>
              <Text style={{ color: '#4B4A4A', fontSize: 18, fontWeight: '600', }}>Feeling Sick?</Text>
              <Text style={{ color: '#939191', fontSize: 13, fontWeight: '500', }}>Find Clinics near you</Text>
            </View>
            <Text style={{ color: '#1F51C6', fontSize: 13, fontWeight: '600', }}>View All</Text>
          </View>


          <ScrollView horizontal={true}>
            <View style={{ flexDirection: 'row', gap: 8, borderRadius: 5,}}>
              <ImageBackground source={require('../../assets/Rectangle143.png')} resizeMode='cover' style={{ width: 216, height: 161, }}>
                <View style={{ position: 'absolute', bottom: 10, left: 10 }}>
                  <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '600', }}>Medidek Clinic</Text>
                  <View style={{ flexDirection: 'row', gap: 8 }}>
                    <View style={{ flexDirection: 'row' }}>
                      <Ionicons name='location-sharp' color={"#108ED6"} size={12} />
                      <Text style={{ color: '#FFFFFF', fontSize: 10, fontWeight: '500', textAlign: 'center', }}>2kms away</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                      <Ionicons name='star' color={"#E8B910"} size={12} />
                      <Text style={{ color: '#FFFFFF', fontSize: 10, fontWeight: '500', }}>3.9/5</Text>
                    </View></View>
                </View>
              </ImageBackground>
              <ImageBackground source={require('../../assets/Rectangle143.png')} resizeMode='cover' style={{ width: 216, height: 161, }}>
                <View style={{ position: 'absolute', bottom: 10, left: 10 }}>
                  <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '600', }}>Medidek Clinic</Text>
                  <View style={{ flexDirection: 'row', gap: 8 }}>
                    <View style={{ flexDirection: 'row' }}>
                      <Ionicons name='location-sharp' color={"#108ED6"} size={12} />
                      <Text style={{ color: '#FFFFFF', fontSize: 10, fontWeight: '500', textAlign: 'center', }}>2kms away</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                      <Ionicons name='star' color={"#E8B910"} size={12} />
                      <Text style={{ color: '#FFFFFF', fontSize: 10, fontWeight: '500', }}>3.9/5</Text>
                    </View></View>
                </View>
              </ImageBackground>
            </View>
          </ScrollView>
        </View>




        <View style={{marginHorizontal:10,}}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ color: '#4B4A4A', fontSize: 18, fontWeight: '600', }}>Top Specialties</Text>
            <TouchableOpacity onPress={()=>navigation.navigate('Doctors')}>
            <Text style={{ color: '#1F51C6', fontSize: 13, fontWeight: '600', }}>View All</Text>
            </TouchableOpacity>
          </View>

          <View style={{ marginVertical: 16, flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ alignItems: 'center', gap: 10 }}>
              <View style={{ width: 60, height: 60, borderRadius: 50, backgroundColor: '#1F51C6', justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('../../assets/sdvdsv2.png')} resizeMode='cover' />
              </View>
              <Text style={{ color: '#263238', fontSize: 13, fontWeight: '500', }}>Cardio</Text>
            </View>
            <View style={{ alignItems: 'center', gap: 10 }}>
              <View style={{ width: 60, height: 60, borderRadius: 50, backgroundColor: '#108ED6', justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('../../assets/dermat2.png')} resizeMode='cover' />
              </View>
              <Text style={{ color: '#263238', fontSize: 13, fontWeight: '500', }}>Dermat</Text>
            </View>
            <View style={{ alignItems: 'center', gap: 10 }}>
              <View style={{ width: 60, height: 60, borderRadius: 50, backgroundColor: '#1F51C6', justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('../../assets/neuro1.png')} resizeMode='cover' />
              </View>
              <Text style={{ color: '#263238', fontSize: 13, fontWeight: '500', }}>Neuro</Text>
            </View>
            <View style={{ alignItems: 'center', gap: 10 }}>
              <View style={{ width: 60, height: 60, borderRadius: 50, backgroundColor: '#108ED6', justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('../../assets/ear2.png')} resizeMode='cover' />
              </View>
              <Text style={{ color: '#263238', fontSize: 13, fontWeight: '500', }}>ENT</Text>
            </View>
            <View style={{ alignItems: 'center', gap: 10 }}>
              <View style={{ width: 60, height: 60, borderRadius: 50, backgroundColor: '#1F51C6', justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('../../assets/gastroenterology1.png')} resizeMode='cover' />
              </View>
              <Text style={{ color: '#263238', fontSize: 13, fontWeight: '500', }}>Gastro</Text>
            </View>
          </View>
        </View>

        <ScrollView horizontal>
          <View style={{ flexDirection: 'row', gap: 8, borderRadius: 5,marginHorizontal:10, }}>
            <Image source={require("../../assets/Group000007370.png")} resizeMode='cover' style={{ width: 374, height: 172 }} />
            <Image source={require("../../assets/Group000007370.png")} resizeMode='cover' style={{ width: 374, height: 172 }} />
          </View>
        </ScrollView>




        <View style={{ marginVertical: 24, gap: 16 ,marginHorizontal:10,}}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ color: '#4B4A4A', fontSize: 18, fontWeight: '600', }}>Labs near you</Text>
            <TouchableOpacity onPress={()=>navigation.navigate('LabTests')}>
              <Text style={{ color: '#1F51C6', fontSize: 13, fontWeight: '600', }}>View All</Text>
              </TouchableOpacity>
          </View>


          <ScrollView horizontal={true}>
            <View style={{ flexDirection: 'row', gap: 8, borderRadius: 5, }}>
              <ImageBackground source={require('../../assets/Rectangle143.png')} resizeMode='cover' style={{ width: 216, height: 161, }}>
                <View style={{ position: 'absolute', bottom: 10, left: 10 }}>
                  <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '600', }}>Medidek PathLab</Text>
                  <View style={{ flexDirection: 'row', gap: 8 }}>
                    <View style={{ flexDirection: 'row' }}>
                      <Ionicons name='location-sharp' color={"#108ED6"} size={12} />
                      <Text style={{ color: '#FFFFFF', fontSize: 10, fontWeight: '500', textAlign: 'center', }}>2kms away</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                      <Ionicons name='star' color={"#E8B910"} size={12} />
                      <Text style={{ color: '#FFFFFF', fontSize: 10, fontWeight: '500', }}>3.9/5</Text>
                    </View></View>
                </View>
              </ImageBackground>
              <ImageBackground source={require('../../assets/Rectangle143.png')} resizeMode='cover' style={{ width: 216, height: 161, }}>
                <View style={{ position: 'absolute', bottom: 10, left: 10 }}>
                  <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '600', }}>Joshi Labs</Text>
                  <View style={{ flexDirection: 'row', gap: 8 }}>
                    <View style={{ flexDirection: 'row' }}>
                      <Ionicons name='location-sharp' color={"#108ED6"} size={12} />
                      <Text style={{ color: '#FFFFFF', fontSize: 10, fontWeight: '500', textAlign: 'center', }}>2kms away</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                      <Ionicons name='star' color={"#E8B910"} size={12} />
                      <Text style={{ color: '#FFFFFF', fontSize: 10, fontWeight: '500', }}>3.9/5</Text>
                    </View></View>
                </View>
              </ImageBackground>
            </View>
          </ScrollView>
        </View>



        <View style={{ gap: 16,marginHorizontal:10, }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ color: '#4B4A4A', fontSize: 18, fontWeight: '600', }}>Doctors near you</Text>
            <TouchableOpacity onPress={()=>navigation.navigate("Doctors")}>
            <Text style={{ color: '#1F51C6', fontSize: 13, fontWeight: '600', }}>View All</Text></TouchableOpacity>
          </View>

          <ScrollView horizontal>
            {
              doctors?.length >0 && doctors.map((item)=>(
                <TouchableOpacity 
                onPress={()=>   navigation.navigate("DoctorProfile", { item: item })}
                 key={item._id} style={{ flexDirection: 'row',borderRadius: 5, borderColor: '#D9D9D980', borderWidth: 1 , paddingHorizontal:10, paddingVertical:16,gap:16, width:365, marginHorizontal:5}}>
                <Image source={require("../../assets/Ellipse30.png")} resizeMode='cover' style={{width:88,height:88, borderRadius:100,}}/>
                <View style={{width:'80%'}}>
                  <Text style={{ color: '#383838', fontSize: 16, fontWeight: '500', }}>{item.nameOfTheDoctor} <Text style={{ color: '#706D6D', fontSize: 13, fontWeight: '600', }}>| Dentist </Text></Text>
                  <Text style={{ color: '#706D6D', fontSize: 13, fontWeight: '600', }}>{item.yearOfExprience} years</Text>
                  <Text style={{ color: '#706D6D', fontSize: 13, fontWeight: '600', }}>{item.connsultationFee} </Text>
                  <Text style={{ color: '#706D6D', fontSize: 13, fontWeight: '600', }}><FontAwesome name='location-arrow' color={"#108ED6"} size={12} />{item.location}...</Text>
                  <Text style={{ color: '#706D6D', fontSize: 13, fontWeight: '600', }}>114 Ratings</Text>
                </View>
              </TouchableOpacity>
              ))
            }
          </ScrollView>

        </View>



        <View style={{ marginVertical: 24, gap: 16 ,marginHorizontal:10,}}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ color: '#4B4A4A', fontSize: 18, fontWeight: '600', }}>Pharmacies </Text>
            <TouchableOpacity onPress={()=>navigation.navigate('Medicals')}>
              <Text style={{ color: '#1F51C6', fontSize: 13, fontWeight: '600', }}>View All</Text>
              </TouchableOpacity>
              </View>

          <ScrollView horizontal={true}>
            <View style={{ flexDirection: 'row', gap: 8, borderRadius: 5, }}>
              <ImageBackground source={require('../../assets/Rectangle143.png')} resizeMode='cover' style={{ width: 216, height: 161, }}>
                <View style={{ position: 'absolute', bottom: 10, left: 10 }}>
                  <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '600', }}>Medidek Pharmacy</Text>
                  <View style={{ flexDirection: 'row', gap: 8 }}>
                    <View style={{ flexDirection: 'row' }}>
                      <Ionicons name='location-sharp' color={"#108ED6"} size={12} />
                      <Text style={{ color: '#FFFFFF', fontSize: 10, fontWeight: '500', textAlign: 'center', }}>2kms away</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                      <Ionicons name='star' color={"#E8B910"} size={12} />
                      <Text style={{ color: '#FFFFFF', fontSize: 10, fontWeight: '500', }}>3.9/5</Text>
                    </View></View>
                </View>
              </ImageBackground>
              <ImageBackground source={require('../../assets/Rectangle143.png')} resizeMode='cover' style={{ width: 216, height: 161, }}>
                <View style={{ position: 'absolute', bottom: 10, left: 10 }}>
                  <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '600', }}>Joshi Pharmacy</Text>
                  <View style={{ flexDirection: 'row', gap: 8 }}>
                    <View style={{ flexDirection: 'row' }}>
                      <Ionicons name='location-sharp' color={"#108ED6"} size={12} />
                      <Text style={{ color: '#FFFFFF', fontSize: 10, fontWeight: '500', textAlign: 'center', }}>2kms away</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                      <Ionicons name='star' color={"#E8B910"} size={12} />
                      <Text style={{ color: '#FFFFFF', fontSize: 10, fontWeight: '500', }}>3.9/5</Text>
                    </View></View>
                </View>
              </ImageBackground>
            </View>
          </ScrollView>
        </View>

      </ScrollView>
      {
        locationenable && !loaction && <LocationPopup
        loaction={loaction} setloaction ={setloaction}
        locationenable={locationenable} setlocationenable={setlocationenable} Inputlocation={Inputlocation}/>
      }
      <StatusBar style="auto" />

    </View>
  )
}

export default HomePagePatients

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
  