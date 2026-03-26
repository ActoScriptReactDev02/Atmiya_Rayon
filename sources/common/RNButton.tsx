import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import RNText from './RNText'
import { Colors, FontFamily, FontSize, hp, normalize, wp } from '../theme'

const RNButton = ({title,onPress,btnstyles,btntextstyle,disabled, isloding}) => {
  return (
    <Pressable disabled={disabled} onPress={onPress} style={[styles.btnstyle,btnstyles]}>
   {isloding ? <ActivityIndicator size={'small'} color={Colors.White}/> : <RNText children={title} style={[styles.textstyle,btntextstyle]}/>}
    </Pressable>
  )
}

export default RNButton

const styles = StyleSheet.create({
    btnstyle:{
    backgroundColor:Colors.Orange,
    width:wp(90),
    alignItems:'center',
    paddingVertical:hp(1.5),
    borderRadius:normalize(10),
    marginTop:hp(4)
    },
    textstyle:{
        color:Colors.White,
        fontSize:FontSize.font16,
        fontFamily:FontFamily.SemiBold
    }
})