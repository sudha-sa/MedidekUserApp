import { StyleSheet, Text, View, TextInput, ScrollView, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import Feather from '@expo/vector-icons/Feather'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import Octicons from '@expo/vector-icons/Octicons'
import { Rating } from 'react-native-ratings';
import { useNavigation } from '@react-navigation/native'
import ReviewPopup from './ReviewPopup'
import { axiosClient } from '../Api/Axios'
import moment from 'moment'
import { useAuthentication } from '../context/UserContext'


const CompletedPage = ({route}) => {
    const item =route.params.item; 
    const navigation = useNavigation()
    const [completepopup, setcompletepopup] = useState(false)
    const [reviews,setreviews]=useState({rating:"",message:""})
    const {user, setuser} = useAuthentication()

    function ratingCompleted(rating) {
        console.log("Rating is: " + rating)
        setreviews({...reviews,rating:rating});
    }
    const postReview = async () => {
        try {
        const res = await axiosClient.post(`/v2/reviewCreation/${item?.doctorid._id}/${user?.user?._id}`,{
            rating:reviews?.rating,
            message:reviews?.message
        })
        console.log(res.data);
        if(upcoming.data.statusCode == 401){
            Alert.alert("Token Expired, Pls Login")
            await AsyncStorage.clear()
            await AsyncStorage.removeItem("token")
            await AsyncStorage.removeItem("userdata")
            navigation.navigate("SigninPage")
          }
        if(res.data.status =="ok"){
            // setshowthankyou(true)
            setcompletepopup(true)
            navigation.navigate("HomePage")
        }
    } catch (error) {
           console.log(error)
           Alert.alert(error.message) 
    }
    }

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
                                <Text style={{ color: '#1F51C6', fontSize: 10, fontWeight: '600', backgroundColor: '#108ED647', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 5, width: '35%' }}>{item?.doctorid?.acceptAppointments}</Text>
                                <Text style={{ color: '#353535', fontSize: 16, fontWeight: '500' }}>{item?.doctorid?.nameOfTheDoctor}</Text>
                                <View style={{ flexDirection: 'row', gap: 15 }}>
                                    <Text style={{ color: '#263238', fontSize: 13, fontWeight: '500' }}><Feather name='calendar' color={"#108ED6"} size={13} /> {moment(item?.appointmentDate).format("DD MMM dddd")}</Text>
                                    <Text style={{ color: '#263238', fontSize: 13, fontWeight: '500' }}><FontAwesome6 name='clock-rotate-left' color={"#108ED6"} size={13} /> {item?.AppointmentTime}</Text>
                                </View>
                                <Text style={{ color: '#706D6D', fontSize: 13, fontWeight: '600' }}><FontAwesome name='location-arrow' size={11} color={"#108ED6"} />{item?.doctorid?.location}</Text>
                                <Text style={{ color: '#108ED6', fontSize: 10, fontWeight: '600', backgroundColor: '#14D61047', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 5, width: '50%' }}><Image source={require('../../assets/Vectorright.png')} resizeMode='contain' /> Appointment Confirmed</Text>
                            </View>
                        </View>

                        <View style={{ borderWidth: 0.5, borderColor: '#D9D9D980', marginBottom: 15, borderStyle: 'dashed' }}></View>


                        <Text style={{ color: '#263238', fontSize: 13, fontWeight: '600' }}>Write a Review</Text>


                        <View style={{ borderWidth: 0.5, borderColor: '#D9D9D980', marginBottom: 15, borderStyle: 'dashed' }}></View>

                        <Text style={{ color: '#383838', fontSize: 13, fontWeight: '600' }}>Rate Appointment<Text style={{ color: '#EA4335' }}>*</Text></Text>
                     
                         <Rating
                            ratingCount={5}
                            imageSize={25}
                            onFinishRating={ratingCompleted}
                        />

                        <Text style={{ color: '#383838', fontSize: 13, fontWeight: '600' }}>Leave a Review</Text>

                        <TextInput 
                         value={reviews.message}
                         onChangeText={(text)=>setreviews({...reviews,message:text})}
                        placeholder='Type your review here.' multiline={true} style={{ borderWidth: 1, borderColor: '#EEEFF0', borderRadius: 5, padding: 13, width: '100%', flexWrap: 'wrap' }} />


                    </View>

                    <View style={{ flexDirection: 'row', gap: 8, marginVertical: 16, justifyContent: 'center' }}>
                        <TouchableOpacity onPress={()=>navigation.navigate('Doctors')} style={{ backgroundColor: '#108ED6', justifyContent: 'center', alignSelf: 'center', paddingVertical: 16, borderRadius: 50, width: '48%', }}>
                            <Text style={{ color: '#FFFFFF', fontSize: 13, fontWeight: '500', textAlign: 'center' }}>Book Again</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={postReview} style={{ backgroundColor: '#1F51C6', justifyContent: 'center', alignSelf: 'center', paddingVertical: 16, borderRadius: 50, width: '48%', }}>
                            <Text style={{ color: '#FFFFFF', fontSize: 13, fontWeight: '500', textAlign: 'center' }}>Write a Review</Text>
                        </TouchableOpacity>

                    </View>

                </ScrollView>
            </View >
            {
completepopup && <ReviewPopup completepopup={completepopup} setcompletepopup={setcompletepopup}/>
    }
        </View >
    )
}

export default CompletedPage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
})