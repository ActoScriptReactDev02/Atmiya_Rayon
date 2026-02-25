import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors, normalize, wp } from '../theme'
import RNImage from './RNImage'

const RnImagesCard = ({source, imagestyles}) => {
  return (
    <View style={styles.continer}>
      <RNImage source={source} style={[styles.imagestyle,imagestyles]}/>
    </View>
  )
}

export default RnImagesCard

const styles = StyleSheet.create({
  continer:{
    backgroundColor:Colors.DarkBackgroundColor,
   paddingHorizontal:wp(2.5),
   paddingVertical:wp(2.5),
   borderRadius:normalize(10)
  },
  imagestyle:{
    height:wp(8),
    width:wp(8)
  }
})