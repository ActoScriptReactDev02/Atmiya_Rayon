import { Animated, Modal, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { RNButton, RNContainer, RNImage, RNStyles, RNText } from '../../common'
import RNHeader from '../../common/RNHeader'
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from "react-native-vision-camera";
import { Colors, FontFamily, FontSize, hp, normalize, wp } from '../../theme';
import { Images } from '../../constants';
import FetchMethod from '../../api/FetchMethod';

const Scan = () => {
    const device = useCameraDevice("back");
    const { hasPermission, requestPermission } = useCameraPermission();
    const [scannedData, setScannedData] = useState(null);
    const [isScanning, setIsScanning] = useState(false);
    const [orderdata, setorderdata] = useState([]);
    const [visible, setvisible] = useState(false)

      useEffect(() => {
    if (!hasPermission) requestPermission();
  }, [hasPermission]);
  
const codeScanner = useCodeScanner({
  codeTypes: ['qr', 'ean-13'],
  onCodeScanned: (codes) => {
    if (!codes || codes.length === 0 || isScanning) return;
      const firstCode = codes[0];
      console.log('firstCode',firstCode);
      if (firstCode?.value) {
        //setScannedData(firstCode.value);
        setIsScanning(true);
        scandata(firstCode.value)
      }
  }
})

const scandata = async (value) => {
  try{
    const response = await FetchMethod.GET({
      EndPoint:`TripMaster/GetCustomerOrderDetails?CustomerId=${value}`
    })
    console.log('response',response);
    if(response.length >0){
       setvisible(true);
       setorderdata(response)
    }
  }catch(error){
    setorderdata([]);
    setvisible(false)
    console.log('Scan data api error -->', error);
    
  }
}

  return (
   <RNContainer>
    <RNHeader title={'Scan'}/>
    <View style={styles.cameraContainer}>
      <Camera
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={true}
            codeScanner={codeScanner}
          />
    </View>
    <RNButton title="Scan Again" onPress={() => setIsScanning(false)}/>
      <Modal statusBarTranslucent={true} transparent={true} visible={true}>
        <View style={styles.modalcontiner}>
          <View style={styles.modalwrapstyle}>
            <RNText children={'test'}/>
          </View>
        </View>
      </Modal>
   </RNContainer>
  )
}


export default Scan

const styles = StyleSheet.create({
      cameraContainer: {
      height: "80%",
      width: "100%",
    },
   modalcontiner:{
       backgroundColor:'#00000050',
       flexDirection:'row',
       alignItems:'flex-end',
       flex:1
    },
    modalwrapstyle:{
      flex:1,
      height:hp(75),
      backgroundColor:Colors.White,
      borderTopLeftRadius:normalize(15),
      borderTopRightRadius:normalize(15),
      paddingVertical:hp(2),
      paddingHorizontal:wp(3)
    }
    
})