import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import BookPopup from "./BookPopup";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import axios from "axios";
import { axiosClient } from "../Api/Axios";
import { Rating } from "react-native-ratings";
import moment from "moment";
import { useAuthentication } from "../context/UserContext";


// medidekdoctor@gmail.com
// medidek

// const BookAppointment = ({route}) => {
//     const doctor = route.params.doctor;
//     const {user,setuser} =useAuthentication()
//     const navigation = useNavigation()
//     const [selectdate, setselectdate] = useState({
//         currentDate: moment().format("YYYY-MM-DD"),
//         index: 0,
//       })
//     const [selectslot, setselectslot] = useState([])
//     const [selectweek, setselectWeek] = useState([1, 2, 3, 4, 5, 6])
//     const [selectTime, setselectTime] = useState({time:"",index:0})
//     const [Bookpopup, setBookpopup] = useState(false)
//     const [error, seterror] = useState(false);
//     const [multipledoctorprofile,setmultipledoctorprofile]=useState([])
//     const [selectedDoctor,setselectedDoctor]=useState(doctor)
//     const [tokenslot, settokenslot] = useState(null)
//     const [dates, setDates] = useState([]);
//     const [inputValue, setInputValue] = useState({
//         name: user?.user?.name || '',
//         age: user?.user?.age || '',
//         gender: user?.user?.gender || '',
//         phone: user?.user?.phone || '',
//         email: user?.user?.email || '',
//         appointmentDate: moment().format("YYYY-MM-DD"),
//         AppointmentTime: '',
//         doctorid: selectedDoctor?._id,
//         userid: user?.user?._id,
//         role: user?.user?.role,
//     })
//   }
const BookAppointment = ({ route }) => {
  const doctor = route.params.doctor;
  const { user, setuser } = useAuthentication();
  const navigation = useNavigation();
  const [selectdate, setselectdate] = useState({
    currentDate: moment().format("YYYY-MM-DD"),
    index: 0,
  });
  const [selectslot, setselectslot] = useState([

  ]);
  const [selectweek, setselectWeek] = useState([1, 2, 3, 4, 5, 6]);
  const [selectTime, setselectTime] = useState({ time: "", index: 0 });
  const [Bookpopup, setBookpopup] = useState(false);
  const [error, seterror] = useState(false);
  const [multipledoctorprofile, setmultipledoctorprofile] = useState([]);
  const [selectedDoctor, setselectedDoctor] = useState(doctor);
  const [dates, setDates] = useState([]);
  const [tokenslot, settokenslot] = useState(null)
  const [fill,setfill]=useState(0)
  const [inputValue, setInputValue] = useState({
    name: user?.user?.name || "",
    age: user?.user?.age || "",
    gender: user?.user?.gender || "",
    phone: user?.user?.phone || "",
    email: user?.user?.email || "",
    appointmentDate: moment().format("YYYY-MM-DD"),
    AppointmentTime: "",
    doctorid: selectedDoctor?._id,
    userid: user?.user?._id,
    role: user?.user?.role,
  });

  const [activeinput,setactiveinput]=useState(true)

  function ratingCompleted(rating) {
    console.log("Rating is: " + rating);
  }

  



      const a = {
        open: false,
        closed: false,
        upcoming: false
      }
      const b = {
        open: false,
        closed: false,
        upcoming: false
      }
      const c = {
        open: false,
        closed: false,
        upcoming: false
      }


      const startHour = parseInt(tokenslot?.Starttime1?.split(":")[0]);
  const startMinute = parseInt(tokenslot?.Starttime1?.split(":")[1]);
  const endHour = parseInt(tokenslot?.Endtime1?.split(":")[0]);
  const endMinute = parseInt(tokenslot?.Endtime1?.split(":")[1]);
  const currentTime = moment().format("HH:mm");
  const currentHour = parseInt(currentTime.split(":")[0]);
  const currentMinute = parseInt(currentTime.split(":")[1]);


  const startHour2 = parseInt(tokenslot?.Starttime2?.split(":")[0]);
  const startMinute2 = parseInt(tokenslot?.Starttime2?.split(":")[1]);
  const endHour2 = parseInt(tokenslot?.Endtime2?.split(":")[0]);
  const endMinute2 = parseInt(tokenslot?.Endtime2?.split(":")[1]);



  const startHour3 = parseInt(tokenslot?.Starttime3?.split(":")[0]);
  const startMinute3 = parseInt(tokenslot?.Starttime3?.split(":")[1]);
  const endHour3 = parseInt(tokenslot?.Endtime3?.split(":")[0]);
  const endMinute3 = parseInt(tokenslot?.Endtime3?.split(":")[1]);



  if (startHour && endHour) {
    a.upcoming = true;
    if (currentHour > startHour || (currentHour + 1 === startHour && currentMinute > startMinute)) {
      if (currentHour < endHour || (currentHour - 1 === endHour && currentMinute < endMinute)) {
        a.open = true
        a.upcoming = false;
      }
      else {
        a.upcoming = false;
        a.closed = true;
      }
    }
    else {
      if (currentHour < endHour) {
        console.log("aayi kya")
        a.upcoming = true
      }
      else {
        a.closed = true
        a.open = false;
        a.upcoming = false;
      }
    }
  }


  if (startHour2 && endHour2) {
    if (currentHour > startHour2 || (currentHour + 1 === startHour2 && currentMinute > startMinute)) {
      if (currentHour < endHour2 || (currentHour - 1 === endHour2 && currentMinute < endMinute)) {
        b.open = true 
      }
      else {
        b.upcoming = false;
        b.closed = true;
      }
    }
    else {
      if (currentHour < endHour2) {
        b.upcoming = true;
      }
      else {
        b.closed = true
        b.open = false;
        b.upcoming = false;
      }

    }
  }

  if (startHour3 && endHour3) {
    if (currentHour > startHour3 || (currentHour + 1 === startHour3 )) {
      if (currentHour < endHour3 || (currentHour - 1 === endHour3)) {
        c.open = true
      }
      else {
        c.upcoming = false;
        c.closed = true;
      }
    }
    else {
      if (currentHour < endHour3) {
        c.upcoming = true;
      }
      else {
        c.closed = true
        c.open = false;
        c.upcoming = false;
      }
    }
  }


  const monthStart = moment().startOf('day');
  const date = monthStart.clone().add(0, 'days');
  let day = date.format('ddd').toUpperCase()
  let newdate = date.format('DD').toUpperCase()
  let month = date.format('MMM').toUpperCase()


    const getWeekDates = () => {
        const monthStart = moment().startOf('day');
        const monthsDates = [];
        for (let i = 0; i < 7; i++) {
          const date = monthStart.clone().add(i, 'days');
          monthsDates.push({
            day: date.format('ddd').toUpperCase(),
            date: date.format('DD').toUpperCase(),
            month: date.format('MMM').toUpperCase(),
            year: date.format('YYYY').toUpperCase(),
          });
        }
        setDates(monthsDates);
      };

      const handleSelectedDate = (item, index) => {
        setselectdate({
          ...selectdate,
          index,
          currentDate: moment(
            `${item.year}-${item.month}-${item.date}`,
            'YYYY-MMM-DD',
          ).format('YYYY-MM-DD'),
        });
        setInputValue({
          ...inputValue, appointmentDate: moment(
            `${item.year}-${item.month}-${item.date}`,
            'YYYY-MMM-DD',
          ).format('YYYY-MM-DD'),
        })
      };



    const getdoctormultipleloginProfile =async()=>{
    try {
      const res = await axiosClient.get(
        `/v2/multipleloginprofile/${doctor.doctorid}`
      );
      setmultipledoctorprofile(res?.data?.result);
    } catch (error) {
      console.log(error);
      Alert.alert(error.message);
    }
  };



    const getAvailableSlots =async () =>{
        try {
            if (selectedDoctor?.acceptAppointments === "bySlot") {
            const response = await axiosClient.get(`/v2/getAvailbleSlotsForAnUser/${selectedDoctor._id}/${selectdate.currentDate}`)
            if(response.data.statusCode == 401){
              Alert.alert("Token Expired, Pls Login")
              await AsyncStorage.clear()
              await AsyncStorage.removeItem("token")
              await AsyncStorage.removeItem("userdata")
              navigation.navigate("SigninPage")
            }
            if(response.data.result){
              setselectslot(response.data.result)
            }
            } 
            else{
                const response = await axiosClient.get(
                    `/v2/getAppointmentByTokenSlotDetailForDoctorForPerticularDate/${selectedDoctor?._id}/${selectdate?.currentDate}`,
                    );
                    if(response.data.statusCode == 401){
                      Alert.alert("Token Expired, Pls Login")
                      await AsyncStorage.clear()
                      await AsyncStorage.removeItem("token")
                      await AsyncStorage.removeItem("userdata")
                      navigation.navigate("SigninPage")
                    }
                    settokenslot(response.data.result)
            }
        } catch (error) {
            console.log(error)
            Alert.alert(error.message)
        }
      }

      


  const handleSelecttime = async (item, index) => {
    if (item.isbooked) {
      Alert.alert("This slot already booked");
    } else {
      setselectTime({
        ...selectTime,
        time: `${item.slot.startTime}-${item.slot.endTime}`,
        index,
      });
    }
  };

    const handlebookapoointment =async() =>{

        if (selectedDoctor?.acceptAppointments == "bySlot") {

            try {
             
        if (
            !inputValue.name ||
            !inputValue.age ||
            !inputValue.gender ||
            !inputValue.phone ||
            !selectdate.currentDate ||
            !inputValue?.appointmentDate ||
            !selectTime?.time
          ) {

            Alert.alert("Pls filled all field");
            return seterror(true);
          }
        
          const response = await axiosClient.post('/v2/bookAppointment', {
            doctorid: inputValue?.doctorid,
            userid: inputValue?.userid,
            name: inputValue?.name,
            age: inputValue?.age,
            gender: inputValue?.gender,
            phone: inputValue?.phone,
            appointmentDate: inputValue?.appointmentDate,
            AppointmentTime: selectTime?.time,
            role: inputValue?.role
          });

          if(response.data.statusCode ==201){
            Alert.alert("Appointment succsfull");
            navigation.navigate("Appointments")
          }

          if(response.data.statusCode ==409){
            Alert.alert(response.data.message)
            navigation.navigate("Appointments")
          }
        } catch (error) {
           console.log(error)
           Alert.alert(error.message)     
        }
        }

        else{
          if (
            !inputValue.name ||
            !inputValue.age ||
            !inputValue.gender ||
            !inputValue.phone ||
            !selectdate.currentDate ||
            !inputValue?.appointmentDate 
          ) {

            Alert.alert("Pls filled all field");
            return seterror(true);
          }
            try {
            let Appointmenttime 
            if (a.open == true) {
              Appointmenttime = ` ${tokenslot?.Starttime1} - ${tokenslot?.Endtime1}`
            }
            if (b.open == true) {
              Appointmenttime = ` ${tokenslot?.Starttime1} - ${tokenslot?.Endtime1}`
            }
            if (c.open == true) {
              Appointmenttime = ` ${tokenslot?.Starttime1} - ${tokenslot?.Endtime1}`
            }
            if (!a.open && !b.open && !c.open) {
              Alert.alert("You can book Appointment once it open")
              return;
            }

           
        const respond = await axiosClient.post('/v2/bookappointmentbytoken', {
            doctorid: inputValue?.doctorid,
            userid: inputValue?.userid,
            name: inputValue?.name,
            age: inputValue?.age,
            gender: inputValue?.gender,
            phone: inputValue?.phone,
            appointmentDate: inputValue?.appointmentDate,
            AppointmentTime: Appointmenttime,
            role: inputValue?.role
          })
          if(respond.data.statusCode == 201){
             Alert.alert("Appointment succesfull");
             navigation.navigate("Appointments");
          }
          else if(respond.data.statusCode == 409){
            Alert.alert("Appointment Already booked");
            navigation.navigate("Appointments");
          }
        } catch (error) {
            console.log(error)
            Alert.alert(error.message);    
        }
        }
        }
    useFocusEffect(
        useCallback(()=>{
       getdoctormultipleloginProfile()
    },[]))

    useEffect(()=>{
        getWeekDates()
    },[])
    
    useEffect(()=>{
        getAvailableSlots()
    },[selectdate.currentDate,selectedDoctor.acceptAppointments])

const slotyatoken =selectedDoctor?.acceptAppointments === "bySlot" ?  "Slot" : "Token"

console.log(slotyatoken)

const checkinput =()=>{
  if(slotyatoken == "Slot"){
    console.log(selectslot.length)
  if(selectslot.length < 2){
    setactiveinput(false)
  } 
  else{
    setactiveinput(true)

  }
}
if(slotyatoken == "Token"){
  if(tokenslot === null){
    setactiveinput(false)
  } 
  else{
    setactiveinput(true)

  }
}
}


 useEffect(()=>{
  checkinput();
 },[selectslot,tokenslot])


  useFocusEffect(
    useCallback(() => {
      getdoctormultipleloginProfile();
    }, [])
  );

  useEffect(() => {
    getWeekDates();
  }, []);

  const doctorselection =(item ,i)=>{
    setselectedDoctor(item)
    setfill(i)
  }

  useEffect(() => {
    getAvailableSlots();
 
  }, [selectdate.currentDate]);
  console.log("token solootoot",tokenslot)

  return (
    <>
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          //   keyboardVerticalOffset={keyboardVerticalOffset}
        >
          <ScrollView automaticallyAdjustKeyboardInsets={true} style={{marginBottom:50}}>
            <View style={{ margin: 10, gap: 16 }}>
              <Text
                style={{ color: "#383838", fontSize: 16, fontWeight: "600" }}
              >
                Enter Details
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  gap: 15,
                  paddingHorizontal: 20,
                  paddingVertical: 17,
                  borderWidth: 0.3,
                  borderColor: "#0000001A",
                  borderRadius: 5,
                  //   shadowColor: "#0000001A",
                  //   shadowOffset: {
                  //     width: 0,
                  //     height: 2,
                  //   },
                  //   shadowOpacity: 0.75,
                  //   shadowRadius: 5,

                  //   elevation: 7,
                }}
              >
                <Image
                  source={require("../../assets/Ellipse30.png")}
                  resizeMode="cover"
                  style={{ width: 68, height: 68 }}
                />
                <View style={{ gap: 3 }}>
                  <View style={{ flexDirection: "row", gap: 5 }}>
                    <Text
                      style={{
                        color: "#383838",
                        fontSize: 15,
                        fontWeight: "500",
                      }}
                    >
                      {doctor.nameOfTheDoctor}
                    </Text>
                    <Text
                      style={{
                        color: "#706D6D",
                        fontSize: 13,
                        fontWeight: "600",
                      }}
                    >
                      | {doctor.speciality}
                    </Text>
                  </View>
                  <Text
                    style={{
                      color: "#706D6D",
                      fontSize: 13,
                      fontWeight: "600",
                    }}
                  >
                    {doctor.yearOfExprience} years
                  </Text>
                  <Text
                    style={{
                      color: "#706D6D",
                      fontSize: 13,
                      fontWeight: "600",
                    }}
                  >
                    ₹ {doctor.connsultationFee}
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
              </View>
              <Text
                style={{ color: "#383838", fontSize: 16, fontWeight: "600" }}
              >
                Select a hospital
              </Text>

              <View style={{ gap: 16 }}>
                {multipledoctorprofile?.map((item,i) => (
                  <View style={{ flexDirection: "row", gap: 5 }}>
                    <TouchableOpacity
                      onPress={() => doctorselection(item,i)}
                      style={{ flexDirection: "row" }}
                    >
                      {
                        fill == i ?  <FontAwesome
                        name="dot-circle-o"
                        size={19}
                        color={"#108ED6"}
                      />:
                      <FontAwesome
                      name="circle-thin"
                      size={19}
                      color={"#108ED6"}
                    />
                      }
                     
                     
                      <Text
                        style={{
                          color: "#263238",
                          fontSize: 13,
                          fontWeight: "600",
                        }}
                      >
                        {item?.hospitalId?.nameOfhospitalOrClinic
                          ? item?.hospitalId?.nameOfhospitalOrClinic
                          : item?.nameOfTheDoctor}
                        .
                      </Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
                            <View style={{ borderWidth: 0.5, borderColor: '#D9D9D980', borderStyle: 'dashed' }}></View>
                            <Text style={{ color: '#383838', fontSize: 16, fontWeight: '600' }}>Book Appointment <Text style={{ color: '#5D5E61BD' }}>appointment {selectedDoctor.acceptAppointments}</Text></Text>
                            {
                                selectedDoctor.acceptAppointments === "bySlot" ?  (
                                     <ScrollView horizontal>
                                <View style={{ flexDirection: 'row', gap: 16 }}>
                                    {
                                        dates && dates?.map((item, i) => (
                                            <TouchableOpacity key={i} onPress={() => handleSelectedDate(item,i)} style={{ backgroundColor: selectdate.index == i  ? '#108ED6' : '#FFFFFF', paddingHorizontal: 15, paddingVertical: 15, borderRadius: 5, borderWidth: 1, borderColor: '#D9D9D980' }}>
                                                <Text style={{ color: selectdate == i ? '#FFFFFF' : '#000000', fontSize: 13, fontWeight: '600' }}>{item.date} {item.month}, {item.day}</Text>
                                            </TouchableOpacity>
                                        ))
                                    }
                                </View>
                            </ScrollView>
                                ) : (
                                    <View   style={{ backgroundColor :'#108ED6' , paddingHorizontal: 15, paddingVertical: 15, borderRadius: 5, borderWidth: 1, borderColor: '#D9D9D980' }}>
                                                <Text style={{  color: '#FFFFFF', fontSize: 13, fontWeight: '600' }}>{newdate} {month}, {day}</Text>
                                            </View>
                                )
                            }
                           
         

            
              <View style={{ gap: 10 }}>
                                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
                                    {
                                        selectedDoctor.acceptAppointments === "bySlot" ?  
                                      <>
                                    {
                                        selectslot.length > 1 ? 
                                         selectslot?.map((item, index) => (
                                            <View key={index}>
                                                <View>
                                                    <TouchableOpacity disabled={item?.isbooked ? true : false} onPress={() => handleSelecttime(item,index)} style={{ backgroundColor: selectTime.index == index ? item.isbooked ? '#5D5E61BD' : '#108ED6' : item.isbooked ? '#5D5E61BD' : '#FFFFFF', paddingHorizontal: 20, paddingVertical: 15, borderRadius: 5, borderWidth: 1, borderColor: '#D9D9D980' }}>
                                                        <Text style={{ color: selectTime.index == index ? item.isbooked ? '#000000' : '#FFFFFF' : item.isbooked ? '#FFFFFF' : '#000000', fontSize: 13, fontWeight: '600' }}>{item?.slot?.startTime}-{item?.slot?.endTime}</Text>
                                                    </TouchableOpacity>
                                                    <View>
                                                    {
                                                        item.isbooked ?
                                                            <Text style={{ color: '#E91010', fontSize: 10, fontWeight: '600', textAlign: 'center' }}>Slot Booked</Text>
                                                            : null
                                                    }
                                                    </View>
                                                </View>
                                            </View>
                                        ))
                                         :
                                         <View>
                                          <Text>{selectslot[0]}</Text>
                                          </View>
                                    } 
                                    </>  
                                    : (
                                     
                                        <View style={{ flexDirection: "column", borderRadius: 10, justifyContent: "center", paddingLeft: 10 }}>
                {tokenslot === null &&
                  <Text
                    style={{ color: '#B92612', textAlign: 'center', fontSize: 15, fontFamily: 'Lato', fontWeight: '600' }}
                  >
                    Doctor Not Available for appointment
                  </Text>
                }
                {
                  !tokenslot?.Starttime1 || !tokenslot?.Endtime1 &&
                  <Text
                    style={{ color: '#B92612', textAlign: 'center', fontSize: 15, fontFamily: 'Lato', fontWeight: '600' }}
                  >
                    Doctor Not Available for appointment
                  </Text>
                }


                <View style={{ flexDirection: "row", gap: 8, flexWrap: "wrap", marginTop: 10, }}>
                  {
                    (tokenslot?.Starttime1 && tokenslot?.Endtime1) ?
                      <View >
                        <Text
                          style={{ color: '#FFFFFF', textAlign: 'center', fontSize: 13, backgroundColor: currentTime > tokenslot?.Endtime1 ? "#D9D9D9" : a.open ? "green" : "#1F51C6", borderRadius: 3, paddingVertical: 15.5, paddingHorizontal: 9, }}
                        >
                          {tokenslot?.Starttime1} - {tokenslot?.Endtime1}

                        </Text>
                        <Text> {a.open && "open" || a.upcoming && "upcoming" || a.closed && "closed"}</Text>
                      </View>
                      : ""
                  }

                  {
                    tokenslot?.Starttime2 && tokenslot?.Endtime2 &&
                    <View>
                      <Text
                        style={{ color: '#FFFFFF', textAlign: 'center', fontSize: 13, backgroundColor: currentTime > tokenslot?.Endtime2 ? "#D9D9D9" : b.open ? "green" : "#1F51C6", borderRadius: 3, paddingVertical: 15.5, paddingHorizontal: 9, }}
                      >
                        {tokenslot?.Starttime2}-{tokenslot?.Endtime2}
                      </Text>
                      <Text>{b.open && "open" || b.upcoming && "upcoming" || b.closed && "closed"}</Text>
                    </View>
                  }

                  {
                    tokenslot?.Starttime3 && tokenslot?.Endtime3 &&
                    <View>
                      <Text
                        style={{ color: '#FFFFFF', textAlign: 'center', fontSize: 13, backgroundColor: currentTime > tokenslot?.Endtime3 ? "#D9D9D9" : c?.open ? "green" : "#1F51C6", borderRadius: 3, paddingVertical: 15.5, paddingHorizontal: 9, }}
                      >
                        {tokenslot?.Starttime3}-{tokenslot?.Endtime3}
                      </Text>
                      <Text>
                        {c.open && "open" || c.upcoming && "upcoming" || c.closed && "closed"}
                      </Text>
                    </View>
                  }
                </View>
           
                                          
                                        </View>
                              
                                    )
                                }
                                </View>

                            </View>
                            <View style={{ borderWidth: 0.5, borderColor: '#D9D9D980', borderStyle: 'dashed' }}></View>
                            <Text style={{ color: '#383838', fontSize: 16, fontWeight: '600' }}>Patient Details</Text>
                           
                           {
                            activeinput ? 
                            <View style={{ gap: 10 }}>
                                <Text style={{ color: '#383838', fontSize: 15, fontWeight: '600', marginTop: 6 }}>Name<Text style={{ color: '#EA4335' }}>*</Text></Text>
                                <TextInput placeholder='Enter Name' value={inputValue.name} onChangeText={(text)=>setInputValue({...inputValue,name:text})} placeholderTextColor={'#706D6D'} style={{ backgroundColor: '#D9D9D961', borderRadius: 5, paddingHorizontal: 16, paddingVertical: 8, color: '#706D6D', fontSize: 13, fontWeight: '600' }} />
                                {error && !inputValue.name && (
              <Text style={{ color: '#B92612', fontSize: 13, fontFamily: 'Lato', fontWeight: '600' }}>Please Enter Name</Text>
            )}
                                <Text style={{ color: '#383838', fontSize: 15, fontWeight: '600', marginTop: 6 }}>Age<Text style={{ color: '#EA4335' }}>*</Text></Text>
                                <TextInput placeholder='Enter Age' value={inputValue.age} onChangeText={(text)=>setInputValue({...inputValue,age:text})} keyboardType='decimal-pad'  placeholderTextColor={'#706D6D'} style={{ backgroundColor: '#D9D9D961', borderRadius: 5, paddingHorizontal: 16, paddingVertical: 8, color: '#706D6D', fontSize: 13, fontWeight: '600' }} />
                                {error && !inputValue.age && (
              <Text style={{ color: '#B92612', fontSize: 13, fontFamily: 'Lato', fontWeight: '600' }}>Please Enter Age</Text>
            )}
                                <Text style={{ color: '#383838', fontSize: 15, fontWeight: '600', marginTop: 6 }}>Gender<Text style={{ color: '#EA4335' }}>*</Text></Text>
                                <TextInput placeholder='Enter Gender' value={inputValue.gender} onChangeText={(text)=>setInputValue({...inputValue,gender:text})}  placeholderTextColor={'#706D6D'} style={{ backgroundColor: '#D9D9D961', borderRadius: 5, paddingHorizontal: 16, paddingVertical: 8, color: '#706D6D', fontSize: 13, fontWeight: '600' }} />
                                {error && !inputValue.gender && (
              <Text style={{ color: '#B92612', fontSize: 13, fontFamily: 'Lato', fontWeight: '600' }}>Please Enter Gender</Text>
            )}
                                <Text style={{ color: '#383838', fontSize: 15, fontWeight: '600', marginTop: 6 }}>Mobile<Text style={{ color: '#EA4335' }}>*</Text></Text>
                                <TextInput placeholder='Enter Mobile' value={inputValue.phone} onChangeText={(text)=>setInputValue({...inputValue,phone:text})}  placeholderTextColor={'#706D6D'} style={{ backgroundColor: '#D9D9D961', borderRadius: 5, paddingHorizontal: 16, paddingVertical: 8, color: '#706D6D', fontSize: 13, fontWeight: '600' }} />
                                {error && !inputValue.phone && (
              <Text style={{ color: '#B92612', fontSize: 13, fontFamily: 'Lato', fontWeight: '600' }}>Please Enter Phone</Text>
            )}
                            </View> : 
                            <View>
                              <Text style={{fontSize:16,fontFamily:"sans-serif"}}> ** You can enter information once doctor Available **</Text>
                            </View>
                           }
                            
                            <TouchableOpacity disabled={activeinput ? false :true} onPress={handlebookapoointment} style={{ backgroundColor: activeinput ? '#1F51C6' :"#d9d9d9", borderRadius: 74, width: '100%', paddingVertical: 15, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: '#FFFFFF', fontSize: 13, fontWeight: '600' }} >Book Appointment</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                    {
                        Bookpopup == true ? <BookPopup  Bookpopup={Bookpopup} setBookpopup={setBookpopup}/> : null
                    }
                </KeyboardAvoidingView>
              </View>
    </>
  );
};

export default BookAppointment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    width: "100%",
    height: "100%",
  },
});
