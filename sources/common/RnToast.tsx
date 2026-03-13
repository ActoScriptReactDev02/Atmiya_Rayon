import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors, FontFamily, FontSize, hp, normalize, wp } from '../theme'
import RNImage from './RNImage'
import { Images } from '../constants'
import RNText from './RNText'
import RNStyles from './RNStyles'
import Animated, { FadeInUp, FadeOutUp } from 'react-native-reanimated'

const RnToast = ({isSuccess, Message,Title,toastcontinerstyle}) => {
  return (
    <Animated.View entering={FadeInUp.duration(200)}
      exiting={FadeOutUp.duration(200)} style={[styles.toastcontiner,{backgroundColor: isSuccess ? Colors.Green: Colors.Red},toastcontinerstyle]}>
    <View style={styles.toastwrapstyle}>
     <RNImage tintColor={isSuccess && Colors.Green} source={isSuccess ? Images.successicone : Images.errorIcone} style={styles.iconestyle}/>
     <View style={{flex:1}}>
        <RNText  style={styles.titlstyle} children={Title}/>
        <RNText numOfLines={2}  style={styles.subcontentstyle} children={Message}/>
     </View>
     </View>
    </Animated.View>
  )
}

export default RnToast

const styles = StyleSheet.create({
    toastcontiner:{
        position:'absolute',
        top:hp(0),
        borderRadius:normalize(8),
       width:wp(95),
        right:wp(0),
        left:wp(2),
        overflow:'hidden',
        borderWidth:0.5,
        borderColor:Colors.BorderColor,
        
    },
    iconestyle:{
        height:wp(8),
        width:wp(8)
    },
    titlstyle:{
    fontSize:FontSize.font15,
    fontFamily:FontFamily.SemiBold,
    },
    toastwrapstyle:{
        ...RNStyles.flexRow,
        columnGap:wp(2),
        backgroundColor:Colors.White,
        marginLeft:wp(1.2),
         paddingVertical:hp(1),
        paddingHorizontal:wp(2),
    },
    subcontentstyle:{
        fontSize:FontSize.font12,
        flex:1
    }
})