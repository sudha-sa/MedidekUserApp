import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  TextInput,
} from "react-native";
import React, { useCallback, useEffect, useState, useRef } from "react";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { axiosClient } from "../Api/Axios";
import { Rating } from "react-native-ratings";




const LocationAutocomplete = ({ onLocationSelect,setisloaction }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <View style={[styles.autocompleteContainer, isExpanded && styles.expandedAutocomplete]}>
      <GooglePlacesAutocomplete
        placeholder='Search'
        styles={{
          container: {
            flex: 1,
          },
          textInputContainer: {
            backgroundColor: 'white',
          },
          textInput: {
            color: "#242323",
            fontSize: 13,
            fontWeight: "500",
          },
          predefinedPlacesDescription: {
            color: '#1faadb',
          },
        }}
        onPress={(data, details = null) => {
          onLocationSelect(data);
          setIsExpanded(false);
          setisloaction(false)
        }}
        onFocus={() => setIsExpanded(true)}
        onBlur={() => setIsExpanded(false)}
        query={{
          key: 'AIzaSyAqwfQ8_72yf13zLwiFI5c9ftGG1xNXC_0',
          language: 'en',
        }}
      />
    </View>
  );
};






const FindDoctorsByPatient = () => {
  const navigation = useNavigation();
  const [Doctors, setDoctors] = useState([]);
  const [inputdata, setinputdata] = useState("nagpur");
  const [page, setpage] = useState(0);
  const [isloaction, setisloaction] = useState(false);
  const [specialtiesearchText, setspecialtiesearchText] = useState("");
  const [locationvalue,setlocationvalue]=useState("nagpur")
  const ref = useRef();

  function ratingCompleted(rating) {
    console.log("Rating is: " + rating);
  }

  const usergetalldoctors = async (text) => {
    const res = await axiosClient.get(
      `/v2/getAllDoctorWithAllQuery?userInput=${text}`
    );
    setDoctors(res.data.result);
  };

  const getalldoctors = async () => {
    if (page == 0) {
      const res = await axiosClient.get("/v2/getusergetalldoctors");
      setDoctors(res.data.result);
    }
  };

  useEffect(() => {
    getalldoctors();
  }, []);

  const handlelocationData = async (data) => {
    console.log("datatatatatatatta",data.description);
    setlocationvalue(data.description)
    const res = await axiosClient.post("/v2/doctorsByLocation", {
      speciality: specialtiesearchText,
      location: data,
    });
    console.log(res.data.result.data[0])
    setDoctors(res.data.result.data)
  };
  // console.log(Doctors[0])

  return (
    <>
    {
      isloaction ? 
                   <LocationAutocomplete onLocationSelect={handlelocationData} setisloaction={setisloaction} />
                   :
                   <View style={styles.container}>
                   <View style={{ margin: 10, gap: 12 }}>
                     <View
                       style={{ flexDirection: "row", gap: 8, justifyContent: "center" }}
                     >
                       <View
                         style={{
                           paddingHorizontal: 15,
                           paddingVertical: 7,
                           flexDirection: "row",
                           justifyContent: "space-between",
                           borderWidth: 1,
                           borderColor: "#D9D9D980",
                           borderRadius: 106,
                           width: "48%",
                           alignItems: "center",
                         }}
                       >
                         {/* <Text style={{ color: '#242323', fontSize: 13, fontWeight: '500' }} >Nagpur</Text> */}
                         <TextInput
                           style={{
                             color: "#242323",
                             fontSize: 13,
                             fontWeight: "500",
                             width: "90%",
                           }}
                           placeholder="search"
                           onChangeText={(text) => usergetalldoctors(text)}
                         />
                         <Feather name="search" color={"#108ED6"} size={17} />
                       </View>
                       <TouchableOpacity
                       onPress={()=>setisloaction(true)}
                         style={{
                           paddingHorizontal: 15,
                           paddingVertical: 7,
                           flexDirection: "row",
                           justifyContent: "space-between",
                           borderWidth: 1,
                           borderColor: "#D9D9D980",
                           borderRadius: 106,
                           width: "48%",
                           alignItems: "center",
                         }}
                       >
                         <Text style={{ color: "#242323", fontSize: 13, fontWeight: "500" }}>
                           {locationvalue}
                         </Text>
                         {/* <GooglePlacesAutocomplete
                           ref={ref}
                           placeholder="Search"
                           styles={{
                             container: {
                               flex: 1,
                             },
                             textInputContainer: {
                               backgroundColor: "white",
                               borderWidth: 0,
                               borderRadius: 0,
                               paddingHorizontal: 0,
                               paddingVertical: 0,
                               marginTop: 0,
                             },
                             textInput: {
                               color: "#242323",
                               fontSize: 13,
                               fontWeight: "500",
                               height: 38,
                               borderRadius: 0,
                               paddingHorizontal: 0,
                             },
                             predefinedPlacesDescription: {
                               color: "#1faadb",
                             },
                             listView: {
                               backgroundColor: "white",
                               borderWidth: 0.5,
                               borderColor: "#D9D9D9",
                               borderRadius: 5,
                               marginTop: 5,
                             },
                             row: {
                               backgroundColor: "white",
                               padding: 13,
                               height: 44,
                               flexDirection: "row",
                             },
                             separator: {
                               height: 0.5,
                               backgroundColor: "#D9D9D9",
                             },
                             description: {
                               fontSize: 13,
                               color: "#242323",
                             },
                           }}
                           onPress={(data, details = null) => {
                             handlelocationData(data);
                           }}
                           isRowScrollable={true}
                           query={{
                             key: "AIzaSyAqwfQ8_72yf13zLwiFI5c9ftGG1xNXC_0",
                             language: "en",
                           }}
                         /> */}
                         <MaterialIcons name="my-location" color={"#108ED6"} size={17} />
                       </TouchableOpacity>
                     </View>
                     <Text style={{ color: "#383838", fontSize: 16, fontWeight: "600" }}>
                       {Doctors.length} near you
                     </Text>
                     <ScrollView style={{ marginBottom: 70 }}>
                       {Doctors.map((item) => (
                         <View key={item?._id} style={{ gap: 16, marginVertical: 12 }}>
                           <View
                             style={{
                               borderWidth: 0.5,
                               borderColor: "#D9D9D980",
                               borderStyle: "dashed",
                             }}
                           ></View>
                           <TouchableOpacity
                             onPress={() =>
                               navigation.navigate("DoctorProfile", { item: item })
                             }
                             style={{ flexDirection: "row", gap: 15 }}
                           >
                             <Image
                               source={require("../../assets/Ellipse30.png")}
                               resizeMode="cover"
                               style={{ width: 68, height: 68, borderRadius: 50 }}
                             />
                             <View style={{ gap: 3 }}>
                               <View style={{ flexDirection: "row", gap: 5 }}>
                                 <Text
                                   style={{
                                     color: "#353535",
                                     fontSize: 16,
                                     fontWeight: "600",
                                   }}
                                 >
                                   {item.nameOfTheDoctor}
                                 </Text>
                                 <Text
                                   style={{
                                     color: "#706D6D",
                                     fontSize: 13,
                                     fontWeight: "600",
                                   }}
                                 >
                                   {item.speciality}
                                 </Text>
                               </View>
                               <Text
                                 style={{
                                   color: "#706D6D",
                                   fontSize: 13,
                                   fontWeight: "600",
                                 }}
                               >
                                 {item.yearOfExprience} Years
                               </Text>
                               <Text
                                 style={{
                                   color: "#706D6D",
                                   fontSize: 13,
                                   fontWeight: "600",
                                 }}
                               >
                                 <FontAwesome name="rupee" size={11} color={"#706D6D"} />{" "}
                                 {item.connsultationFee}{" "}
                               </Text>
                               <Text
                                 style={{
                                   color: "#706D6D",
                                   fontSize: 13,
                                   fontWeight: "600",
                                 }}
                               >
                                 <FontAwesome
                                   name="location-arrow"
                                   size={11}
                                   color={"#108ED6"}
                                 />{" "}
                                 {item.location}
                               </Text>
                               <Text
                                 style={{
                                   color: "#706D6D",
                                   fontSize: 13,
                                   fontWeight: "600",
                                 }}
                               >
                                 <Rating
                                   readonly={true}
                                   ratingCount={5}
                                   imageSize={17}
                                   onFinishRating={this.ratingCompleted}
                                 />
                               </Text>
                             </View>
                           </TouchableOpacity>
                           <TouchableOpacity
                             onPress={() =>
                               navigation.navigate("BookAppointment", { doctor: item })
                             }
                             style={{
                               backgroundColor: "#1F51C6",
                               borderRadius: 74,
                               width: "100%",
                               paddingVertical: 15,
                               justifyContent: "center",
                               alignItems: "center",
                             }}
                           >
                             <Text
                               style={{ color: "#FFFFFF", fontSize: 13, fontWeight: "600" }}
                             >
                               Book Now
                             </Text>
                           </TouchableOpacity>
                         </View>
                       ))}
                     </ScrollView>
                   </View>
                 </View>

    }
   
    </>
  );
};

export default FindDoctorsByPatient;





const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  autocompleteContainer: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  expandedAutocomplete: {
    top: 0,
    bottom: 0,
    backgroundColor: 'white',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: '#D9D9D980',
    borderRadius: 106,
  },
});
