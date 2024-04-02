import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useEffect } from 'react'

const BookPopup = ({Bookpopup, setBookpopup}) => {
useEffect(()=>{
setTimeout(() => {
    setBookpopup(false)
}, 2000);
},[])

    return (
        <View style={{ backgroundColor: "#353535CC", height: "100%", width: "100%", position: "absolute", display: "flex", justifyContent: "center", alignItems: "center",}}>
            <View style={{ backgroundColor: '#FFFFFF', borderRadius: 5, padding: 30, justifyContent: 'center', alignItems: 'center', gap:16 }}>
                <Image source={require("../../assets/Group1474.png")} resizeMode='cover' style={{ height: 141, width: 151 }} />
                <View style={{justifyContent:'center', alignItems:'center'}}>
                <Text style={{ color: '#383838', fontSize: 16, fontWeight: '600' }}>Appointment booked!</Text>
                <Text style={{ color: '#706D6D', fontSize: 13, fontWeight: '500' }}>Your appointment has been booked for</Text>
                <Text style={{ color: '#706D6D', fontSize: 13, fontWeight: '500' }}>20 Jan, Fri @ 12:00-1:00PM</Text>
            </View>
            </View>
        </View>
    )
}

export default BookPopup

const styles = StyleSheet.create({

})