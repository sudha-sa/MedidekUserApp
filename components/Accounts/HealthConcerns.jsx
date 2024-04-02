import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { axiosClient } from '../Api/Axios'
import { useAuthentication } from '../context/UserContext'

const HealthConcerns = () => {
    const navigation = useNavigation()
    const {user,setuser} =useAuthentication()
    const [Healthconcern,setHealthConcern]=useState("")
    const [select,setselect]=useState(-1)

    const Healthconcer =(value,selected)=>{
        setHealthConcern(value)
        setselect(selected)
    }

    const submitdata =async()=>{

        try {
            if(!Healthconcern || !user.user._id){
                Alert.alert("pls enter a value");
            }
            const data = await axiosClient.put("/v2/userhealthconecer",{id:user.user._id,Healthconcern:Healthconcern})
            console.log(data)
            if(data.data.statusCode == 401){
                Alert.alert("Token Expired, Pls Login")
                await AsyncStorage.clear()
                await AsyncStorage.removeItem("token")
                await AsyncStorage.removeItem("userdata")
                navigation.navigate("SigninPage")
              }
            navigation.navigate("UploadRecordsPatient")
        } catch (error) {
            console.log(error)
            Alert.alert(error.message)
        }
    }


    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={{ paddingHorizontal: 5, paddingVertical: 16, width: 156, }}>
                    <Text style={{ color: '#263238', fontSize: 13, fontWeight: '600', }}>Select All your health Concerns.</Text>
                </View>

                <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
                    <TouchableOpacity onPress={()=>Healthconcer("Diabetes",0)} style={{ backgroundColor :select == 0 ? "#108ED6" :"#FFFFFF", flexDirection: 'row', alignItems: 'center', paddingHorizontal: 17, paddingVertical: 10, gap: 9, borderWidth: 1, borderColor: '#D9D9D980', width: '50%' }}>
                        <View style={{ width: 42, height: 42, borderRadius: 50, backgroundColor:select == 0 ? "#FFFFFF" :  '#108ED6', justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={require('../../assets/sugar.png')} resizeMode='cover' style={{ width: 23, height: 23 }} />
                        </View>
                        <Text style={{ color: '#353535', fontSize: 13, fontWeight: '600', }}>Diabetes</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>Healthconcer("Heart Condition",1)} style={{ backgroundColor :select == 1 ? "#108ED6" :"white", flexDirection: 'row', alignItems: 'center', paddingHorizontal: 17, paddingVertical: 10, gap: 9, borderWidth: 1, borderColor: '#D9D9D980', width: '50%' }}>
                        <View style={{ width: 42, height: 42, borderRadius: 50, backgroundColor: select == 1 ? "#FFFFFF" :  '#108ED6', justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={require('../../assets/sdvdsv2.png')} resizeMode='cover' style={{ width: 23, height: 23 }} />
                        </View>
                        <Text style={{ color: '#353535', fontSize: 13, fontWeight: '600', }}>Heart Condition</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>Healthconcer("Blood Pressure",2)} style={{ backgroundColor :select == 2 ? "#108ED6" :"white", flexDirection: 'row', alignItems: 'center', paddingHorizontal: 17, paddingVertical: 10, gap: 9, borderWidth: 1, borderColor: '#D9D9D980', width: '50%' }}>
                        <View style={{ width: 42, height: 42, borderRadius: 50, backgroundColor: select == 2 ? "#FFFFFF" :  '#108ED6', justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={require('../../assets/bp-operator.png')} resizeMode='cover' style={{ width: 23, height: 23 }} />
                        </View>
                        <Text style={{ color: '#353535', fontSize: 13, fontWeight: '600', }}>Blood Pressure</Text>
                    </TouchableOpacity>

                    <TouchableOpacity  onPress={()=>Healthconcer("Arthritis",3)} style={{ backgroundColor :select == 3 ? "#108ED6" :"white", flexDirection: 'row', alignItems: 'center', paddingHorizontal: 17, paddingVertical: 10, gap: 9, borderWidth: 1, borderColor: '#D9D9D980', width: '50%' }}>
                        <View style={{ width: 42, height: 42, borderRadius: 50, backgroundColor: select == 3 ? "#FFFFFF" :  '#108ED6', justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={require('../../assets/arthritis.png')} resizeMode='cover' style={{ width: 23, height: 23 }} />
                        </View>
                        <Text style={{ color: '#353535', fontSize: 13, fontWeight: '600', }}>Arthritis</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>Healthconcer("Psoriasis",4)} style={{ backgroundColor :select == 4 ? "#108ED6" :"white", flexDirection: 'row', alignItems: 'center', paddingHorizontal: 17, paddingVertical: 10, gap: 9, borderWidth: 1, borderColor: '#D9D9D980', width: '50%' }}>
                        <View style={{ width: 42, height: 42, borderRadius: 50, backgroundColor: select == 4? "#FFFFFF" :  '#108ED6', justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={require('../../assets/psoriasis.png')} resizeMode='cover' style={{ width: 23, height: 23 }} />
                        </View>
                        <Text style={{ color: '#353535', fontSize: 13, fontWeight: '600', }}>Psoriasis</Text>
                    </TouchableOpacity>

                    <TouchableOpacity  onPress={()=>Healthconcer("Infection",5)} style={{ backgroundColor :select == 5 ? "#108ED6" :"white", flexDirection: 'row', alignItems: 'center', paddingHorizontal: 17, paddingVertical: 10, gap: 9, borderWidth: 1, borderColor: '#D9D9D980', width: '50%' }}>
                        <View style={{ width: 42, height: 42, borderRadius: 50, backgroundColor: select == 5 ? "#FFFFFF" :  '#108ED6', justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={require('../../assets/blood.png')} resizeMode='cover' style={{ width: 23, height: 23 }} />
                        </View>
                        <Text style={{ color: '#353535', fontSize: 13, fontWeight: '600', }}>Infection</Text>
                    </TouchableOpacity>

                    <TouchableOpacity  onPress={()=>Healthconcer("Acne",6)} style={{ backgroundColor :select == 6 ? "#108ED6" :"white", flexDirection: 'row', alignItems: 'center', paddingHorizontal: 17, paddingVertical: 10, gap: 9, borderWidth: 1, borderColor: '#D9D9D980', width: '50%' }}>
                        <View style={{ width: 42, height: 42, borderRadius: 50, backgroundColor: select == 6 ? "#FFFFFF" :  '#108ED6', justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={require('../../assets/pimples.png')} resizeMode='cover' style={{ width: 23, height: 23 }} />
                        </View>
                        <Text style={{ color: '#353535', fontSize: 13, fontWeight: '600', }}>Acne</Text>
                    </TouchableOpacity>

                    <TouchableOpacity  onPress={()=>Healthconcer("Hairfall",7)} style={{ backgroundColor :select == 7 ? "#108ED6" :"white", flexDirection: 'row', alignItems: 'center', paddingHorizontal: 17, paddingVertical: 10, gap: 9, borderWidth: 1, borderColor: '#D9D9D980', width: '50%' }}>
                        <View style={{ width: 42, height: 42, borderRadius: 50, backgroundColor: select == 7 ? "#FFFFFF" :  '#108ED6', justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={require('../../assets/hair-loss.png')} resizeMode='cover' style={{ width: 23, height: 23 }} />
                        </View>
                        <Text style={{ color: '#353535', fontSize: 13, fontWeight: '600', }}>Hairfall</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>Healthconcer("Cold",8)} style={{ backgroundColor :select == 8 ? "#108ED6" :"white", flexDirection: 'row', alignItems: 'center', paddingHorizontal: 17, paddingVertical: 10, gap: 9, borderWidth: 1, borderColor: '#D9D9D980', width: '50%' }}>
                        <View style={{ width: 42, height: 42, borderRadius: 50, backgroundColor: select == 8 ? "#FFFFFF" :  '#108ED6', justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={require('../../assets/cold.png')} resizeMode='cover' style={{ width: 23, height: 23 }} />
                        </View>
                        <Text style={{ color: '#353535', fontSize: 13, fontWeight: '600', }}>Cold</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>Healthconcer("Vitamin Deficiency",9)} style={{ backgroundColor :select == 9 ?"#108ED6":"white", flexDirection: 'row', alignItems: 'center', paddingHorizontal: 17, paddingVertical: 10, gap: 9, borderWidth: 1, borderColor: '#D9D9D980', width: '50%' }}>
                        <View style={{ width: 42, height: 42, borderRadius: 50, backgroundColor: select == 9 ? "#FFFFFF" :  '#108ED6', justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={require('../../assets/vitamin-d.png')} resizeMode='cover' style={{ width: 23, height: 23 }} />
                        </View>
                        <Text style={{ color: '#353535', fontSize: 13, fontWeight: '600', }}>Vitamin Deficiency</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>Healthconcer("Allergies",10)} style={{ backgroundColor :select == 10 ?"#108ED6" :"white", flexDirection: 'row', alignItems: 'center', paddingHorizontal: 17, paddingVertical: 10, gap: 9, borderWidth: 1, borderColor: '#D9D9D980', width: '50%' }}>
                        <View style={{ width: 42, height: 42, borderRadius: 50, backgroundColor: select == 10 ? "#FFFFFF" :  '#108ED6', justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={require('../../assets/allergy.png')} resizeMode='cover' style={{ width: 23, height: 23 }} />
                        </View>
                        <Text style={{ color: '#353535', fontSize: 13, fontWeight: '600', }}>Allergies</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>Healthconcer("Ear Infection",11)} style={{ backgroundColor :select == 11 ? "#108ED6" :"white", flexDirection: 'row', alignItems: 'center', paddingHorizontal: 17, paddingVertical: 10, gap: 9, borderWidth: 1, borderColor: '#D9D9D980', width: '50%' }}>
                        <View style={{ width: 42, height: 42, borderRadius: 50, backgroundColor: select == 11 ? "#FFFFFF" :  '#108ED6', justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={require('../../assets/ear.png')} resizeMode='cover' style={{ width: 23, height: 23 }} />
                        </View>
                        <Text style={{ color: '#353535', fontSize: 13, fontWeight: '600', }}>Ear Infection</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>Healthconcer("Asthma",12)} style={{ backgroundColor :select == 12 ? "#108ED6" :"white", flexDirection: 'row', alignItems: 'center', paddingHorizontal: 17, paddingVertical: 10, gap: 9, borderWidth: 1, borderColor: '#D9D9D980', width: '50%' }}>
                        <View style={{ width: 42, height: 42, borderRadius: 50, backgroundColor: select == 12 ? "#FFFFFF" :  '#108ED6', justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={require('../../assets/asthma.png')} resizeMode='cover' style={{ width: 23, height: 23 }} />
                        </View>
                        <Text style={{ color: '#353535', fontSize: 13, fontWeight: '600', }}>Asthma</Text>
                    </TouchableOpacity>

                    <View style={{ paddingHorizontal: 13, paddingVertical: 10, borderWidth: 1, borderColor: '#D9D9D980', width: '50%', }}>
                        <TextInput onChangeText={(text)=>setHealthConcern(text)} placeholder='Enter Other Issue' placeholderTextColor={"#5D5E61BD"} style={{ paddingHorizontal: 10, paddingVertical: 2, borderWidth: 1, borderColor: '#D9D9D980', borderRadius: 5 }} />
                    </View>
                </View>

            </ScrollView>

                    <TouchableOpacity onPress={submitdata} style={{marginVertical:10, paddingVertical: 15, backgroundColor: '#1F51C6', borderRadius: 5, justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                        <Text style={{ color: '#FFFFFF', fontSize: 13, fontWeight: '500', }}>Continue</Text>
                    </TouchableOpacity>

        </View>
    )
}

export default HealthConcerns

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 10,
    },
})