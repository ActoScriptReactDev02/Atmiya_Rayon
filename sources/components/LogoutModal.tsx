import { Modal, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RNButton, RNImage, RNStyles, RNText } from '../common'
import { Colors, FontFamily, FontSize, hp, normalize, wp } from '../theme'
import { Images } from '../constants'

const LogoutModal = ({visible,onRequestClose, onPress}) => {
  return (
    <Modal transparent visible={visible} onRequestClose={onRequestClose}>
        <View style={styles.modalcontiner}>
            <View style={styles.modalwrapstyle}>
                <RNImage  source={Images.logoutimage} style={styles.imagestyle}/>
                <RNText pTop={hp(2)} style={styles.titlestyle} children={'Are you sure want to logout?'}/>
                <RNText pTop={hp(0.5)} children={'You will be signed out from your account on this device.'} align={'center'}/>
                <View style={{...RNStyles.flexRow, columnGap:wp(5)}}>
                    <RNButton onPress={onRequestClose} title={'Cancel'} 
                    btntextstyle={{color:Colors.Black, fontSize:FontSize.font14}}
                     btnstyles={[styles.btnstyle,{backgroundColor:Colors.Grey + '20', borderColor:Colors.BorderColor}]}/>
                      <RNButton onPress={onPress} title={'Log Out'} 
                      btntextstyle={{color:Colors.Red,fontSize:FontSize.font14}} 
                      btnstyles={[styles.btnstyle,{backgroundColor:Colors.Red + '30',borderColor:Colors.Red+ '50'}]}/>
                </View>
            </View>
        </View>
    </Modal>
  )
}

export default LogoutModal

const styles = StyleSheet.create({
    modalcontiner:{
       ...RNStyles.flexCenter,
       backgroundColor:'#00000050'
    },
    modalwrapstyle:{
        backgroundColor:Colors.White,
        paddingHorizontal:wp(3),
        paddingVertical:hp(2),
        width:wp(90),
        alignItems:'center',
        borderRadius:normalize(10),
    },
    titlestyle:{
        fontSize:FontSize.font15,
        fontFamily:FontFamily.SemiBold,
        textTransform:'capitalize'
    },
    btnstyle:{
        width:wp(38),
        paddingVertical:hp(1.2),
        borderWidth:normalize(1)
    },
    imagestyle:{
        height:wp(18),
        width:wp(18)
    }
})