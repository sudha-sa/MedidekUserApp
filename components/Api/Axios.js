import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const axiosClient = axios.create({
    // baseURL:'http://192.168.154.112:5001'
    baseURL:'https://testmedidek.onrender.com'
})

axiosClient.interceptors.request.use(async(request)=>{
    const token = await AsyncStorage.getItem("token")
    if(token){
        request.headers["Authorization"] =`Bearer ${token}`
        return request;
    }
    else{
        request.headers["Authorization"] =`Bearer ${token}`
        return request;  
    }
})