import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, ScrollView, ImageBackground } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePagePatients from './components/TabNavigation/HomePagePatients';
import HomePage from './components/TabNavigation/HomePage';
import CreateProfilePatient from './components/Accounts/CreateProfilePatient';
import AntDesign from '@expo/vector-icons/AntDesign'
import HealthConcerns from './components/Accounts/HealthConcerns';
import UploadRecordsPatient from './components/Accounts/UploadRecordsPatient';
import UploadPicturePopup from './components/Accounts/UploadPicturePopup';
import LocationPopup from './components/HomePage/LocationPopup';
import SearchPagePatient from './components/HomePage/SearchPagePatient';
import BookAppointment from './components/FindDoctors/BookAppointment';
import BookPopup from './components/FindDoctors/BookPopup';
import LocationPage from './components/HomePage/LocationPage';
import UpcomingPage from './components/Appointments/UpcomingPage';
import CancelledPage from './components/Appointments/CancelledPage';
import CompletedPage from './components/Appointments/CompletedPage';
import SigninPage from './components/WelcomePage/SigninPage';
import EnterOTPPage from './components/WelcomePage/EnterOTPPage';
import EnterPasswordPage from './components/WelcomePage/EnterPasswordPage';
import Medicals from './components/Searches/Medicals';
import MedicalsInfo from './components/Searches/MedicalsInfo';
import MedicalDetails from './components/Searches/MedicalDetails';
import LabTests from './components/Searches/LabTests';
import PathLabs from './components/Searches/PathLabs';
import Error404Page from './components/Searches/Error404Page';
import { UserContext } from './components/context/UserContext';
import MainProfilePage from './components/Accounts/MainProfilePage';
import DoctorProfile from './components/FindDoctors/DoctorProfile';
import ShowImage from './components/TabNavigation/ShowImage';
import EditProfilePetient from './components/Accounts/EditProfilePetient';


const Stack = createNativeStackNavigator();

