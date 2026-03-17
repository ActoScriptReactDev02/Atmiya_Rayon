import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RNImage, RNStyles } from '../../common'
import { Images } from '../../constants'

const Splash = () => {
  return (
    <View>
    <RNImage source={Images.Splashimage} style={{...RNStyles.image100}}/>
    </View>
  )
}

export default Splash

const styles = StyleSheet.create({})