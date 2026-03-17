import { Modal, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RNStyles, RNText } from '../common'
import { Colors, FontFamily, FontSize, hp, normalize, wp } from '../theme'
import LottieView from 'lottie-react-native'

const ToastModal = ({visible,onRequestClose,title,subcontent}) => {
  return (
   <Modal statusBarTranslucent={true} transparent visible={visible} onRequestClose={onRequestClose}>
    <View style={styles.modalcontiner}>
        <View style={styles.modalwrapstyle}>
             <LottieView autoPlay loop  style={{height:wp(30),width:wp(30)}} source={require('../assets/Lottie/success.json')}/>
        <RNText style={styles.titlestyle} children={title}/>
        <RNText pTop={hp(0.5)}  align={'center'} children={subcontent}/>
        </View>
    </View>
   </Modal>
  )
}

export default ToastModal

const styles = StyleSheet.create({
      modalcontiner:{
       ...RNStyles.flexCenter,
       backgroundColor:'#00000050'
    },
      modalwrapstyle:{
        backgroundColor:Colors.White,
        paddingHorizontal:wp(3),
        paddingBottom:hp(2),
        width:wp(65),
        alignItems:'center',
        borderRadius:normalize(10),
    },
     
      titlestyle:{
        fontSize:FontSize.font17,
        fontFamily:FontFamily.SemiBold,
        textTransform:'capitalize'
    },
})