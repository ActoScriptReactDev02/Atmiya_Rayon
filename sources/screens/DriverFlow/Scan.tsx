import { Animated, Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { RNButton, RNContainer, RNImage, RNStyles, RNText } from '../../common'
import RNHeader from '../../common/RNHeader'
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from "react-native-vision-camera";
import { Colors, FontFamily, FontSize, height, hp, normalize, width, wp } from '../../theme';
import { Images } from '../../constants';
import FetchMethod from '../../api/FetchMethod';
import { useNavigation } from '@react-navigation/native';
import { NavRoutes } from '../../navigation';

const Scan = () => {
    const device = useCameraDevice("back");
    const { hasPermission, requestPermission } = useCameraPermission();
    const [isScanning, setIsScanning] = useState(false);
    const navigtion = useNavigation();
    const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (!hasPermission) requestPermission();
  }, [hasPermission]);
  
const codeScanner = useCodeScanner({
  codeTypes: ['qr', 'ean-13'],
  onCodeScanned: (codes) => {
    if (!codes || codes.length === 0 || isScanning) return;
      const firstCode = codes[0];
     // console.log('firstCode',firstCode);
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
    
    if(response.length >0){
      setIsActive(false)
       navigtion.navigate(NavRoutes.SCANORDER,{Data:response, CustomerId:value})
    }
  }catch(error){
    navigtion.goBack()
    console.log('Scan data api error -->', error);
    
  }
}

  return (

   <View style={{ flex: 1 }}>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={isActive}
        codeScanner={codeScanner}
      />
        <View style={styles.header}>
           <Pressable onPress={() => navigtion.goBack()}>
            <RNImage tintColor={'#fff'} source={Images.backarrow} style={{height:wp(6), width:wp(6)}}/>
           </Pressable>
        </View>
        <View style={styles.topOverlay} />
        <View style={styles.middleRow}>
          <View style={styles.sideOverlay} />
          <View style={styles.scanBox} />
          <View style={styles.sideOverlay} />
        </View>
        <View style={styles.bottomOverlay} >
          <View style={styles.bottamview}>
            <RNText style={styles.titlestyle} children={'Scan Order QR Code'}/>
             <RNText style={styles.subcontentstyle} children={'Scan the QR code, choose the order, and upload the required photo.'}/>
          </View>
        </View>

    </View>
    
  )
}


export default Scan

const styles = StyleSheet.create({
  overlay:{
    flex:1
  },
  topOverlay:{
    flex:1,
    backgroundColor:'rgba(0,0,0,0.6)',
  },
  middleRow:{
    flexDirection:'row',
    height:wp(80),
  },
  sideOverlay:{
    flex:1,
    backgroundColor:'rgba(0,0,0,0.6)'
  },
  scanBox:{
    width:wp(80),
    borderWidth:normalize(2),
    borderColor:Colors.White,
   // borderRadius:normalize(10),
    overflow:'hidden'
  },
  bottomOverlay:{
    flex:1,
    backgroundColor:'rgba(0,0,0,0.6)',
    justifyContent:'flex-end',
  },
  bottamview:{
    backgroundColor:'#252424',
    paddingVertical:hp(3),
    paddingHorizontal:wp(4),
    borderTopLeftRadius:normalize(20),
    borderTopRightRadius:normalize(20)
  },
  titlestyle:{
    textAlign:'center',
    fontFamily:FontFamily.SemiBold,
    fontSize:FontSize.font18,
    color:Colors.White
  },
  subcontentstyle:{
     textAlign:'center',
    fontSize:FontSize.font13,
    color:Colors.White,
    paddingVertical:hp(2)
  },
    header:{
    position:'absolute',
    top:hp(8),
    left:wp(3),
    right:0,
    //height:hp(6),
    //backgroundColor:'rgba(0,0,0,0.4)',
    //justifyContent:'center',
    //alignItems:'center',
    zIndex:10
  },

    
})