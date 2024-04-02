import { StyleSheet, Text, View, Image} from 'react-native'
import React, { useEffect } from 'react'

const CancelPopup = ({cancelpopup, setcancelpopup}) => {
    useEffect(() => {
        setTimeout(() => {
            setcancelpopup(false)
        }, 2000);
    }, [])

    return (
        <View style={{ backgroundColor: "#353535CC", height: "100%", width: "100%", position: "absolute", display: "flex", justifyContent: "center", alignItems: "center", }}>
            <View style={{ backgroundColor: '#FFFFFF', borderRadius: 5, padding: 30, justifyContent: 'center', alignItems: 'center', gap: 16 }}>
                <Image source={require("../../assets/Group1516.png")} resizeMode='cover' style={{ height: 141, width: 151 }} />
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: '#383838', fontSize: 16, fontWeight: '600' }}>Appointment Cancelled!</Text>
                    <Text style={{ color: '#706D6D', fontSize: 13, fontWeight: '500' }}>Your appointment with Dr. Shashwat Magarkar</Text>
                    <Text style={{ color: '#706D6D', fontSize: 13, fontWeight: '500' }}>has been Cancelled!</Text>
                </View>
            </View>
        </View>
    )
}

export default CancelPopup

const styles = StyleSheet.create({

})