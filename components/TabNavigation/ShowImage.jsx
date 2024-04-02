import { StyleSheet, Text, View, Modal, TouchableOpacity, BackHandler } from 'react-native'
import React, { useCallback, useState } from 'react'
import ImageViewer from 'react-native-image-zoom-viewer';
import { output } from './RecordsPetient';
import { useFocusEffect, useNavigation } from '@react-navigation/native';


const ShowImage = ({ route }) => {
const navigation = useNavigation()

const backAction =()=>{
  navigation.navigate("Reports")
  BackHandler.exitApp()
  
}
const { index,state } = route.params;
console.log(index)
const [isModalVisible,setModalVisible]=useState(state)
 
  const closeModal =()=>{
    if(isModalVisible){
      setModalVisible(false)
  navigation.navigate("Records")
    }
  }

  return (

    <View>
      {/* <TouchableOpacity onPress={()=>backAction}> */}
        <Modal visible={isModalVisible} transparent={true} onRequestClose={closeModal} >
          <ImageViewer imageUrls={output} index={index} onChange={(index) => console.log('Current image index , ${index}')} />
        </Modal>
      {/* </TouchableOpacity> */}
    </View>
  )
}

export default ShowImage

const styles = StyleSheet.create({})










// import { StyleSheet, Text, TouchableOpacity, View, PermissionsAndroid,Alert } from 'react-native'
// import React, { useState } from 'react'
// import { Image } from 'react-native-animatable'
// import RNFetchBlob from 'rn-fetch-blob'

// const ShowImage = () => {
//   const [download, setDownload] = useState("")

//   const ImagaPath = "https://stileex.xyz/wp-content/uploads/2019/01/image-a-telecharger-gratuitement.jpg"

//   const requestPermission = async () => {
//     try {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
//         {
//           title: 'Cool Photo App Camera Permission',
//           message:
//             'Cool Photo App needs access to your camera ' +
//             'so you can take awesome pictures.',
//           buttonNeutral: 'Ask Me Later',
//           buttonNegative: 'Cancel',
//           buttonPositive: 'OK',
//         },
//       );
//       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//         console.log('You can use the camera');
//       } else {
//         console.log('Camera permission denied');
//       }
//     } catch (err) {
//       console.warn(err);
//     }
//   };






//   const downloadFile = () => {
//     const { config, fs } = RNFetchBlob;
//     let date = new Date()
//     const fileDir = fs.dirs.DownloadDir
//     config({
//       // add this option that makes response data to be stored as a file,
//       // this is much more performant.
//       fileCache: true,
//       addAndroidDownloads: {
//         useDownloadManager: true,
//         notification: true,
//         path: fileDir + "/download" + Math.floor(date.getTime() + date.getSeconds()/2)+ 'image',
//         description: "File download"
//       }
//     })
//       .fetch('GET', download, {
//         setDownload
//       })
//       .then((res) => {
//         // the temp file path
//         console.log('The file saved to ', res)
//         Alert.alert("File downloaded Successfully")
//       })
//   }





//   //   const downloadImage =()=>{
//   //     let Date = new Date()
//   //     let image_URL = ImagaPath
//   //     let ext = getExtension(image_URL)
//   //     ext = '.' + ext[0]
//   //     const {config,fs} = RNFetchBlob
//   //     let PictureDir = fs.dirs.PictureDir
//   //     let options = {
//   //       fileCache: true,
//   //       addAndroidDownloads :{
//   //         useDownloadManager : true,
//   //         notification:true,
//   //         path: PictureDir + '/image_' + Math.floor(date.getTime() + date.getSeconds() /2)  + ext,
//   //         description: 'Image'
//   //       }
//   //     }
//   //       config(options)
//   //       .fetch('GET', image_URL)
//   //       .then(res =>{
//   //         console.log('res ->', JSON.stringify(res))
//   //         alert('Successfully')
//   //       })
//   //   }

//   // const getExtension = filename => {
//   //   return /[.]/exec(filename) ? /[^.]+$/.exec(filename) : undefined
//   // }

//   return (
//     <View>
//       <Image source={{ uri: ImagaPath }} width='100%' height={300} />
//       <TouchableOpacity style={{ backgroundColor: 'red' }} onPress={() => {
//         if (download !== '') {
//           setDownload()
//         } else {
//           Alert("please add url")
//         }
//       }}>
//         <Text>download</Text>
//       </TouchableOpacity>
//     </View>
//   )
// }

// export default ShowImage

// const styles = StyleSheet.create({})