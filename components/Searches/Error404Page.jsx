import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const Error404Page = () => {
    const navigation = useNavigation()


    return (
        <View style={styles.container}>
            <View style={{ margin: 10, gap: 16,}}>
                <View style={{flexDirection:'column', justifyContent: 'center', alignItems: 'center', gap: 8, height:'100%' }}>
                    <Image source={require('../../assets/404_2.png')} resizeMode='contain' style={{width:'100%',height:236 }}/>
                    <Text style={{ color: '#353535', fontSize: 16, fontWeight: '600' }}>OOPS! Looks like you’re Lost!</Text>
                    <Text style={{ color: '#24232387', fontSize: 13, fontWeight: '600', width:'60%' , textAlign:'center'}}>Let’s get back you to home, while we solve the problem!</Text>

                    <TouchableOpacity onPress={()=>navigation.navigate('HomePage')}  style={{ backgroundColor: '#1F51C6', paddingVertical: 10, marginTop: 10, borderRadius: 25, width: 100 }}>
                        <Text style={{ color: '#FFFFFF', fontSize: 13, fontWeight: '500', textAlign: 'center' }}>Home</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Error404Page

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
})