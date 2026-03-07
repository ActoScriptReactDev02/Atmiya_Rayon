import { Modal, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RNButton, RNImage, RNStyles, RNText } from '../common'
import { Colors, FontFamily, FontSize, hp, normalize, wp } from '../theme'
import { Images } from '../constants'

const DeleteModal = ({visible,onRequestClose,onPress,title,subcontent}) => {
  return (
   <Modal transparent visible={visible} onRequestClose={onRequestClose}>
    <View style={styles.modalcontiner}>
        <View style={styles.modalwrapstyle}>
          <RNImage source={Images.DeleleImage} style={styles.imagestyle}/>
          <RNText pTop={hp(2)} style={styles.titlestyle} children={title}/>
          <RNText pTop={hp(0.5)} children={subcontent} align={'center'}/>
           <View style={{...RNStyles.flexRow, columnGap:wp(5)}}>
                    <RNButton onPress={onRequestClose} title={'Cancel'} 
                    btntextstyle={{color:Colors.Black, fontSize:FontSize.font14}}
                     btnstyles={[styles.btnstyle,{backgroundColor:Colors.Grey + '20', borderColor:Colors.BorderColor}]}/>
                      <RNButton onPress={onPress} title={'Delete'} 
                      btntextstyle={{color:Colors.Red,fontSize:FontSize.font14}} 
                      btnstyles={[styles.btnstyle,{backgroundColor:Colors.Red + '30',borderColor:Colors.Red+ '50'}]}/>
                </View>
        </View>
    </View>
   </Modal>
  )
}

export default DeleteModal

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
    imagestyle:{
        height:wp(18),
        width:wp(18)
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
})