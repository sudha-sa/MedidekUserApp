import { StyleSheet, Text, View, Image} from 'react-native'
import React, { useEffect } from 'react'

const ReviewPopup = ({completepopup, setcompletepopup}) => {
    useEffect(() => {
        setTimeout(() => {
            setcompletepopup(false)
        }, 2000);
    }, [])

    return (
        <View style={{ backgroundColor: "#353535CC", height: "100%", width: "100%", position: "absolute", display: "flex", justifyContent: "center", alignItems: "center", }}>
            <View style={{ backgroundColor: '#FFFFFF', borderRadius: 5, padding: 30, justifyContent: 'center', alignItems: 'center', gap: 16 }}>
                <Image source={require("../../assets/Group1389.png")} resizeMode='cover' style={{ height: 141, width: 151 }} />
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: '#383838', fontSize: 16, fontWeight: '600' }}>Thank You!</Text>
                    <Text style={{ color: '#706D6D', fontSize: 13, fontWeight: '500' }}>Your Review Has been Submitted!</Text>
                </View>
            </View>
        </View>
    )
}

export default ReviewPopup

const styles = StyleSheet.create({})