const App = () => {

  return (
    <UserContext>
    <NavigationContainer>
      <Stack.Navigator initialRouteName='SigninPage'>
      <Stack.Screen name="SigninPage" component={SigninPage} options={{ headerShown: false }} />
      <Stack.Screen name="EnterOTPPage" component={EnterOTPPage} options={{ headerShown: false }} />
      <Stack.Screen name="EnterPasswordPage" component={EnterPasswordPage} options={{ headerShown: false }} />
                
        <Stack.Screen name="HomePage" component={HomePage} options={{ headerShown: false }} />
        <Stack.Screen name="MainProfilePage" component={MainProfilePage} options={{
          headerTitleAlign: 'center',
          headerTitle: 'Profile',
          headerTitleStyle: { color: '#404040', fontSize: 16, fontWeight: '600' },
         
        }} />
        <Stack.Screen name="CreateProfilePatient" component={CreateProfilePatient} options={{
          headerTitleAlign: 'center',
          headerTitle: 'Create Profile',
          headerTitleStyle: { color: '#404040', fontSize: 16, fontWeight: '600' },
          // headerLeft: (props) => <TouchableOpacity onPress={() => navigation.navigate('Home')} >
          //   <AntDesign name='left' size={15} />
          // </TouchableOpacity>
        }} />
        <Stack.Screen name="EditProfilePetient" component={EditProfilePetient} options={{
          headerTitleAlign: 'center',
          headerTitle: 'Edit Profile',
          headerTitleStyle: { color: '#404040', fontSize: 16, fontWeight: '600' },
          
        }} />
        <Stack.Screen name="HealthConcerns" component={HealthConcerns} options={{
          headerTitleAlign: 'center',
          headerTitle: 'Health Concerns',
          headerTitleStyle: { color: '#404040', fontSize: 16, fontWeight: '600' },
        }} />
        <Stack.Screen name="UploadRecordsPatient" component={UploadRecordsPatient} options={{
          headerTitleAlign: 'center',
          headerTitle: 'Upload Records',
          headerTitleStyle: { color: '#404040', fontSize: 16, fontWeight: '600' },
        }} />
        <Stack.Screen name="LocationPopup" component={LocationPopup}
       options={{ headerShown: false }}/>
       <Stack.Screen name="SearchPagePatient" component={SearchPagePatient} options={{
          headerTitleAlign: 'center',
          headerTitle: 'Search',
          headerTitleStyle: { color: '#404040', fontSize: 16, fontWeight: '600' },
        }} />
       <Stack.Screen name="LocationPage" component={LocationPage} options={{
          headerTitleAlign: 'center',
          headerTitle: 'Location',
          headerTitleStyle: { color: '#404040', fontSize: 16, fontWeight: '600' },
        }} />
       <Stack.Screen name="BookAppointment" component={BookAppointment} options={{
          headerTitleAlign: 'center',
          headerTitle: 'Find Doctors',
          headerTitleStyle: { color: '#404040', fontSize: 16, fontWeight: '600' },
        }} />
       <Stack.Screen name="DoctorProfile" component={DoctorProfile} options={{
          headerTitleAlign: 'center',
          headerTitle: '',
          headerTitleStyle: { color: '#404040', fontSize: 16, fontWeight: '600' },
        }} />
       <Stack.Screen name="UpcomingPage" component={UpcomingPage} options={{
          headerTitleAlign: 'center',
          headerTitle: 'Appointments',
          headerTitleStyle: { color: '#404040', fontSize: 16, fontWeight: '600' },
        }} />
       <Stack.Screen name="CompletedPage" component={CompletedPage} options={{
          headerTitleAlign: 'center',
          headerTitle: 'Appointments',
          headerTitleStyle: { color: '#404040', fontSize: 16, fontWeight: '600' },
        }} />
       <Stack.Screen name="CancelledPage" component={CancelledPage} options={{
          headerTitleAlign: 'center',
          headerTitle: 'Appointments',
          headerTitleStyle: { color: '#404040', fontSize: 16, fontWeight: '600' },
        }} />
     
       <Stack.Screen name="Medicals" component={Medicals} options={{
          headerTitleAlign: 'center',
          headerTitle: 'Search',
          headerTitleStyle: { color: '#404040', fontSize: 16, fontWeight: '600' },
        }} />
       <Stack.Screen name="MedicalsInfo" component={MedicalsInfo} options={{
          headerTitleAlign: 'center',
          headerTitle: 'Search',
          headerTitleStyle: { color: '#404040', fontSize: 16, fontWeight: '600' },
        }} />
       <Stack.Screen name="MedicalDetails" component={MedicalDetails} options={{
          headerTitleAlign: 'center',
          headerTitle: 'Medical',
          headerTitleStyle: { color: '#404040', fontSize: 16, fontWeight: '600' },
        }} />
        <Stack.Screen name="LabTests" component={LabTests} options={{
          headerTitleAlign: 'center',
          headerTitle: 'Search',
          headerTitleStyle: { color: '#404040', fontSize: 16, fontWeight: '600' },
        }} />
        <Stack.Screen name="PathLabs" component={PathLabs} options={{
          headerTitleAlign: 'center',
          headerTitle: 'PathLabs',
          headerTitleStyle: { color: '#404040', fontSize: 16, fontWeight: '600' },
        }} />
        <Stack.Screen name="Error404Page" component={Error404Page} options={{
          headerTitleAlign: 'center',
          headerTitle: 'Search',
          headerTitleStyle: { color: '#404040', fontSize: 16, fontWeight: '600' },
        }} />

<Stack.Screen
            name="ShowImage"
            component={ShowImage}
            options={{
              headerStyle: { backgroundColor: '#1F51C6' },
              headerTintColor: '#FFFFFF',
              headerShown: false,
            }}
          />
     
      </Stack.Navigator>
      </NavigationContainer>
      </UserContext>
  );
}


export default App;


