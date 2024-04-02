import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Rating } from "react-native-ratings";
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { axiosClient } from '../Api/Axios';
import { useNavigation } from '@react-navigation/native';

const DoctorProfile = ({route}) => {
    const navigation =useNavigation()
    const item = route.params.item;
    const [selecthospital, setSelecthospital] = useState([1, 2])
    const [review, setReview] = useState([1, 2])
    const [select, setSelect] = useState(0)
    const [reviews,setreviews]=useState([])
  const [hospitallist, sethospitallist] = useState([]);

    const getdoctordetail =async()=>{
        const response = await axiosClient.get(`/v2/singledoctor/${item._id}`);
        // console.log("response.data.result.reviews",response.data.result.reviews[0])
        setreviews(response.data.result.reviews)
        const hospitalresponse = await axiosClient.get(
            `/v2/multipleloginprofile/${item.doctorid}`,
          ); 
        console.log("response.data.result.reviews",hospitalresponse.data.result[0])
          sethospitallist(hospitalresponse.data.result)
    }

    useEffect(()=>{
         getdoctordetail()
    },[])
    function ratingCompleted(rating) {
        console.log("Rating is: " + rating);
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={{ margin: 10, gap: 16 }}>
                    <Text style={{ color: '#383838', fontSize: 15, fontWeight: '600' }}>Doctor's Profile</Text>

                    <View style={{ padding: 16, borderWidth: 1, borderColor: '#D9D9D961', borderRadius: 5, gap: 16 }}>
                        <View style={{ flexDirection: 'row', gap: 6 }}>
                            <Image source={require("../../assets/Ellipse30.png")} resizeMode='cover' style={{ width: 68, height: 68 }} />
                            <View style={{ gap: 3, width: '70%' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ color: '#383838', fontSize: 16, fontWeight: '500' }}>{item?.nameOfTheDoctor}</Text>
                                    <Text style={{ color: '#706D6D', fontSize: 13, fontWeight: '600' }}> | {item.speciality}</Text>
                                </View>
                                <Text style={{ color: '#706D6D', fontSize: 13, fontWeight: '600' }}>{item.yearOfExprience} Years</Text>
                                <Text style={{ color: '#706D6D', fontSize: 13, fontWeight: '600' }}>₹{item.connsultationFee}</Text>
                                <Text>
                                    <Rating
                                        readonly={true}
                                        ratingCount={5}
                                        imageSize={17}
                                        onFinishRating={this.ratingCompleted}
                                    />
                                </Text>
                                <Text
                                    style={{
                                        color: "#108ED6",
                                        fontSize: 10,
                                        fontWeight: "600",
                                        backgroundColor: "#14D61047",
                                        paddingHorizontal: 10,
                                        paddingVertical: 6,
                                        borderRadius: 5,
                                        width: "35%",
                                    }}
                                >
                                    <Image
                                        source={require("../../assets/Vectorright.png")}
                                        resizeMode="contain"
                                    />
                                    Varified
                                </Text>
                            </View>
                        </View>
                        <Text style={{ color: '#000000', fontSize: 13, fontWeight: '600' }}>Dr. Venkataramana is a Dentist, General and Ortho Surgeon based out of Manish nagar, Nagpur. He has an experience of more than 40 years performing various General and Laparoscopic Procedures in India and Abroad. More</Text>
                    </View>

                    <Text style={{ color: '#383838', fontSize: 15, fontWeight: '600' }}>Hospitals List</Text>

                    <View style={{ padding: 16, borderWidth: 1, borderColor: '#D9D9D961', borderRadius: 5, gap: 16 }}>
                        {
                            hospitallist.map((item) => (
                                <View key={item._id}>
                                    <View style={{ flexDirection: 'row', gap: 6 }}>
                                        <Image source={require("../../assets/Ellipse4.png")} resizeMode='cover' style={{ width: 55, height: 55 }} />
                                        <View style={{ gap: 3, width: '70%' }}>

                                            <Text style={{ color: '#353535', fontSize: 13, fontWeight: '600' }}>{item.hospitalId == null ? item.nameOfTheDoctor : item?.hospitalId?.nameOfhospitalOrClinic}</Text>
                                            <Text style={{ color: '#706D6D', fontSize: 13, fontWeight: '600' }}><MaterialIcons name='currency-rupee' size={10} color="#108ED6" /> {item.connsultationFee}</Text>
                                            <Text style={{ color: '#706D6D', fontSize: 13, fontWeight: '600' }}><MaterialIcons name='location-on' size={10} color="#108ED6" />{item.hospitalId == null ? item.location : item?.hospitalId?.enterFullAddress}</Text>

                                            <TouchableOpacity
                                              onPress={() =>
                                                navigation.navigate("BookAppointment", { doctor: item })
                                              }
                                            style={{
                                                flexDirection: 'row',
                                                alignItems: 'center', paddingVertical: 10
                                            }}>
                                                <Text style={{ color: '#108ED6', fontSize: 13, fontWeight: '600', }}>Pick a Time Slot</Text><MaterialIcons name='keyboard-arrow-down' size={20} color="#108ED6" /></TouchableOpacity>


                                        </View>

                                    </View>
                                    <View style={{ borderWidth: 0.5, borderColor: '#D9D9D980', borderStyle: 'dashed' }}></View></View>

                            ))
                        }

                    </View>


                    <View style={{ flexDirection: 'row', gap: 10, }}>
                        <TouchableOpacity onPress={() => setSelect(0)} style={{ paddingVertical: 10, paddingHorizontal: 37, borderRadius: 50, borderWidth: 1, borderColor: '#D9D9D961', backgroundColor: select == 0 ? '#1F51C6' : '#FFFFFF' }}>
                            <Text style={{ color: select == 0 ? '#FFFFFF' : '#5D5E61BD', fontSize: 13, fontWeight: '500' }}>Reviews</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setSelect(1)} style={{ paddingVertical: 10, paddingHorizontal: 37, borderRadius: 50, borderWidth: 1, borderColor: '#D9D9D961', backgroundColor: select == 1 ? '#1F51C6' : '#FFFFFF' }}>
                            <Text style={{ color: select == 1 ? '#FFFFFF' : '#5D5E61BD', fontSize: 13, fontWeight: '500' }}>Services</Text>
                        </TouchableOpacity>
                    </View>


                    {
                        select == 0 &&
                        <View>
                            {
                                reviews.map((item) => (
                                    <View style={{ flexDirection: 'row', gap: 6, padding: 16, marginVertical: 4, borderWidth: 1, borderColor: '#D9D9D980', borderRadius: 5 }}>
                                        <Image source={require("../../assets/default_Avtar.png")} resizeMode='cover' style={{ width: 55, height: 55 }} />
                                        <View style={{ gap: 3, width: '80%' }}>
                                            <Text style={{ color: '#706D6D', fontSize: 13, fontWeight: '500' }}>{item?.userid?.name ? item?.userid?.name :"user name"}</Text>
                                            <Text style={{ color: '#383838', fontSize: 13, fontWeight: '600' }}>Visited for Root Canal treatment</Text>
                                            <Text style={{ color: '#000000', fontSize: 13, fontWeight: '400' }}>{item?.message}</Text>
                                            <Text
                                                style={{
                                                    color: "#108ED6",
                                                    fontSize: 10,
                                                    fontWeight: "600",
                                                    backgroundColor: "#14D61047",
                                                    paddingHorizontal: 10,
                                                    paddingVertical: 6,
                                                    borderRadius: 5,
                                                    width: "55%",
                                                }}
                                            >
                                                <Image
                                                    source={require("../../assets/Vectorright.png")}
                                                    resizeMode="contain"
                                                />{" "}
                                                Appointment Completed
                                            </Text>
                                        </View>

                                    </View>
                                ))
                            }
                        </View>
                    }
                    {
                        select == 1 && hospitallist?.map((item)=>(
                           <View style={{ gap: 16 }}>
                            {console.log(item.services)}
                            {
                                item?.services?.map((data)=>(
                                    <Text style={{ color: '#000000', fontSize: 13, fontWeight: '500' }}>{data}</Text>
                                ))
                            }
                        </View> 
                        ))
                        }
                </View>
            </ScrollView>

        </View>
    )
}

export default DoctorProfile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
})