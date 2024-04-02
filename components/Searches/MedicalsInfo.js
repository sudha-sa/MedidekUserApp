import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, ImageBackground } from 'react-native'
import React from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { useNavigation } from '@react-navigation/native'
import { Rating } from 'react-native-ratings';



const MedicalsInfo = () => {
    const navigation = useNavigation()

    function ratingCompleted(rating) {
        console.log("Rating is: " + rating)
    }


    return (
        <View style={styles.container}> 
         <ScrollView>
            <View style={{ margin: 10, gap: 16 }}>

                <View>

                    <Image source={require("../../assets/Rectangle1759.png")} resizeMode='contain' style={{ width: '100%', height: 250 }} />
                    <Text style={{ color: '#000000', fontSize: 13, fontWeight: '600', }}>biotee 10 Tablets</Text>
                    <View style={{ flexDirection: 'row', gap: 8 }}>
                        <Text style={{ color: '#000000', fontSize: 16, fontWeight: '700', }}>₹159</Text>
                        <Text style={{ color: '#000000', fontSize: 13, fontWeight: '500', }}>₹189</Text>
                        <Text style={{ color: '#13A407', fontSize: 13, fontWeight: '600', }}>20% OFF</Text>
                    </View>

                </View>

                <View style={{ borderWidth: 0.5, borderColor: '#D9D9D980', borderStyle: 'dashed' }}></View>

                <Text style={{ color: '#000000', fontSize: 13, fontWeight: '500', }}>Sellers Detail</Text>

                <TouchableOpacity onPress={()=>navigation.navigate("MedicalDetails")} style={{ borderWidth: 1, borderColor: '#D9D9D980', borderRadius: 5, padding: 16, gap: 12, flexDirection: 'row' }}>
                    <Image source={require("../../assets/Ellipse30.png")} resizeMode='contain' style={{ width: 88, height: 88 }} />
                    <View style={{ width: '70%' }}>
                        <View style={{ flexDirection: 'row', gap:8 }}>
                            <Text style={{ color: '#000000', fontSize: 13, fontWeight: '500', }}>Om Medicals</Text>
                            <Text style={{ color: '#108ED6', fontSize: 10, fontWeight: '600', backgroundColor: '#14D61047', paddingHorizontal: 5, paddingVertical:3, borderRadius: 5, }}><Image source={require('../../assets/Vectorright.png')} resizeMode='contain' /> Verified</Text>
                        </View>
                        <Text style={{ color: '#706D6D', fontSize: 13, fontWeight: '600', }}><FontAwesome name='location-arrow' size={11} color={"#108ED6"} /> Wokhardt hospital, near LAD College, Nagpur.</Text>
                        <Text style={{ color: '#706D6D', fontSize: 13, fontWeight: '500', }}>
                        <Rating
                            ratingCount={5}
                            imageSize={17}
                            onFinishRating={this.ratingCompleted}
                        />
                        </Text>

                    </View>
                </TouchableOpacity>

                <Text style={{ color: '#000000', fontSize: 13, fontWeight: '500', }}>Pick Up the Order From:</Text>

                <ImageBackground source={require('../../assets/Rectangle184.png')} resizeMode='contain' style={{width:'100%', height:100}}>
                    <TouchableOpacity style={{backgroundColor:'#1F51C6', paddingVertical:8, margin:10, borderRadius:25, width:100}}>
                        <Text style={{ color: '#FFFFFF', fontSize: 10, fontWeight: '600', textAlign: 'center' }}>Open in Maps</Text>
                    </TouchableOpacity>
                </ImageBackground>


                <TouchableOpacity onPress={()=>navigation.navigate('Error404Page')} style={{ backgroundColor: '#1F51C6', borderRadius: 50, paddingVertical: 16, }}>
                        <Text style={{ color: '#FFFFFF', fontSize: 13, fontWeight: '500', textAlign: 'center' }}>Book Now</Text>
                    </TouchableOpacity>
            </View>
        </ScrollView>
        </View>
    )
}

export default MedicalsInfo

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
})