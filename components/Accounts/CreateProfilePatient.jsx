import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  Alert
} from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import UploadPicturePopup from "./UploadPicturePopup";
import { useAuthentication } from "../context/UserContext";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import * as Location from "expo-location";
import { axiosClient } from "../Api/Axios";
import * as DocumentPicker from 'expo-document-picker';
import AsyncStorage from "@react-native-async-storage/async-storage";

const CreateProfilePatient = () => {
  const navigation = useNavigation();
  const { user, setuser } = useAuthentication();
  const [isupload, setisupload] = useState(false);
  const [image, setImage] = useState({
    uri: "",
    filename: "",
    type: "",
    name: "",
  });
  const [date, setDate] = useState(new Date());
  const [inputdate, setinputDate] = useState();
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [locations, setLocation] = useState(null);
  const [error, seterror] = useState(false)
const [errormsg,setErrorMsg]=useState("")
const [loading,setloading]=useState(false)
  const { name, email, dateOfBirth, phone, location, gender, bloodgroup, imgurl } = user.user;

  const [uservalue, setuservalue] = useState({
    name: name ? name : "",
    email: email ? email : "",
    dateOfBirth: dateOfBirth ? dateOfBirth : "",
    phone: phone ? phone : "",
    imgurl: imgurl ? imgurl : "",
    location: location ? location : "",
    gender: gender ? gender : "",
    bloodgroup: bloodgroup ? bloodgroup : "",
  });

  const getmapresults = async (latitude, longitude) => {
    if (latitude && longitude) {
      const result = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyAqwfQ8_72yf13zLwiFI5c9ftGG1xNXC_0`
      );
      const data = await result.json();
      setuservalue({
        ...uservalue,
        location: data.results[1].formatted_address,
      });
      console.log("data", uservalue);
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
    getmapresults(location?.coords?.latitude, location?.coords?.longitude);
    setLocation(location);
  };

  async function pickDocument() {
    try {
      let result = await DocumentPicker.getDocumentAsync({});
      console.log(result);
      let fileType = result.assets[0].name.split('.').pop().toLowerCase();
      console.log(fileType)
      const imageTypes = ['jpg', 'jpeg', 'png', 'bmp', 'gif', 'webp'];
      if (!result.canceled && imageTypes.includes(fileType)) {
        setImage({
          ...image,
          uri: result.assets[0].uri,
          name: result.assets[0].name,
          filename: result.assets[0].name,
          type: result.assets[0].mimeType
        })
      }
      else {
        Alert.alert("Sorry , we only accept images");
        setImage({
          ...image,
          uri: "",
          name: "",
          filename: "",
          type: ""
        })
      }
      // Yahaan aap result ko handle kar sakte hain, jaise ki upload karna etc.
    } catch (error) {
      console.error(error);
    }
  }

  const onChange = (event, selectedDate) => {
    // console.log()
    const currentDate = selectedDate;
    setShow(false);
    setinputDate(moment(selectedDate).format("DD-MM-YYYY"));
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const submitData = async () => {
    setloading(true)
    try {
      let {
        name,
        email,
        dateOfBirth,
        phone,
        imgurl,
        location,
        gender,
        bloodgroup,
      } = uservalue;
          dateOfBirth = inputdate ? inputdate : dateOfBirth
      if (!name || !email || !dateOfBirth || !phone || !location || !gender || !bloodgroup) {
        Alert.alert("Error")
        setloading(false)
        seterror(true)
        return;
      }

      const formdata = new FormData()
      formdata.append("name", name)
      formdata.append("email", email)
      formdata.append("dateOfBirth", dateOfBirth)
      formdata.append("phone", phone)
      formdata.append("gender", gender)
      formdata.append("bloodgroup", bloodgroup)
      formdata.append("location", location)
      formdata.append("image", image.uri ? image : imgurl)

      const res = await axiosClient.put(`/v2/updateuserpatient/${user.user._id}`, formdata, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data'
        }
      });
      if(res.data.statusCode == 401){
        setloading(false)
        Alert.alert("Token Expired, Pls Login")
        await AsyncStorage.clear()
        await AsyncStorage.removeItem("token")
        await AsyncStorage.removeItem("userdata")
        navigation.navigate("SigninPage")
      }
      if (res.data.statusCode == 200) {
        setloading(false)
        setuser({ ...user, user: res.data.result })
        await AsyncStorage.setItem("userdata", JSON.stringify(res.data.result))
        navigation.navigate("MainProfilePage")
      }
    } catch (error) {
      setloading(false)
      console.log(error)
      Alert.alert(error.message)
    }

  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ alignItems: "center", marginVertical: 10 }}>
          {image ? (
            <View style={{ height: 67, width: 67, borderRadius: 50,borderWidth:1,borderColor:"gray" }}>
            <Image
              source={{ uri: image.uri ? image.uri : uservalue.imgurl }}
              resizeMode="cover"
              style={{ height: 67, width: 67, borderRadius: 50 }}
            /></View>
          ) : (
            <View style={{ height: 67, width: 67, borderRadius: 50 ,borderWidth:2 }}>
            <Image
              source={require("../../assets/profile.png")}
              resizeMode="cover"
              style={{ height: 67, width: 67, borderRadius: 50 ,borderWidth:2 }}
            />
            </View>
          )}
          <TouchableOpacity onPress={() => setisupload(true)}>
            <Image
              source={require("../../assets/Group1306.png")}
              resizeMode="contain"
              style={{ height: 27, width: 27, marginTop: -20, marginLeft: 50 }}
            />
          </TouchableOpacity>
        </View>

        <View style={{ paddingHorizontal: 14, paddingVertical: 21, gap: 15 }}>
          <TextInput
            placeholder="Enter Name"
            value={uservalue.name}
            onChangeText={(text) => setuservalue({ ...uservalue, name: text })}
            placeholderTextColor={"#242323"}
            style={{
              borderWidth: 1,
              borderRadius: 5,
              borderColor: "#D9D9D980",
              color: "#242323",
              fontSize: 13,
              fontWeight: "500",
              paddingVertical: 6,
              paddingHorizontal: 18,
            }}
          />

          <TextInput
            readOnly
            value={uservalue.email}
            placeholderTextColor={"#242323"}
            style={{
              borderRadius: 5,
              backgroundColor: "#ECF0F9",
              color: "#242323",
              fontSize: 13,
              fontWeight: "500",
              paddingVertical: 6,
              paddingHorizontal: 18,
            }}
          />

          <TextInput
            placeholder="Enter Phone Number"
            value={uservalue.phone}
            onChangeText={(text) => setuservalue({ ...uservalue, phone: text })}
            placeholderTextColor={"#242323"}
            style={{
              borderWidth: 1,
              borderRadius: 5,
              borderColor: "#D9D9D980",
              color: "#242323",
              fontSize: 13,
              fontWeight: "500",
              paddingVertical: 6,
              paddingHorizontal: 18,
            }}
          />

          <TextInput
            placeholder="Enter Gender"
            value={uservalue.gender}
            onChangeText={(text) =>
              setuservalue({ ...uservalue, gender: text })
            }
            placeholderTextColor={"#242323"}
            style={{
              borderWidth: 1,
              borderRadius: 5,
              borderColor: "#D9D9D980",
              color: "#242323",
              fontSize: 13,
              fontWeight: "500",
              paddingVertical: 6,
              paddingHorizontal: 18,
            }}
          />

          <TouchableOpacity
            onPress={showDatepicker}
            style={{
              borderWidth: 1,
              borderRadius: 5,
              borderColor: "#D9D9D980",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingVertical: 10,
              paddingHorizontal: 18,
            }}
          >
            <TextInput
              placeholder="Enter Birth Day"
              value={inputdate ? inputdate :uservalue.dateOfBirth}
              style={{ color: "#242323", fontSize: 13, fontWeight: "500" }}
            />
            <Ionicons name="calendar-clear" color="#108ED6" size={20} />
          </TouchableOpacity>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              onChange={onChange}
            />
          )}

          <TextInput
            placeholder="Enter Blood Group"
            value={uservalue.bloodgroup}
            onChangeText={(text) =>
              setuservalue({ ...uservalue, bloodgroup: text })
            }
            placeholderTextColor={"#242323"}
            style={{
              borderWidth: 1,
              borderRadius: 5,
              borderColor: "#D9D9D980",
              color: "#242323",
              fontSize: 13,
              fontWeight: "500",
              paddingVertical: 6,
              paddingHorizontal: 18,
            }}
          />

          <TextInput
            placeholder="Enter Address"
            value={uservalue.location}
            onChangeText={(text) =>
              setuservalue({ ...uservalue, location: text })
            }
            placeholderTextColor={"#242323"}
            style={{
              borderWidth: 1,
              borderRadius: 5,
              borderColor: "#D9D9D980",
              color: "#242323",
              fontSize: 13,
              fontWeight: "500",
              paddingVertical: 6,
              paddingHorizontal: 18,
            }}
          />
          {console.log(uservalue.location)}
          <TouchableOpacity
            onPress={Inputlocation}
            style={{
              flexDirection: "row",
              gap: 8,
              alignItems: "center",
              marginTop: -10,
            }}
          >
            <Image
              source={require("../../assets/Vector.png")}
              style={{ height: 21, width: 21, objectFit: "contain" }}
            />
            <Text style={{ color: "#108ED6", fontSize: 13, fontWeight: "600" }}>
              Use Current Location
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          gap: 8,
          justifyContent: "center",
          marginVertical: 10,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("HealthConcerns")}
          style={{
            paddingVertical: 15,
            backgroundColor: "#EDF1F9",
            borderRadius: 5,
            justifyContent: "center",
            alignItems: "center",
            width: "45%",
          }}
        >
          <Text style={{ color: "#353535", fontSize: 13, fontWeight: "500" }}>
            Skip
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
        disabled={loading ? true :false}
          onPress={submitData}
          style={{
            paddingVertical: 15,
            backgroundColor: loading ? "#d9d9d9" : "#1F51C6AD" ,
            borderRadius: 5,
            justifyContent: "center",
            alignItems: "center",
            width: "45%",
          }}
        >
          <Text style={{ color: "#FFFFFF", fontSize: 13, fontWeight: "500" }}>
           { loading ? "loading..." : "Continue" }
          </Text>
        </TouchableOpacity>
      </View>

      {isupload && (
        <UploadPicturePopup
          isupload={isupload}
          setisupload={setisupload}
          SelectPicTure={pickDocument}
        />
      )}
      {/* <StatusBar style='auto'/> */}
    </View>
  );
};

export default CreateProfilePatient;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
