import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, ImageBackground, Linking } from 'react-native'
import React, { useState } from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { Rating } from 'react-native-ratings';



const MedicalDetails = () => {
    const [selectPage, setSelectPage] = useState(0)
    const [reviews, setreviews] = useState([1, 2, 3, 4, 5, 6])
   
    function ratingCompleted(rating) {
        console.log("Rating is: " + rating)
    }
   
    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={{ margin: 10, gap: 16 }}>


                    <View onPress={() => navigation.navigate("MedicalDetails")} style={{ borderWidth: 1, borderColor: '#D9D9D980', borderRadius: 5, padding: 16, gap: 12, flexDirection: 'row' }}>
                        <Image source={require("../../assets/Ellipse30.png")} resizeMode='contain' style={{ width: 88, height: 88 }} />
                        <View style={{ width: '70%' }}>
                            <View style={{ flexDirection: 'row', gap: 8 }}>
                                <Text style={{ color: '#000000', fontSize: 13, fontWeight: '500', }}>Om Medicals</Text>
                                <Text style={{ color: '#108ED6', fontSize: 10, fontWeight: '600', backgroundColor: '#14D61047', paddingHorizontal: 5, paddingVertical: 3, borderRadius: 5, }}><Image source={require('../../assets/Vectorright.png')} resizeMode='contain' /> Verified</Text>
                            </View>
                            <Text style={{ color: '#706D6D', fontSize: 13, fontWeight: '600', }}><FontAwesome name='location-arrow' size={11} color={"#108ED6"} /> Wokhardt hospital, near LAD College, Nagpur.</Text>
                            <Text style={{ color: '#706D6D', fontSize: 13, fontWeight: '500', }}>
                            <Rating
                            ratingCount={5}
                            imageSize={25}
                            onFinishRating={this.ratingCompleted}
                        />
                            </Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', gap: 8 }}>
                        <TouchableOpacity onPress={() => setSelectPage(0)} style={{ backgroundColor: selectPage == 0 ? '#1F51C6' : '#FFFFFF', borderRadius: 50, borderWidth: 1, borderColor: '#D9D9D961', paddingVertical: 11, paddingHorizontal: 28 }}>
                            <Text style={{ color: selectPage == 0 ? '#FFFFFF' : '#5D5E61BD', fontSize: 13, fontWeight: '500', textAlign: 'center' }}>Reviews</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setSelectPage(1)} style={{ backgroundColor: selectPage == 1 ? '#1F51C6' : '#FFFFFF', borderRadius: 50, borderWidth: 1, borderColor: '#D9D9D961', paddingVertical: 11, paddingHorizontal: 28 }}>
                            <Text style={{ color: selectPage == 1 ? '#FFFFFF' : '#5D5E61BD', fontSize: 13, fontWeight: '500', textAlign: 'center' }}>About</Text>
                        </TouchableOpacity>
                    </View>

                    {
                        selectPage == 0 && reviews.map((item) => (
                            <View key={item} style={{ borderWidth: 1, borderColor: '#D9D9D980', borderRadius: 5, padding: 16, gap: 12, flexDirection: 'row' }}>
                                <Image source={require("../../assets/default_Avtar.png")} resizeMode='contain' style={{ width: 56, height: 56 }} />
                                <View style={{ width: '70%' }}>

                                    <Text style={{ color: '#706D6D', fontSize: 13, fontWeight: '500', }}>Abhay Ramteke</Text>
                                    <Text style={{ color: '#383838', fontSize: 13, fontWeight: '700', }}>Visited for Root Canal treatment</Text>
                                    <Text style={{ color: '#000000', fontSize: 13, fontWeight: '400', }}>Great Experience.. very friendly. We Respect his Experience.. Sir Explain me thoroughly what is exactly my health problems.. Kudos...</Text>
                                </View>
                            </View>
                        ))
                    }

                    {
                        selectPage == 1 &&
                        <View style={{ gap: 16 }}>
                            <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                                <Image source={require("../../assets/Group988.png")} resizeMode='contain' style={{ width: 38, height: 38 }} />
                                <Text style={{ color: '#353535', fontSize: 13, fontWeight: '600', }}>+91 95189 77267</Text>
                            </View>
                            <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                                <Image source={require("../../assets/Group989.png")} resizeMode='contain' style={{ width: 38, height: 38 }} />
                                <Text style={{ color: '#108ED6', fontSize: 15, fontWeight: '600', }} onPress={()=>Linking.openURL('https://mail.google.com/mail/u/0/#inbox')}>medideksocial@123.com</Text>
                            </View>

                            <ImageBackground source={require('../../assets/Rectangle184.png')} resizeMode='contain' style={{ width: '100%', height: 100 }}>
                                <TouchableOpacity style={{ backgroundColor: '#1F51C6', paddingVertical: 8, margin: 10, borderRadius: 25, width: 100 }}>
                                    <Text style={{ color: '#FFFFFF', fontSize: 10, fontWeight: '600', textAlign: 'center' }}>Open in Maps</Text>
                                </TouchableOpacity>
                            </ImageBackground>
                        </View>
                    }



                </View>
            </ScrollView>
        </View>
    )
}

export default MedicalDetails

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
})