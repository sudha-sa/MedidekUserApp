import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert
} from "react-native";
import React, { useState } from "react";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import CancelPopup from "./CancelPopup";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import { axiosClient } from "../Api/Axios";

const UpcomingPage = ({ route }) => {
  const item = route.params.info;
  const navigation = useNavigation();
  const [cancelpopup, setcancelpopup] = useState(false);

  const Handlecancelappointment = async () => {
    try {
        const response = await axiosClient.put(
            `/v2/updateUserAppointmentStatus/${item?._id}`,
            { status: "cancelled", remark: "by patient" }
        );
        console.log(response.data)
        if(response.data.statusCode == 401){
          Alert.alert("Token Expired, Pls Login")
          await AsyncStorage.clear()
          await AsyncStorage.removeItem("token")
          await AsyncStorage.removeItem("userdata")
          navigation.navigate("SigninPage")
        }
        if (response.data.status === "ok") {
           setcancelpopup(true)
            // setdata("Appointment Successful");

            Alert.alert("status changed succesfully");
            navigation.navigate("HomePage")
        }
        else {
            Alert.alert("status does not changed succesfully");
        }
    } catch (error) {
        console.log(error);
    }
}



  return (
    <View style={styles.container}>
      <View style={{ margin: 10, gap: 16 }}>
        <View
          style={{
            flexDirection: "row",
            borderWidth: 1,
            borderRadius: 68,
            borderColor: "#0000001F",
            paddingHorizontal: 16,
            paddingVertical: 10,
            marginHorizontal: 10,
            gap: 5,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TextInput
            placeholder="Search Appointment"
            placeholderTextColor={"#5D5E61BD"}
            style={{
              color: "#5D5E61BD",
              fontSize: 13,
              fontWeight: "500",
              width: "90%",
            }}
          />
          <Feather name="search" color={"#108ED6"} size={19} />
        </View>
        <ScrollView>
          <View
            style={{
              borderWidth: 1,
              borderColor: "#D9D9D961",
              borderRadius: 5,
              padding: 16,
              gap: 16,
            }}
          >
            <View style={{ flexDirection: "row", gap: 15 }}>
              <Image
                source={require("../../assets/Ellipse30.png")}
                resizeMode="cover"
                style={{ width: 68, height: 68 }}
              />
              <View style={{ gap: 3, width: "90%" }}>
                <Text
                  style={{
                    color: "#1F51C6",
                    fontSize: 10,
                    fontWeight: "600",
                    backgroundColor: "#108ED647",
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    borderRadius: 5,
                    width: "35%",
                  }}
                >
                  Appointment by slot
                </Text>
                <Text
                  style={{ color: "#353535", fontSize: 16, fontWeight: "500" }}
                >
                  {item?.doctorid?.nameOfTheDoctor}
                </Text>
                <View style={{ flexDirection: "row", gap: 15 }}>
                  <Text
                    style={{
                      color: "#263238",
                      fontSize: 13,
                      fontWeight: "500",
                    }}
                  >
                    <Feather name="calendar" color={"#108ED6"} size={13} />{" "}
                    {moment(item?.appointmentDate).format("DD MMM dddd")}
                  </Text>
                  <Text
                    style={{
                      color: "#263238",
                      fontSize: 13,
                      fontWeight: "500",
                    }}
                  >
                    <FontAwesome6
                      name="clock-rotate-left"
                      color={"#108ED6"}
                      size={13}
                    />{" "}
                    {item.AppointmentTime}
                  </Text>
                </View>
                <Text
                  style={{ color: "#706D6D", fontSize: 13, fontWeight: "600" }}
                >
                  <FontAwesome
                    name="location-arrow"
                    size={11}
                    color={"#108ED6"}
                  />{" "}
                  {item?.doctorid?.location}.
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
                    width: "50%",
                  }}
                >
                  <Image
                    source={require("../../assets/Vectorright.png")}
                    resizeMode="contain"
                  />{" "}
                  Appointment Confirmed
                </Text>
              </View>
            </View>
            <View
              style={{
                borderWidth: 0.5,
                borderColor: "#D9D9D980",
                marginBottom: 15,
                borderStyle: "dashed",
              }}
            ></View>
            <View style={{ flexDirection: "row", gap: 16, width: "100%" }}>
              <Text
                style={{
                  color: "#263238",
                  fontSize: 13,
                  fontWeight: "600",
                  width: "50%",
                }}
              >
                #Appointment ID:
                <Text style={{ fontWeight: "500" }}>{item._id}</Text>
              </Text>
              <Text
                style={{ color: "#263238", fontSize: 13, fontWeight: "600" }}
              >
                Estimated Time:
                <Text style={{ fontWeight: "500" }}>2 hours left</Text>
              </Text>
            </View>
            <View
              style={{
                borderWidth: 0.5,
                borderColor: "#D9D9D980",
                marginBottom: 15,
                borderStyle: "dashed",
              }}
            ></View>

            <View>
              <View style={{ flexDirection: "row", gap: 10 }}>
                <View>
                  <View
                    style={{
                      height: 30,
                      width: 30,
                      backgroundColor: "#108ED6",
                      borderRadius: 50,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <FontAwesome6 name="check" size={14} color="#FFFFFF" />
                    {/* <Image source={require("../../assets/Vectortick.png")} style={{ width: "60%", height: "60%" }} resizeMode="contain"></Image> */}
                  </View>

                  <View style={{ alignItems: "center" }}>
                    <View
                      style={{
                        height: 5,
                        width: 2,
                        backgroundColor: "#BFBFBF",
                      }}
                    ></View>
                    <View
                      style={{
                        height: 5,
                        width: 2,
                        backgroundColor: "#BFBFBF",
                      }}
                    ></View>
                    <View
                      style={{
                        height: 5,
                        width: 2,
                        backgroundColor: "#BFBFBF",
                      }}
                    ></View>
                    <View
                      style={{
                        height: 5,
                        width: 2,
                        backgroundColor: "#BFBFBF",
                      }}
                    ></View>
                    <View
                      style={{
                        height: 5,
                        width: 2,
                        backgroundColor: "#BFBFBF",
                      }}
                    ></View>
                    <View
                      style={{
                        height: 5,
                        width: 2,
                        backgroundColor: "#BFBFBF",
                      }}
                    ></View>
                    <View
                      style={{
                        height: 5,
                        width: 2,
                        backgroundColor: "#BFBFBF",
                      }}
                    ></View>
                    <View
                      style={{
                        height: 5,
                        width: 2,
                        backgroundColor: "#BFBFBF",
                      }}
                    ></View>
                    <View
                      style={{
                        height: 5,
                        width: 2,
                        backgroundColor: "#BFBFBF",
                      }}
                    ></View>
                    <View
                      style={{
                        height: 5,
                        width: 2,
                        backgroundColor: "#BFBFBF",
                      }}
                    ></View>
                  </View>
                </View>
                <View >
                  <Text
                    style={{
                      color: "#263238",
                      fontSize: 13,
                      fontWeight: "600",
                      marginTop: 5
                    }}
                  >
                    Appointment Confirmed
                  </Text>
                </View>
              </View>

              <View style={{ flexDirection: "row", gap: 9 }}>
                <View>
                  <View
                    style={{
                      height: 30,
                      width: 30,
                      borderRadius: 50,
                      borderWidth: 2,
                      borderColor: "#BFBFBF",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {/* <View
                      style={{
                        height: 14,
                        width: 14,
                        borderRadius: 11,
                        backgroundColor: "#1F51C6",
                      }}
                    ></View> */}
                  </View>
                  <View style={{ alignItems: "center", }}>
                    <View
                      style={{
                        height: 5,
                        width: 2,
                        backgroundColor: "#BFBFBF",
                      }}
                    ></View>
                    <View
                      style={{
                        height: 5,
                        width: 2,
                        backgroundColor: "#BFBFBF",
                      }}
                    ></View>
                    <View
                      style={{
                        height: 5,
                        width: 2,
                        backgroundColor: "#BFBFBF",
                      }}
                    ></View>
                    <View
                      style={{
                        height: 5,
                        width: 2,
                        backgroundColor: "#BFBFBF",
                      }}
                    ></View>
                    <View
                      style={{
                        height: 5,
                        width: 2,
                        backgroundColor: "#BFBFBF",
                      }}
                    ></View>
                    <View
                      style={{
                        height: 5,
                        width: 2,
                        backgroundColor: "#BFBFBF",
                      }}
                    ></View>
                    <View
                      style={{
                        height: 5,
                        width: 2,
                        backgroundColor: "#BFBFBF",
                      }}
                    ></View>
                    <View
                      style={{
                        height: 5,
                        width: 2,
                        backgroundColor: "#BFBFBF",
                      }}
                    ></View>
                    <View
                      style={{
                        height: 5,
                        width: 2,
                        backgroundColor: "#BFBFBF",
                      }}
                    ></View>
                    <View
                      style={{
                        height: 5,
                        width: 2,
                        backgroundColor: "#BFBFBF",
                      }}
                    ></View>
                  </View>
                </View>
                <View>
                  <Text
                    style={{
                      color: "#263238",
                      fontSize: 13,
                      fontWeight: "600",
                    }}
                  >
                    Dr will start appointments
                  </Text>
                  <Text
                    style={{
                      color: "#949494",
                      fontSize: 13,
                      fontWeight: "600",
                    }}
                  >
                    @10:00PM,20 Jan, fri
                  </Text>
                </View>
              </View>

              <View style={{ flexDirection: "row", gap: 9 }}>
                <View>
                  <View
                    style={{
                      height: 30,
                      width: 30,
                      borderRadius: 50,
                      borderWidth: 2,
                      borderColor: "#BFBFBF",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                  </View>
                </View>
                <View>
                  <Text
                    style={{
                      color: "#263238",
                      fontSize: 13,
                      fontWeight: "600",
                      marginTop: 5
                    }}
                  >
                    Appointment Completed
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <TouchableOpacity
            onPress={Handlecancelappointment}
            style={{
              backgroundColor: "#D12719",
              justifyContent: "center",
              alignSelf: "center",
              paddingHorizontal: 53,
              paddingVertical: 16,
              borderRadius: 50,
              width: "70%",
              marginVertical: 16,
            }}
          >
            <Text
              style={{
                color: "#FFFFFF",
                fontSize: 13,
                fontWeight: "500",
                textAlign: "center",
              }}
            >
              Cancel appointment
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      {cancelpopup && (
        <CancelPopup
          cancelpopup={cancelpopup}
          setcancelpopup={setcancelpopup}
        />
      )}
    </View>
  );
};

export default UpcomingPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
